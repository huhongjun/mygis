package component.mapext
{
	import org.openscales.core.feature.LineStringFeature;
	import org.openscales.core.feature.MultiLineStringFeature;
	import org.openscales.core.feature.MultiPointFeature;
	import org.openscales.core.feature.MultiPolygonFeature;
	import org.openscales.core.feature.PointFeature;
	import org.openscales.core.feature.PolygonFeature;
	import org.openscales.core.layer.FeatureLayer;
	import org.openscales.core.layer.osm.Mapnik;
	import org.openscales.core.style.Rule;
	import org.openscales.core.style.Style;
	import org.openscales.core.style.fill.SolidFill;
	import org.openscales.core.style.marker.WellKnownMarker;
	import org.openscales.core.style.stroke.Stroke;
	import org.openscales.core.style.symbolizer.LineSymbolizer;
	import org.openscales.core.style.symbolizer.PointSymbolizer;
	import org.openscales.core.style.symbolizer.PolygonSymbolizer;
	import org.openscales.geometry.Geometry;
	import org.openscales.geometry.LineString;
	import org.openscales.geometry.LinearRing;
	import org.openscales.geometry.MultiLineString;
	import org.openscales.geometry.MultiPoint;
	import org.openscales.geometry.MultiPolygon;
	import org.openscales.geometry.Polygon;
	import org.openscales.proj4as.ProjProjection;
	
	/**
	 * Create sample layers. Externalized in a class in order to be reused in unit tests for
	 * example.
	 */
	public class SampleLayers
	{
		/**
		 * void constructor for the SampleLayers class wich is a collection of
		 * static functions returning some sample layers.
		 */
		public function SampleLayers() {
			// Nothing to do
		}
		
		/**
		 * Returns a sample layer of drawn features
		 */
		static public function baseLayerOSM():Mapnik {
			var layer:Mapnik = new Mapnik("Mapnik");
			return layer;
		}
		
		/**
		 * Returns a sample layer of drawn features
		 */
		static public function features():FeatureLayer {
			// Create the drawings layer and some useful variables
			var layer:FeatureLayer = new FeatureLayer("地图编辑");
			layer.projection = new ProjProjection("EPSG:4326");
			var style:Style;
			var rule:Rule;
			var arrayComponents:Vector.<Number>;
			var arrayVertices:Vector.<Geometry>;
			var point:org.openscales.geometry.Point;
			
			// Add some (black) objects for the tests of inclusion with all the
			// features added below.

			style = new Style();
			style.rules.push(new Rule());
			style.rules[0].symbolizers.push(new PolygonSymbolizer(new SolidFill(0x999999,0.5),new Stroke(0x000000,2)));

			arrayComponents = new Vector.<Number>(8);
			arrayVertices = new Vector.<Geometry>(1);
			
			arrayComponents[0]=115;//4.5727844237936415;
			arrayComponents[1]=42;//45.713361819965364;
			arrayComponents[2]=118;//5.0300903319148516;
			arrayComponents[3]=42;//45.713361819965364;
			arrayComponents[4]=118;//5.0300903319148516;
			arrayComponents[5]=39;// 45.659157810588724;
			arrayComponents[6]=115;//4.5727844237936415;
			arrayComponents[7]=39;// 45.659157810588724;
			
			arrayVertices[0]=new LinearRing(arrayComponents);
			layer.addFeature(new PolygonFeature(new Polygon(arrayVertices),null,style));
			//(layer.features[layer.features.length-1] as Feature).id = "blackPolygon";
			
			// Add a Point.
			// This point is inside a hole of  the sample polygon: it must
			//   be selectable through the polygon.
			style = new Style();
			style.rules.push(new Rule());
			(style.rules[0] as Rule).symbolizers.push(new PointSymbolizer(new WellKnownMarker(WellKnownMarker.WKN_CIRCLE,new SolidFill(0xFF0000,0.5),new Stroke(0xFF0000,2),10)));
			point = new org.openscales.geometry.Point(116.20283,40.12832);
			layer.addFeature(new PointFeature(point,null,style));
			//(layer.features[layer.features.length-1] as Feature).id = "Point";
			
			// return the vector layer
			return layer;
		}
		
		/**
		 * Returns a sample layer using the WFS 1.0.0 protocol
		 */
		/*static public function wfs100():WFS100 {
		// TODO
		}*/
		
		/**
		 * Returns a sample layer using the WFS 1.1.0 protocol
		 */
		/*static public function wfs110():WFS110 {
		// TODO
		}*/
		
	}
}