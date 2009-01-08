<?php




try {
	$conn=ora_logon("sde@lhgis","sde");

}
catch (Exception $exc)
{
	return 'ERROR #1: Could not connect to the database';
}
$qry="SELECT 
x \"Dept\" 
,y \"Emp\" 

FROM 
car"; 

	$result = mysql_query($sql, $db);
$cursor=ora_open($conn); 
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