<?php

require_once("inc/Configuration.inc.php");
require_once("Car.php");

/*	拼装SQL语句			*/
//有查询条件
//$sql = "SELECT objectid,x,y from sde.car where objectid='" . $oid . "'";
//无查询条件
$sql = "SELECT ID,c.x,c.y, CAR_CODE,CAR_NAME,b.TYPE_name,CAR_OWNER from  so_car_info a ,so_car_type b, so_car_current_pos c where a.car_type_id = b.type_id and c.car_id = a.id ";
	
try{
	/*	初始化一个PDO对象，就是创建了数据库连接对象	*/
	$dbh=new PDO($_configuration['db_driver'], $_configuration['db_user']	, $_configuration['db_password']	);
	$dbh->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
	//echo "连接成功<br/>";	//调试用途
	
	//echo $sql;
	foreach($dbh->query($sql) as $row)
	{
		//print_r($row);	//调试用途
		$car = new Car();
		$car->oid 		= $row[0]; 
		$car->cx 		= $row[1];
		$car->cy 		= $row[2];		
		$car->CAR_CODE 	= $row[3];
		$car->CAR_NAME 	= $row[4];
		$car->CAR_TYPE 	= $row[5];
		$car->CAR_OWNER	= $row[6];
		
		//拼装全部circle的SVG XML定义
		$svgxml = $svgxml .  $car->tosvg() . ';' ;
		//	echo $svgxml;
	}
	
	//输出给浏览器端的内容
	$svgxml = mb_convert_encoding($svgxml, "UTF-8", "GB2312" );
	
	header("Content-type: text/xml");
	echo '<g id="' . $myId. '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  
	xmlns:attrib="http://www.carto.net/attrib"  attrib:timestamp="'. $timestamp.'">';
	echo $svgxml;
	echo "</g>";

	// 释放PHP的数据库连接，即此处清空后Oracle OCI8驱动客户端会重用连接
	$dbh=null;
}catch(PDOException$e){
	//显示数据库操作错误信息
	die("Error!: ".$e->getMessage()."<br/>");
}

?>