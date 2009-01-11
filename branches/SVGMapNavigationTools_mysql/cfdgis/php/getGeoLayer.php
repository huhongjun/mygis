<?php
/*	========================help=================================================================================
	采用PHP PDO开发，支持数据库无关性，
	连接不同数据库只需修改dbms,可能的值有mysql/odi/mssql/postsql/odbc等
	默认这个不是长连接，如果需要数据库长连接，需要最后加一个参数：array(PDO::ATTR_PERSISTENT => true) 变成这样：
	$db=new PDO($dsn,$user,$pass,array(PDO::ATTR_PERSISTENT=>true));
	测试：
		http://localhost/SVGMapNavigationTools/cfdgis/php/getGeoLayer.php?layer=car&timestamp=12345678
		故意设置错误的数据连接参数或sql语句，测试数据库错误消息处理
	SVG文件中如何使用：
		SVG中获得的文本来自echo的输出
		绝对路径	http://localhost/chd/DGGeo_PDO.php
		相对路径	DGGeo_PDO.php(SVG文件之在同一个目录)
	============================================================================================================== */
	
require_once("inc/Configuration.inc.php");

$svgxml ="";

$layer =$_REQUEST["layer"];	//	从传入参数获得查询条件
$timestamp = $_REQUEST['timestamp'];//echo $timestamp;
$myId = $layer.'_tempGeometry';

if ($layer == 'car')
{
	include "getGeoCarAll.php";
}
else if($layer == 'stack')
{
	include "getGeoStackAll.php";
} 
else if($layer == 'area')
{
	include "getGeoareaAll.php";
} 
else
{
	//include "getOther.php";	
}
?>