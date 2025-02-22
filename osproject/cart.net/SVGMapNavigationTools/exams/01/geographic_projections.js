/* *****************************************************
* Geographic projection functions
********************************************************/

// Ellipsoid model constants (actual values here are for WGS84) */
var f = 1 / 298.257223563; //flattening index wgs84
//var f = 1 / 297; //flattening index international 1924
var a = 6378137.0; //semi-major axis wgs84
//var a = 6378388.0; //semi-major axis international 1924
//var a = 6378206.4; //semi-major axis clarke
var b = a - a * f; //semi-minor axis
var e2 = (1 - Math.pow(b,2) / Math.pow(a,2)); //eccentricity2 for wgs84
//var e2 = 0.00676866; //eccentricity2 for clarke
var e = Math.sqrt(2 * f - Math.pow(f,2)); //eccentricity for wgs84
//var e = 0.0822719; //eccentricity for clarke
var UTMScaleFactor = 0.9996;

//

/* ArcLengthOfMeridian: Computes the ellipsoidal distance from the equator to a point at a given latitude.
*
* Reference: Hoffmann-Wellenhof, B., Lichtenegger, H., and Collins, J.,
* GPS: Theory and Practice, 3rd ed.  New York: Springer-Verlag Wien, 1994.
*
* Inputs:
*     phi - Latitude of the point, in radians.
*
* Globals:
*     a - Ellipsoid model major axis.
*     b - Ellipsoid model minor axis.
*
* Returns:
*     The ellipsoidal distance of the point from the equator, in meters.
*
*/

function ArcLengthOfMeridian (phi) {
    var alpha, beta, gamma, delta, epsilon, n;
    var result;

    /* Precalculate n */
    n = (a - b) / (a + b);
    /* Precalculate alpha */
    alpha = ((a + b) / 2.0) * (1.0 + (Math.pow (n, 2.0) / 4.0) + (Math.pow (n, 4.0) / 64.0));
    /* Precalculate beta */
    beta = (-3.0 * n / 2.0) + (9.0 * Math.pow (n, 3.0) / 16.0) + (-3.0 * Math.pow (n, 5.0) / 32.0);
    /* Precalculate gamma */
    gamma = (15.0 * Math.pow (n, 2.0) / 16.0) + (-15.0 * Math.pow (n, 4.0) / 32.0);
    /* Precalculate delta */
    delta = (-35.0 * Math.pow (n, 3.0) / 48.0) + (105.0 * Math.pow (n, 5.0) / 256.0);
    /* Precalculate epsilon */
    epsilon = (315.0 * Math.pow (n, 4.0) / 512.0);
    /* Now calculate the sum of the series and return */
    result = alpha * (phi + (beta * Math.sin (2.0 * phi)) + (gamma * Math.sin (4.0 * phi)) + (delta * Math.sin (6.0 * phi)) + (epsilon * Math.sin (8.0 * phi)));
    return result;
}

/* UTMCentralMeridian: Determines the central meridian for the given UTM zone.
*
* Inputs:
*     zone - An integer value designating the UTM zone, range [1,60].
*
* Returns:
*   The central meridian for the given UTM zone, in radians, or zero
*   if the UTM zone parameter is outside the range [1,60].
*   Range of the central meridian is the radian equivalent of [-177,+177].
*/
function UTMCentralMeridian (zone) {
    var cmeridian = DegToRad (-183.0 + (zone * 6.0));
    return cmeridian;
}

