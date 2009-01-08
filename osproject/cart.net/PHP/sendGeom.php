<?
header("Content-type: text/xml");
//the content-type header is necessary for Mozilla SVG and the XMLHttpRequest
//specify connect variables
//test url: sendGeom.php?layername=hydrology&xmin=244000&ymin=4150000&xmax=308000&ymax=4231000&timestamp=123
$username = 'webuser';
$dbGeomName = 'earth';
$password = 'svgextractor';
$hostname = 'pg.mydomain.com';

//get URL parameters
$layername = $_GET['layername'];
$myId = $layername.'_tempGeometry';
$xmin = intval($_GET['xmin']);
$xmax = intval($_GET['xmax']);
$ymin = intval($_GET['ymin']);
$ymax = intval($_GET['ymax']);
$timestamp = $_GET['timestamp'];
$width = $xmax - $xmin;
$height = $ymax - $ymin;

//set srid for UTM zone 11N, change that to match your epsg projection code
$srid = 26911;

//intersection polygon to clip out data where useful
$intersectPolygon = 'GeometryFromText(\'POLYGON(('.$xmin.' '.$ymin.','.$xmax.' '.$ymin.','.$xmax.' '.$ymax.','.$xmin.' '.$ymax.','.$xmin.' '.$ymin.'))\','.$srid.')';
//tolerance for generalization
$simplifyTolerance = $width / 800;

//connect to db
$my_pg_connect = pg_Connect('host='.$hostname.' dbname='.$dbGeomName.' user='.$username.' password='.$password) or die ('Can\'t connect to database '.$dbGeomName);

//case hydrology
if ($layername == 'hydrology') {
	print '<g id="'.$myId.'" xmlns="http://www.w3.org/2000/svg" xmlns:attrib="http://www.carto.net/attrib" attrib:timestamp="'.$timestamp.'">'."\n";
		//extract the rivers
		print '<g id="'.$myId.'_rivers" fill="none" stroke="cornflowerblue" stroke-width="'.$width * 0.001.'">'."\n";

		//first determine tablename and select criteria
		//you could define multiple tablenames here, e.g. for multiple map scales,
		//and switch them according to the $width variable
		$tablename = 'rivers';
		$addWhereClause = ' AND (type_name = \'Stream/Rriver\' OR type_name = \'Canal/Ditch\' OR type_name = \'Pipeline\')';

		//now define threshold values for river levels
		if ($width > 50000) {
			$addWhereClause .= ' AND levels < 4';
		}
		elseif ($width <= 50000 and $width > 30000) {
			$addWhereClause .= ' AND levels < 5';
		}
		elseif ($width <= 30000 and $width > 20000) {
			$addWhereClause .= ' AND levels < 8';
		}
		elseif ($width <= 20000 and $width > 10000) {
			$addWhereClause .= ' AND levels < 12';
		}
		elseif ($width <= 10000 and $width > 5000) {
			$addWhereClause .= ' AND levels < 15';
		}
		else {
			$addWhereClause .= '';
		}

		//sql parts:
		$sql1 = 'SELECT name, levels, AsSVG(intersection(';
		$sql2 = ','.$intersectPolygon.'),1,1) AS svg_geom FROM '.$tablename.' WHERE the_geom && setSRID(\'BOX3D('.$xmin.' '.$ymin.', '.$xmax.' '.$ymax.')\'::box3d,'.$srid.')';
		$orderBy = ' ORDER BY levels ASC';

		//distinquish between filtered and full resolution, concatenate sql
		if ($width > 5000) {
			$mySQL = $sql1.'Simplify(the_geom,'.$simplifyTolerance.')'.$sql2.$addWhereClause.$orderBy;
		}
		else {
			$mySQL = $sql1.'the_geom'.$sql2.$addWhereClause.$addWhereClause.$orderBy;
		}

		//execute sql command
		$my_result_set = pg_Exec($my_pg_connect, $mySQL) or die (pg_ErrorMessage());

		//get number of rows retrieved
		$numRecs = pg_NumRows($my_result_set);

		$oldClass = '';
		$i = 0;
		while ($i < $numRecs) {
			$resultArray = pg_Fetch_Array($my_result_set, $i);
			//check if a new group is opened
			if ($oldClass != $resultArray['levels']) {
				//close group if already open
				if ($oldClass != '') {
					print "</g>\n";
				}
				//define stroke-width for new group
				$strokeWidth = '';
				if ($resultArray['levels'] < 4) {
					$strokeWidth = 'stroke-width="'.$width * 0.003.'"';
				}
				elseif ($resultArray['levels'] >= 4 and $resultArray['levels'] < 5) {
					$strokeWidth = 'stroke-width="'.$width * 0.0025.'"';
				}
				elseif ($resultArray['levels'] >= 5 and $resultArray['levels'] < 8) {
					$strokeWidth = 'stroke-width="'.$width * 0.0020.'"';
				}
				elseif ($resultArray['levels'] >= 8 and $resultArray['levels'] < 15) {
					$strokeWidth = 'stroke-width="'.$width * 0.0015.'"';
				}
				print '<g id="'.$tablename.'_'.$resultArray['levels'].'" '.$strokeWidth.'>'."\n";
				$oldClass = $resultArray['levels'];
			}

			$mySvgString = $resultArray['svg_geom'];
			//check if the returned element contains data
			if (strlen($mySvgString) > 0) {
				print "\t".'<path attrib:name="'.$resultArray['name'].'" d="'.$mySvgString.'" />'."\n";
			}
			$i++;
		}
		if ($numRecs > 0) {
			print "</g>\n";
		}
		print "</g>\n";

	print '<attrib:layerData id="'.$layername.'Data" attrib:nrRecs="'.$numRecs.'" attrib:layerName="'.$layername.'" />'."\n";
	//close open group
	print "</g>\n";
}

//close db connection
pg_Close($my_pg_connect);
?>
