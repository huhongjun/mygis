<?php
/* 	数据库连接参数	*/
$dbms='ORA';    	//数据库类型 Oracle 用OCI
$host='127.0.0.1';		//数据库主机名
$dbName='lhgis';   	//使用的数据库
$user='sde';     		//数据库连接用户名
$pass='sde';         	//对应的密码
$dsn="$dbms:host=$host;dbname=$dbName";

/*	circle 属性变量	*/
$circleoid ="";
$circlecx = 0;
$circlecy = 0;

$circlexml = "";
$svgxml ="";

//try{
	/*	初始化一个PDO对象，就是创建了数据库连接对象	*/
	if(!($conn=ora_logon("system@hlgis","system"))) 
	{ 
		echo "Error: Cannot connect to database\n"; 
		exit; 
	} 

	/*	从传入参数获得查询条件	*/
	$oid =$_REQUEST["oid"];
	
	/*	拼装SQL语句			*/
	//$sql = "SELECT objectid,x,y from sde.car where objectid='" . $oid . "'";	//有查询条件
	$sql = "SELECT id,x,y from sde.SO_CAR_CURRENT_POS ";	//有查询条件
	$cursor=ora_open($conn);
	ora_parse($cursor,$sql,0); 
	ora_exec($cursor);
//echo $sql;
	while(ora_fetch($cursor)) 
	{ 
		//	print_r($cursor);	//调试用途
		$circleoid = ora_getcolumn ($cursor, 0);
		$circlecx = ora_getcolumn ($cursor, 1);
		$circlecy = ora_getcolumn ($cursor, 2); 

	//	$circlexml = "<circle id='". $circleoid ."' cx='". $circlecx ."' cy='" . $circlecy ."' r='10' fill='#FFFFFF' stroke='#000000' />";
		$circlexml = $circleoid.":". $circlecx.":". $circlecy ;
		//echo 	$circlexml;
		//拼装全部circle的SVG XML定义
		$svgxml = $svgxml .';'. $circlexml;
	//	echo $svgxml;
	} 

	
	//输出给浏览器端的内容
	echo $svgxml;
   
	// 释放PHP的数据库连接，即此处清空后Oracle OCI8驱动客户端会重用连接
   ora_logoff($conn); 
//}catch(){
//	die("Error!: ".$e->getMessage()."<br/>");
//}


/*	help
	采用PHP PDO开发，支持数据库无关性，
	连接不同数据库只需修改dbms,可能的值有mysql/odi/mssql/postsql/odbc等
	默认这个不是长连接，如果需要数据库长连接，需要最后加一个参数：array(PDO::ATTR_PERSISTENT => true) 变成这样：
	$db=new PDO($dsn,$user,$pass,array(PDO::ATTR_PERSISTENT=>true));
	测试：
		http://localhost/chd/DGGeo_PDO.php
		http://loclahost/chd/DBGeo_PDO.php?oid=1
		故意设置错误的数据连接参数或sql语句，测试数据库错误消息处理
	SVG文件中如何使用：
		SVG中获得的文本来自echo的输出
		绝对路径	http://localhost/chd/DGGeo_PDO.php
		相对路径	DGGeo_PDO.php(SVG文件之在同一个目录)
*/
?>