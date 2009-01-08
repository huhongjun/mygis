<?php

define( "DATABASE_SERVER", "localhost");
define( "DATABASE_USERNAME", "root");
define( "DATABASE_PASSWORD", "root");
define( "DATABASE_NAME", "amfphp");


try {
	$db = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD);
	mysql_select_db(DATABASE_NAME, $db);
}
catch (Exception $exc)
{
	return 'ERROR #1: Could not connect to the database';
}

	$sql = "SELECT oid, cx, cy from gis where oid = '1'";

	$result = mysql_query($sql, $db);

	while ($row = mysql_fetch_object($result)) {
		$circleoid = $row->oid;
		$circlecx = $row->cx;
		$circlecy = $row->cy;
	}
	
	mysql_free_result($result);

$demooid = "cir1";
$democx = "20";
$democy = "20";
		
$circle = "<circle id='". $demooid ."' cx='". $democx ."' cy='" . $democy ."' r='10' fill='#FFFFFF' stroke='#000000' />";
$circleD = "<circle id='". $circleoid ."' cx='". $circlecx ."' cy='" . $circlecy ."' r='10' fill='#FFFFFF' stroke='#000000' />";

//echo $circle;
echo $circleD;


?>