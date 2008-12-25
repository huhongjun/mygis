<?php
/* 	数据库连接参数	*/
$dbms='mysql';    	//数据库类型 Oracle 用ODI
$host='localhost';		//数据库主机名
$dbName='gis';   	//使用的数据库
$user='root';     		//数据库连接用户名
$pass='root';         	//对应的密码
$dsn="$dbms:host=$host;dbname=$dbName";

$circlexml = "";
$svgxml ="";

try{
	/*	初始化一个PDO对象，就是创建了数据库连接对象	*/
	$dbh=new PDO($dsn,$user,$pass);
	//echo "连接成功<br/>";	//调试用途

	/*	从传入参数获得查询条件	*/
	$oid =$_REQUEST["oid"];
	
	/*	拼装SQL语句			*/
	//有查询条件
	$sql = "select ID,STOW_NAME,BOAT_NAME,COUSTOMER_NAME,COUSTOMER_NAME1,GOODS_NAME from SO_INOUT_STACK_ITME ";	//有查询条件
	//无查询条件
	$sqlall = "SELECT id,x,y from SO_CAR_CURRENT_POS";				

	$dbh->query("SET NAMES 'utf8'");
	$dbh->query("SET CHARACTER_SET_CLIENT=utf8");
	$dbh->query("SET CHARACTER_SET_RESULTS=utf8");
	 
	foreach($dbh->query($sql) as $row)
	{
		//print_r($row);	//调试用途
		$STOWid 					= $row[0];
		$STOW_NAME				= $row[1];
		$BOAT_NAME				= $row[2];		
		$COUSTOMER_NAME		= $row[3];	
		$COUSTOMER_NAME1	= $row[4];	
		$GOODS_NAME			= $row[5];	
		
		//生成circle的SVG XML定义        
		$STOWxml 	= $STOWid.":".$STOW_NAME.":".$BOAT_NAME.":".$COUSTOMER_NAME.":".$COUSTOMER_NAME1.":".$GOODS_NAME;

		//拼装全部circle的SVG XML定义
		$svgxml = $svgxml . ';' . $STOWxml;	
	}
	
	//输出给浏览器端的内容
	echo $svgxml;

// 释放PHP的数据库连接，即此处清空后Oracle OCI8驱动客户端会重用连接
	$dbh=null;
}catch(PDOException$e){
	//显示数据库操作错误信息
	die("Error!: ".$e->getMessage()."<br/>");
}


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