/* FootpointLatitude: Computes the footpoint latitude for use in converting transverse
* Mercator coordinates to ellipsoidal coordinates.
*
* Reference: Hoffmann-Wellenhof, B., Lichtenegger, H., and Collins, J.,
*   GPS: Theory and Practice, 3rd ed.  New York: Springer-Verlag Wien, 1994.
*
* Inputs:
*   y - The UTM northing coordinate, in meters.
*
* Returns:
*   The footpoint latitude, in radians.
*/
function FootpointLatitude (y) {
    var y_, alpha_, beta_, gamma_, delta_, epsilon_, n;
    var result;
        
    /* Precalculate n (Eq. 10.18) */
    n = (a - b) / (a + b);	
     /* Precalculate alpha_ (Eq. 10.22) */
     /* (Same as alpha in Eq. 10.17) */
     alpha_ = ((a + b) / 2.0) * (1 + (Math.pow (n, 2.0) / 4) + (Math.pow (n, 4.0) / 64));       
     /* Precalculate y_ (Eq. 10.23) */
     y_ = y / alpha_;  
     /* Precalculate beta_ (Eq. 10.22) */
     beta_ = (3.0 * n / 2.0) + (-27.0 * Math.pow (n, 3.0) / 32.0) + (269.0 * Math.pow (n, 5.0) / 512.0);
     /* Precalculate gamma_ (Eq. 10.22) */
     gamma_ = (21.0 * Math.pow (n, 2.0) / 16.0) + (-55.0 * Math.pow (n, 4.0) / 32.0);	
     /* Precalculate delta_ (Eq. 10.22) */
     delta_ = (151.0 * Math.pow (n, 3.0) / 96.0) + (-417.0 * Math.pow (n, 5.0) / 128.0);	
     /* Precalculate epsilon_ (Eq. 10.22) */
     epsilon_ = (1097.0 * Math.pow (n, 4.0) / 512.0);	
     /* Now calculate the sum of the series (Eq. 10.21) */
     result = y_ + (beta_ * Math.sin (2.0 * y_)) + (gamma_ * Math.sin (4.0 * y_)) + (delta_ * Math.sin (6.0 * y_)) + (epsilon_ * Math.sin (8.0 * y_));
        
     return result;
}

/* MapLatLonToXY: Converts a latitude/longitude pair to x and y coordinates in the
* Transverse Mercator projection.  Note that Transverse Mercator is not
* the same as UTM; a scale factor is required to convert between them.
*
* Reference: Hoffmann-Wellenhof, B., Lichtenegger, H., and Collins, J.,
* GPS: Theory and Practice, 3rd ed.  New York: Springer-Verlag Wien, 1994.
*
* Inputs:
*    phi - Latitude of the point, in radians.
*    lambda - Longitude of the point, in radians.
*    lambda0 - Longitude of the central meridian to be used, in radians.
*
* Outputs:
*    xy - A 2-element array containing the x and y coordinates
*         of the computed point.
*
* Returns:
*    The function does not return a value.
*/
function MapLatLonToXY (phi, lambda, lambda0, xy) {
    var N, nu2, ep2, t, t2, l;
    var l3coef, l4coef, l5coef, l6coef, l7coef, l8coef;
    var tmp;

    /* Precalculate ep2 */
    ep2 = (Math.pow (a, 2.0) - Math.pow (b, 2.0)) / Math.pow (b, 2.0);
    /* Precalculate nu2 */
    nu2 = ep2 * Math.pow (Math.cos (phi), 2.0);
    /* Precalculate N */
    N = Math.pow (a, 2.0) / (b * Math.sqrt (1 + nu2));
    /* Precalculate t */
    t = Math.tan (phi);
    t2 = t * t;
    tmp = (t2 * t2 * t2) - Math.pow (t, 6.0);
    /* Precalculate l */
    l = lambda - lambda0;
    /* Precalculate coefficients for l**n in the equations below so a normal human being can
    read the expressions for easting and northing
    -- l**1 and l**2 have coefficients of 1.0 */
    l3coef = 1.0 - t2 + nu2;
    l4coef = 5.0 - t2 + 9 * nu2 + 4.0 * (nu2 * nu2);
    l5coef = 5.0 - 18.0 * t2 + (t2 * t2) + 14.0 * nu2 - 58.0 * t2 * nu2;
    l6coef = 61.0 - 58.0 * t2 + (t2 * t2) + 270.0 * nu2 - 330.0 * t2 * nu2;
    l7coef = 61.0 - 479.0 * t2 + 179.0 * (t2 * t2) - (t2 * t2 * t2);
    l8coef = 1385.0 - 3111.0 * t2 + 543.0 * (t2 * t2) - (t2 * t2 * t2);
    /* Calculate easting (x) */
    xy[0] = N * Math.cos (phi) * l + (N / 6.0 * Math.pow (Math.cos (phi), 3.0) * l3coef * Math.pow (l, 3.0)) + (N / 120.0 * Math.pow (Math.cos (phi), 5.0) * l5coef * Math.pow (l, 5.0)) + (N / 5040.0 * Math.pow (Math.cos (phi), 7.0) * l7coef * Math.pow (l, 7.0));
    /* Calculate northing (y) */
    xy[1] = ArcLengthOfMeridian (phi) + (t / 2.0 * N * Math.pow (Math.cos (phi), 2.0) * Math.pow (l, 2.0)) + (t / 24.0 * N * Math.pow (Math.cos (phi), 4.0) * l4coef * Math.pow (l, 4.0)) + (t / 720.0 * N * Math.pow (Math.cos (phi), 6.0) * l6coef * Math.pow (l, 6.0)) + (t / 40320.0 * N * Math.pow (Math.cos (phi), 8.0) * l8coef * Math.pow (l, 8.0));
    
    return;
}

