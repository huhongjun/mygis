<?php
/* 	数据库连接参数	*/
$dbms='mysql';    	//数据库类型 Oracle 用ODI
$host='localhost';		//数据库主机名
$dbName='gis';   	//使用的数据库
$user='root';     		//数据库连接用户名
$pass='root';         	//对应的密码
$dsn="$dbms:host=$host;dbname=$dbName";

/*	circle 属性变量	*/
$circleoid ="";
$circlecx = 0;
$circlecy = 0;

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
	//$sql = "SELECT objectid,x,y from sde.car where objectid='" . $oid . "'";	//有查询条件
	$sql = "SELECT ID,c.x,c.y, CAR_CODE,CAR_NAME,b.TYPE_name,CAR_OWNER from  so_car_info a ,so_car_type b, so_car_current_pos c where a.car_type_id = b.type_id and c.car_id = a.id ";	//有查询条件

	$dbh->query("SET NAMES 'utf8'");
	$dbh->query("SET CHARACTER_SET_CLIENT=utf8");
	$dbh->query("SET CHARACTER_SET_RESULTS=utf8");
//echo $sql;
	foreach($dbh->query($sql) as $row)
	{
		//print_r($row);	//调试用途
		$circleoid 		= $row[0];
		$circlecx 		= $row[1];
		$circlecy 		= $row[2];		
		$CAR_CODE = $row[3];
		$CAR_NAME = $row[4];
		$CAR_TYPE = $row[5];
		$CAR_OWNER= $row[6];
		
        $circlexml = "<use id='".$circleoid."' x='". $circlecx."' y='" . $circlecy ."' CAR_CODE='".$CAR_CODE."' CAR_NAME='".$CAR_NAME."' CAR_TYPE='".$CAR_TYPE."' xlink:href='#ballGroup' stroke='red' fill='#ffff00' onclick='carinfor(evt)' onmouseout='nomralColor(evt)' onmousemove='highColor(evt)' transform='rotate(0 x,y) scale(0.01)'/>";
        if ($circleoid == 999 )
        {
        $circlexml = "<use id='".$circleoid."' x='". $circlecx."' y='" . $circlecy ."' CAR_CODE='".$CAR_CODE."' CAR_NAME='".$CAR_NAME."' CAR_TYPE='".$CAR_TYPE."' xlink:href='#ballGroupJiaoChe' transform='rotate(0 x,y) scale(0.01)'/>";
        }
		//拼装全部circle的SVG XML定义
		$svgxml = $svgxml .';'. $circlexml;
	//	echo $svgxml;
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