<?php
/* 	数据库连接参数	*/
$dbms='mysql';    	//数据库类型 Oracle 用ODI
$host='localhost';		//数据库主机名
$dbName='gis';   	//使用的数据库
$user='root';     		//数据库连接用户名
$pass='root';         	//对应的密码
$dsn="$dbms:host=$host;dbname=$dbName";

$car_id = $_REQUEST["car_id"]; // 获取传入的车辆的ID
$from_time = $_REQUEST["from_time"];    // 获取传入的开始时间
$to_time = $_REQUEST["to_time"]; // 获取传入的终止时间
$total_seconds = $_REQUEST["total_seconds"]; // 动画显示的总时间

try{
	/*	初始化一个PDO对象，就是创建了数据库连接对象	*/
	$dbh=new PDO($dsn,$user,$pass);
	//echo "连接成功<br/>";	//调试用途

	/*	从传入参数获得查询条件	*/
	$oid =$_REQUEST["oid"];
	
	/*	拼装SQL语句			*/
	// 先得到记录数
	$sql = "SELECT count(*) vcount from SO_CAR_HISTORY_POS where car_id = ".$car_id." and cartime >= '".$from_time."' and cartime <= '".$to_time."' order by cartime";	//有查询条件

	$dbh->query("SET NAMES 'utf8'");
	$dbh->query("SET CHARACTER_SET_CLIENT=utf8");
	$dbh->query("SET CHARACTER_SET_RESULTS=utf8");
	//echo $sql;
	$rec_count;
	foreach($dbh->query($sql) as $row)
	{
		//print_r($row);	//调试用途
		$rec_count = $row[0];
	}
	// 开始查询
	$sql = "SELECT x, y, cartime from SO_CAR_HISTORY_POS where car_id = ".$car_id." and cartime >= '".$from_time."' and cartime <= '".$to_time."' order by cartime";	//有查询条件
	// 返回结果的xml文档
	$car_hist_pos = "";
	$one_car_pos = "";

	// 按时间平分，每秒要显示的坐标记录数
	$seg_count = 1; // 每秒的记录数
	if($rec_count > 0)
		$seg_count = ceil($rec_count / $total_seconds); // 截取整数部分

	//if($seg_count < 1) $seg_count = 1;

	$one_time_str;
	$time_str = "";

	$mod_index = 0;

	$index = 0;
	foreach($dbh->query($sql) as $row)
	{
		//$car_id = ora_getcolumn($cursor, 0);
		//$car_code = mb_convert_encoding(ora_getcolumn($cursor, 1), "UTF-8", "GB2312");
		//$car_name = mb_convert_encoding(ora_getcolumn($cursor, 2), "UTF-8", "GB2312");;
		
		$index = $index + 1;
		$mod_index = $index % $seg_count;
		
		
		
		if($mod_index == 1) 
		{
			$one_time_str = $row[2];
			if($index == 1)	$time_str = $one_time_str;
			else $time_str = $time_str."/".$one_time_str;
		}


		$pos_x = $row[0];
		$pos_y = $row[1];

		$one_car_pos = $pos_x.":".$pos_y;
		$car_hist_pos = $car_hist_pos.";".$one_car_pos;
	}
	$hist_pos_info = $time_str."&".$car_hist_pos;

	echo $hist_pos_info;

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