/* MapXYToLatLon: Converts x and y coordinates in the Transverse Mercator projection to
* a latitude/longitude pair.  Note that Transverse Mercator is not
* the same as UTM; a scale factor is required to convert between them.
*
* Reference: Hoffmann-Wellenhof, B., Lichtenegger, H., and Collins, J.,
*   GPS: Theory and Practice, 3rd ed.  New York: Springer-Verlag Wien, 1994.
*
* Inputs:
*   x - The easting of the point, in meters.
*   y - The northing of the point, in meters.
*   lambda0 - Longitude of the central meridian to be used, in radians.
*
* Outputs:
*   philambda - A 2-element containing the latitude and longitude
*               in radians.
*
* Returns:
*   The function does not return a value.
*
* Remarks:
*   The local variables Nf, nuf2, tf, and tf2 serve the same purpose as
*   N, nu2, t, and t2 in MapLatLonToXY, but they are computed with respect
*   to the footpoint latitude phif.
*
*   x1frac, x2frac, x2poly, x3poly, etc. are to enhance readability and
*   to optimize computations.
*/
function MapXYToLatLon (x, y, lambda0, philambda) {
    var phif, Nf, Nfpow, nuf2, ep2, tf, tf2, tf4, cf;
    var x1frac, x2frac, x3frac, x4frac, x5frac, x6frac, x7frac, x8frac;
    var x2poly, x3poly, x4poly, x5poly, x6poly, x7poly, x8poly;
    	
    /* Get the value of phif, the footpoint latitude. */
    phif = FootpointLatitude (y);
    /* Precalculate ep2 */
    ep2 = (Math.pow (a, 2.0) - Math.pow (b, 2.0)) / Math.pow (b, 2.0);	
    /* Precalculate cos (phif) */
    cf = Math.cos (phif);	
    /* Precalculate nuf2 */
    nuf2 = ep2 * Math.pow (cf, 2.0);	
    /* Precalculate Nf and initialize Nfpow */
    Nf = Math.pow (a, 2.0) / (b * Math.sqrt (1 + nuf2));
    Nfpow = Nf;	
    /* Precalculate tf */
    tf = Math.tan (phif);
    tf2 = tf * tf;
    tf4 = tf2 * tf2;
        
    /* Precalculate fractional coefficients for x**n in the equations below to simplify the expressions for latitude and longitude. */
    x1frac = 1.0 / (Nfpow * cf);
    Nfpow *= Nf;   /* now equals Nf**2) */
    x2frac = tf / (2.0 * Nfpow);
    Nfpow *= Nf;   /* now equals Nf**3) */
    x3frac = 1.0 / (6.0 * Nfpow * cf);
    Nfpow *= Nf;   /* now equals Nf**4) */
    x4frac = tf / (24.0 * Nfpow);
    Nfpow *= Nf;   /* now equals Nf**5) */
    x5frac = 1.0 / (120.0 * Nfpow * cf);
    Nfpow *= Nf;   /* now equals Nf**6) */
    x6frac = tf / (720.0 * Nfpow);
    Nfpow *= Nf;   /* now equals Nf**7) */
    x7frac = 1.0 / (5040.0 * Nfpow * cf);
    Nfpow *= Nf;   /* now equals Nf**8) */
    x8frac = tf / (40320.0 * Nfpow);
        
    /* Precalculate polynomial coefficients for x**n.-- x**1 does not have a polynomial coefficient. */
    x2poly = -1.0 - nuf2;
    x3poly = -1.0 - 2 * tf2 - nuf2;
    x4poly = 5.0 + 3.0 * tf2 + 6.0 * nuf2 - 6.0 * tf2 * nuf2 - 3.0 * (nuf2 *nuf2) - 9.0 * tf2 * (nuf2 * nuf2);
    x5poly = 5.0 + 28.0 * tf2 + 24.0 * tf4 + 6.0 * nuf2 + 8.0 * tf2 * nuf2;
    x6poly = -61.0 - 90.0 * tf2 - 45.0 * tf4 - 107.0 * nuf2 + 162.0 * tf2 * nuf2;
    x7poly = -61.0 - 662.0 * tf2 - 1320.0 * tf4 - 720.0 * (tf4 * tf2);
    x8poly = 1385.0 + 3633.0 * tf2 + 4095.0 * tf4 + 1575 * (tf4 * tf2);
    
    /* Calculate latitude */
    philambda[0] = phif + x2frac * x2poly * (x * x) + x4frac * x4poly * Math.pow (x, 4.0) + x6frac * x6poly * Math.pow (x, 6.0) + x8frac * x8poly * Math.pow (x, 8.0);
    /* Calculate longitude */
    philambda[1] = lambda0 + x1frac * x + x3frac * x3poly * Math.pow (x, 3.0) + x5frac * x5poly * Math.pow (x, 5.0) + x7frac * x7poly * Math.pow (x, 7.0);	
    
    return;
}

