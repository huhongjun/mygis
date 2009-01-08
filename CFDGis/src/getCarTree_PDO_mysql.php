<?php
if ( stristr($_SERVER["HTTP_ACCEPT"],"application/xhtml+xml") ) 
{ 
	header("Content-type: application/xhtml+xml"); 
} 
else 
{ 
	header("Content-type: text/xml"); 
} 

echo("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"); 

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


	/*	从传入参数获得查询条件	*/
	$group =$_REQUEST["id"];

	/*	拼装SQL语句			*/
	$where;
	if ($group ==0)	;
	else if ($group ==1)	$where = "where CAR_TYPE='柳工'";
	else if ($group ==2) $where = "where CAR_TYPE='龙工'";
	else	
	{
	$group = 3;
	$where = "  where id >=60";
	}
	
	$sql = "SELECT ID,X,Y,CAR_CODE,CAR_NAME,CAR_TYPE,CAR_OWNER from sde.SO_CAR_CURRENT_POS ";	//有查询条件
	$sql = $sql.$where;

	//$sqlall = "SELECT ID,X,Y,CAR_CODE,CAR_NAME,CAR_TYPE,CAR_OWNER from SO_CAR_CURRENT_POS ";				//无查询条件
    $type1=mb_convert_encoding("柳工",   "UTF-8","GB2312");
    $type2=mb_convert_encoding("龙工",   "UTF-8","GB2312");
    $type3=mb_convert_encoding("联众",   "UTF-8","GB2312");
	if ($group == 0){
		$svgxml = '<tree id="0">
		<item child="1" id="1" text="'.$type1.'">
		<userdata name="ud_block">ud_data</userdata>
		</item>

		<item child="1" id="2" text="'.$type2.'">
		<userdata name="ud_block">ud_data</userdata>
		</item>

		<item child="1" id="3" text="'.$type3.'">
		<userdata name="ud_block">ud_data</userdata>
		</item>		</tree>';
				
		echo $svgxml;

	}
	else{
		
			if(!($conn=ora_logon("system@hlgis","system"))) 
			{ 
				echo "Error: Cannot connect to database\n"; 
				exit; 
			} 	
			$cursor=ora_open($conn);
			ora_parse($cursor,$sql,0); 
			ora_exec($cursor);
			while(ora_fetch($cursor)) 
			{ 

				$circleoid = ora_getcolumn ($cursor, 0);
				$circlecx = ora_getcolumn ($cursor, 1);
				$circlecy = ora_getcolumn ($cursor, 2);
				$CAR_CODE = mb_convert_encoding(ora_getcolumn ($cursor, 3),   "UTF-8","GB2312");
				$CAR_NAME = mb_convert_encoding(ora_getcolumn ($cursor, 4),   "UTF-8","GB2312");
				$CAR_TYPE = mb_convert_encoding(ora_getcolumn ($cursor, 5),   "UTF-8","GB2312");
				$CAR_OWNER= ora_getcolumn ($cursor, 6);

		        $circlexml = $circleoid.":".$CAR_NAME.":".$CAR_TYPE;
				$svgxml = $svgxml .';'. $circlexml;
						$carinforxml = "<item child='0' id='".$circleoid."' text='".$CAR_NAME."'><userdata name='ud_block'>ud_data</userdata></item>";
						
						//拼装全部circle的SVG XML定义
						$svgxml = $svgxml . $carinforxml;	
						
			} 
			$svgxml  = "<tree id='" .$group."'>" . $svgxml . "</tree>";	
					
			//输出给浏览器端的内容
			echo $svgxml; 
			
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