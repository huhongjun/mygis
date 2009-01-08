<?php

require_once("inc/Configuration.inc.php");
require_once("Car.php");

try{
	/*	初始化一个PDO对象，就是创建了数据库连接对象	*/
	$dbh=new PDO($_configuration['db_driver'], $_configuration['db_user']	, $_configuration['db_password']	);
	$dbh->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	//echo "连接成功<br/>";
	
	//首先获得车辆类型记录
	$sqltype = "SELECT TYPE_ID,TYPE_NAME from SO_CAR_TYPE ";	
	$rs = $dbh->prepare($sqltype,array(PDO_ATTR_CURSOR, PDO_CURSOR_FWDONLY));
	$rs->execute();
	$rs->setFetchMode(PDO::FETCH_NUM);
	$rowstype = $rs->fetchAll();
			
	$sqlcar = "SELECT CAR_CODE,CAR_NAME,CAR_TYPE_ID from SO_CAR_INFO";
	$rs1 = $dbh->prepare($sqlcar,array(PDO_ATTR_CURSOR, PDO_CURSOR_FWDONLY));
	$rs1->execute();
	$rs1->setFetchMode(PDO::FETCH_NUM);
	$rowscar=$rs1->fetchAll();
	
	$xml ="<list>";
	//$xml ="";
	foreach($rowstype as $rowtype)
	{
		$TYPE_ID 					= $rowtype[0]; 
		$TYPE_NAME 				= $rowtype[1]; 
		
		$xmltype = "<type name='" . $TYPE_NAME  ."' code='" . $TYPE_ID ."'>";
		foreach($rowscar as $row)
		{
			$car = new Car();
			$car->CAR_CODE		= $row[0]; 
			$car->CAR_NAME 	= $row[1];
			$car->CAR_TYPE 	= $row[2];
			if($car->CAR_TYPE == $TYPE_ID)
			{
				$xmlcar = "<car code='" . $car->CAR_CODE . "' name='" . $car->CAR_NAME . "'/>";
				$xmltype = $xmltype . $xmlcar;
			}

		}
		$xmltype = $xmltype . "</type>";
		$xml = $xml . $xmltype;
	}
	
	$xml =  $xml. "</list>";
	
	//输出给浏览器端的内容
	header("Content-type: text/xml"); 
	$xml = mb_convert_encoding($xml, "UTF-8", "GB2312" );
	echo $xml; 
			
}catch(PDOException$e){
	//显示数据库操作错误信息
	die("Error!: ".$e->getMessage()."<br/>");
}