/* LatLonToUTMXY
*
* Converts a latitude/longitude pair to x and y coordinates in the
* Universal Transverse Mercator projection.
*
* Inputs:
*   lat - Latitude of the point, in radians.
*   lon - Longitude of the point, in radians.
*   zone - UTM zone to be used for calculating values for x and y.
*          If zone is less than 1 or greater than 60, the routine
*          will determine the appropriate zone from the value of lon.
*
* Outputs:
*   xy - A 2-element array where the UTM x and y values will be stored.
*
* Returns:
*   The UTM zone used for calculating the values of x and y.
*/
function LatLonToUTMXY (lat, lon, zone, xy) {
    MapLatLonToXY (lat, lon, UTMCentralMeridian (zone), xy);
    /* Adjust easting and northing for UTM system. */
    xy[0] = xy[0] * UTMScaleFactor + 500000.0;
    xy[1] = xy[1] * UTMScaleFactor;
    if (xy[1] < 0.0)
       xy[1] = xy[1] + 10000000.0;
    
    return zone;
}

/* UTMXYToLatLon: Converts x and y coordinates in the Universal Transverse Mercator
* projection to a latitude/longitude pair.
*
* Inputs:
*	x - The easting of the point, in meters.
*	y - The northing of the point, in meters.
*	zone - The UTM zone in which the point lies.
*	southhemi - True if the point is in the southern hemisphere;
*               false otherwise.
*
* Outputs:
*	latlon - A 2-element array containing the latitude and
*            longitude of the point, in radians.
*
* Returns:
*	The function does not return a value.
*/
function UTMXYToLatLon (x, y, zone, southhemi, latlon) {
     var cmeridian;	
     x -= 500000.0;
     x /= UTMScaleFactor;	
     /* If in southern hemisphere, adjust y accordingly. */
     if (southhemi)
        y -= 10000000.0;		
     y /= UTMScaleFactor;
     cmeridian = UTMCentralMeridian (zone);
     MapXYToLatLon (x, y, cmeridian, latlon);
	
     return;
}

