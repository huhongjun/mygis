<?php
/*	========================help=================================================================================
	����PHP PDO������֧�����ݿ��޹��ԣ�
	���Ӳ�ͬ���ݿ�ֻ���޸�dbms,���ܵ�ֵ��mysql/odi/mssql/postsql/odbc��
	Ĭ��������ǳ����ӣ������Ҫ���ݿⳤ���ӣ���Ҫ����һ��������array(PDO::ATTR_PERSISTENT => true) ���������
	$db=new PDO($dsn,$user,$pass,array(PDO::ATTR_PERSISTENT=>true));
	���ԣ�
		http://localhost/SVGMapNavigationTools/cfdgis/php/getGeoLayer.php?layer=car&timestamp=12345678
		�������ô�����������Ӳ�����sql��䣬�������ݿ������Ϣ����
	SVG�ļ������ʹ�ã�
		SVG�л�õ��ı�����echo�����
		����·��	http://localhost/chd/DGGeo_PDO.php
		���·��	DGGeo_PDO.php(SVG�ļ�֮��ͬһ��Ŀ¼)
	============================================================================================================== */
	
require_once("inc/Configuration.inc.php");

$svgxml ="";

$layer =$_REQUEST["layer"];	//	�Ӵ��������ò�ѯ����
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