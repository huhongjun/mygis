<?php

require_once("inc/Configuration.inc.php");

/*	传入参数	*/
$stackid 	=		$_REQUEST["uSTOWid"];  
$stackarea = 		$_REQUEST["uStackArea"];  

/*	拼装SQL语句			*/
$sql = "update SO_INOUT_STACK_ITME set STOW_NAME='" . $stackarea ."' where id=" .  $stackid;

try{
		/*	初始化一个PDO对象，就是创建了数据库连接对象	*/
		$dbh=new PDO($_configuration['db_driver'], $_configuration['db_user']	, $_configuration['db_password']	);
		$dbh->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
		//echo "连接成功<br/>";	//调试用途
	
		$rows = $dbh->exec($sql);
		echo "update record:" . $rows;
		
		$dbh=null;
	}	catch(PDOException $e){
	//显示数据库操作错误信息
	die("Error!: ".$e->getMessage()."<br/>");
}
   
?>