/* utm2Geog: Converts x and y UTM coordinates in the Universal Transverse Mercator
* projection to a latitude/longitude pair.
*
* Inputs:
*	x - The easting of the point, in meters.
*	y - The northing of the point, in meters.
*	zone - The UTM zone in which the point lies.
*	southhemi - True if the point is in the southern hemisphere;
*               false otherwise.
*
* Outputs and returns:
*	coords - A 2-element array containing the latitude and
*            longitude of the point, in decimal degree. ["lat"] and ["long"]
*/
function utm2Geog(x,y,zone,southhemi) {                                  
    latlon = new Array(2);
    var southhemi; //true (if south) or false (if north)
        
    if ((zone < 1) || (60 < zone)) {
         alert ("The UTM zone you entered is out of range. Please enter a number in the range [1, 60].");
         return false;
    }
        
    UTMXYToLatLon (x, y, zone, southhemi, latlon);
    
    var coords = new Array();
    coords["long"] = RadToDeg (latlon[1]);
    coords["lat"] = RadToDeg (latlon[0]);

    return coords;
}

function geog2albers(lat,lon,lat1,lat2,lat0,long0) {
	var albersCoords = new Array();
	
	lat = DegToRad(lat); //radians values
	lat1 = DegToRad(lat1); //radians values
	lat2 = DegToRad(lat2); //radians values
	lat0 = DegToRad(lat0); //radians values
	
	//lat1, lat2 = standard parallels
	//lat0, long0 = latitude and longitude for the origin of the rectangular coordinates
	//ro = radius of latitude circles, meters
	//n = cone constant or ratio of angle between meridians on map to true angle
	
	var m1 = Math.cos(lat1) / Math.pow(1 - e2 * Math.pow(Math.sin(lat1),2),0.5);
	var m2 = Math.cos(lat2) / Math.pow(1 - e2 * Math.pow(Math.sin(lat2),2),0.5);
	var q = (1 - e2) * (Math.sin(lat) / (1 - e2 * Math.pow(Math.sin(lat),2)) - (1 / (2 * e)) * log((1 - e * Math.sin(lat)) / (1 + e * Math.sin(lat))));
	var q1 = (1 - e2) * (Math.sin(lat1) / (1 - e2 * Math.pow(Math.sin(lat1),2)) - (1 / (2 * e)) * log((1 - e * Math.sin(lat1)) / (1 + e * Math.sin(lat1))));
	var q2 = (1 - e2) * (Math.sin(lat2) / (1 - e2 * Math.pow(Math.sin(lat2),2)) - (1 / (2*e)) * log((1 - e * Math.sin(lat2)) / (1 + e * Math.sin(lat2))));
	var q0 = (1 - e2) * (Math.sin(lat0) / (1 - e2 * Math.pow(Math.sin(lat0),2)) - (1 / (2*e)) * log((1 - e * Math.sin(lat0)) / (1 + e * Math.sin(lat0))));
	var n = (Math.pow(m1,2) - Math.pow(m2,2)) / (q2 - q1);
	var C = Math.pow(m1,2) + n * q1;
	var ro0 = a * Math.pow(C - n * q0,0.5) / n;
	var ro = a * Math.pow(C - n * q,0.5) / n;
	var theta = DegToRad(n * (lon - long0));
			
	albersCoords["right"] = ro * Math.sin(theta);
	albersCoords["up"] = ro0 - ro * Math.cos(theta);
	return albersCoords;
}

