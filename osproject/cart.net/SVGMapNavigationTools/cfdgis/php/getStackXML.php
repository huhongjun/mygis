<?php

require_once("inc/Configuration.inc.php");
require_once("Stack.php");

	//无查询条件
	$sql = "select ID,STOW_NAME,BOAT_NAME,COUSTOMER_NAME,COUSTOMER_NAME1,GOODS_NAME from SO_INOUT_STACK_ITME ";	

$xml ="";
try{
	/*	初始化一个PDO对象，就是创建了数据库连接对象	*/
	$dbh=new PDO($_configuration['db_driver'], $_configuration['db_user']	, $_configuration['db_password']	);
	$dbh->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
	
	//echo $sql;
	foreach($dbh->query($sql) as $row)
	{
		//print_r($row);	//调试用途
		$stack = new Stack();
		$stack->STOWid		= $row[0]; 
		$stack->STOW_NAME 		= $row[1];
		$stack->BOAT_NAME 		= $row[2];		
		$stack->COUSTOMER_NAME 	= $row[3];
		$stack->COUSTOMER_NAME1 	= $row[4];
		$stack->GOODS_NAME 	= $row[5];
		
		//拼装全部circle的SVG XML定义
		$xml = $xml .  $stack->toxml();
	}
	
	//输出给浏览器端的内容
	$xml = mb_convert_encoding($xml, "UTF-8", "GB2312" );

	header("Content-type: text/xml");
	$xml = "<list>".$xml."</list>";
	echo $xml;

	// 释放PHP的数据库连接，即此处清空后Oracle OCI8驱动客户端会重用连接
	$dbh=null;
}catch(PDOException$e){
	//显示数据库操作错误信息
	die("Error!: ".$e->getMessage()."<br/>");
}

?>