function albers2geog(x,y,lat1,lat2,lat0,long0) {
	var geogCoords = new Array();

	lat1 = DegToRad(lat1); //radians values
	lat2 = DegToRad(lat2); //radians values
	lat0 = DegToRad(lat0); //radians values
	
	var m1 = Math.cos(lat1) / Math.pow(1 - e2 * Math.pow(Math.sin(lat1),2),0.5);
	var m2 = Math.cos(lat2) / Math.pow(1 - e2 * Math.pow(Math.sin(lat2),2),0.5);
	var q1 = (1 - e2) * (Math.sin(lat1) / (1 - e2 * Math.pow(Math.sin(lat1),2)) - (1 / (2 * e)) * log((1 - e * Math.sin(lat1)) / (1 + e * Math.sin(lat1))));
	var q2 = (1 - e2) * (Math.sin(lat2) / (1 - e2 * Math.pow(Math.sin(lat2),2)) - (1 / (2*e)) * log((1 - e * Math.sin(lat2)) / (1 + e * Math.sin(lat2))));
	var q0 = (1 - e2) * (Math.sin(lat0) / (1 - e2 * Math.pow(Math.sin(lat0),2)) - (1 / (2*e)) * log((1 - e * Math.sin(lat0)) / (1 + e * Math.sin(lat0))));
	var n = (Math.pow(m1,2) - Math.pow(m2,2)) / (q2 - q1);
	var C = Math.pow(m1,2) + n * q1;
	var ro0 = a * Math.pow(C - n * q0,0.5) / n;
	var ro = Math.pow(Math.pow(x,2) + Math.pow(ro0-y,2),0.5);
	var q = (C - (Math.pow(ro,2) * Math.pow(n,2)) / Math.pow(a,2)) / n;
	var qsin = Math.asin(q/2);
	var theta = RadToDeg(Math.atan(x / (ro0 - y)));
	
	qsin = qsin + (Math.pow(1 - Math.pow(e,2) * Math.pow(Math.sin(qsin),2),2) / (2 * Math.cos(qsin))) * ((q / (1 - Math.pow(e,2))) - (Math.sin(qsin) / (1 - Math.pow(e,2) * Math.pow(Math.sin(qsin),2))) + (1 / (2 * e) * log((1 - e * Math.sin(qsin)) / (1 + e * Math.sin(qsin)))));
	geogCoords["lat"] = RadToDeg(qsin + (Math.pow(1 - Math.pow(e,2) * Math.pow(Math.sin(qsin),2),2) / (2 * Math.cos(qsin))) * ((q / (1 - Math.pow(e,2))) - (Math.sin(qsin) / (1 - Math.pow(e,2) * Math.pow(Math.sin(qsin),2))) + (1 / (2 * e) * log((1 - e * Math.sin(qsin)) / (1 + e * Math.sin(qsin))))));
	
	geogCoords["long"] = long0 + (theta / n);
	
	return geogCoords;
}

/* JavaScript for Calculating Schweizer Landeskoordinaten CH-1903
   to geographic Coordinates in the WGS84-System

   Die Umrechnung basiert auf folgendem Material des Bundesamtes fuer
   Landestopographie der Schweiz, Wabern:
     1. Schweizerisches Projektionssystem. Formeln fuer die 
        Umrechnung von Landeskoordinaten in geographische 
	Koordinaten und umgekehrt, 1984
     2. Transformation von Landeskoordinaten CH-1903 in WGS-84 
        Koordinaten, 1990
     3. Ergaenzung zur Formelzusammenstellung fuer die Umrechnung
        von WGS84-Koordinaten in Schweizerische Projektionskoordinaten
   
   (c) 	AMRON 2001
	Norbert.Marwan@gmx.net, Potsdam   */

function swiss2geog(coordCH,z) {
	B0=0.81947406867611;
	L0=0.1298452241431;
	b0=0.81869435858167;
	e_ch=Math.sqrt(0.006674372230614);
	a_ch=6377397.155;
	K=0.0030667323772751;
	alpha=1.00072913843038;
	R=6378815.90365;
	
	phi=2*(Math.atan(Math.exp((coordCH.y-200000)/R))-Math.PI/4);
	lambda=(coordCH.x-600000)/R;

	lCH=Math.atan(Math.sin(lambda)/(-Math.sin(b0)*Math.tan(phi)+Math.cos(b0)*Math.cos(lambda)));
	phiCH=Math.asin(Math.cos(b0)*Math.sin(phi)+Math.sin(b0)*Math.cos(phi)*Math.cos(lambda));
	

	phi=B0;
	er=1;
	while(er>0.0000001) {
		er=phi;
		S=(1/alpha)*(Math.log(Math.tan(Math.PI/4+phiCH/2))-K)+((e_ch/2)*Math.log( (1+(e_ch*Math.sin(phi))) / (1-(e_ch*Math.sin(phi))) ));
		phi=2*(Math.atan(Math.exp(S))-Math.PI/4);
		er=Math.abs(er-phi);
	}

	l=lCH/alpha+L0;
	h=z*1.0;

	e_ch=0.006674372230614;

	Rn=a_ch/Math.sqrt(1-e_ch*Math.pow(Math.sin(phi),2));

	xCH=(Rn+h)*Math.cos(phi)*Math.cos(l);
	yCH=(Rn+h)*Math.cos(phi)*Math.sin(l);
	zCH=(Rn*(1-e_ch)+h)*Math.sin(phi);

	dX=660.075;
	dY=13.551;
	dZ=369.34;
	M=1.00000566;
	alpha=(2.485/10000)*Math.PI/200;
	beta=(1.783/10000)*Math.PI/200;
	gamma=(2.939/10000)*Math.PI/200;


	xWGS=dX+(M*(Math.cos(beta)*Math.cos(gamma)*xCH+(Math.cos(alpha)*Math.sin(gamma)+(Math.sin(alpha)*Math.sin(beta)*Math.cos(gamma)))*yCH + (Math.sin(alpha)*Math.sin(gamma)-(Math.cos(alpha)*Math.sin(beta)*Math.cos(gamma)))*zCH));
	yWGS=dY+(M*(-Math.cos(beta)*Math.sin(gamma)*xCH+(Math.cos(alpha)*Math.cos(gamma)-(Math.sin(alpha)*Math.sin(beta)*Math.sin(gamma)))*yCH + (Math.sin(alpha)*Math.cos(gamma)-(Math.cos(alpha)*Math.sin(beta)*Math.sin(gamma)))*zCH));
	zWGS=dZ+(M*(Math.sin(beta)*xCH-(Math.sin(alpha)*Math.cos(beta)*yCH) + (Math.cos(alpha)*Math.cos(beta))*zCH));

	a=6378137
	e=0.00669438

	lambda=Math.atan(yWGS/xWGS);
	
	phi=46.952405555*Math.PI/180
	er=1
	while(er>0.0000001) {
		er=phi
		Rn=a/Math.sqrt(1-e*Math.pow(Math.sin(phi),2))
		h=Math.sqrt(Math.pow(xWGS,2)+Math.pow(yWGS,2))/Math.cos(phi)-Rn
		phi=Math.atan((zWGS/Math.sqrt(Math.pow(xWGS,2)+Math.pow(yWGS,2)))/(1-Rn*e/(Rn+h)))
		er=Math.abs(er-phi)
	}

	h=Math.round(h*10)/10;

	return {lat:(phi*180/Math.PI),lon:(lambda*180/Math.PI),z:h};
}

