<?php

require_once("inc/Configuration.inc.php");

/*	�������	*/
$stackid 	=		$_REQUEST["uSTOWid"];  
$stackarea = 		$_REQUEST["uStackArea"];  

/*	ƴװSQL���			*/
$sql = "update SO_INOUT_STACK_ITME set STOW_NAME='" . $stackarea ."' where id=" .  $stackid;

try{
		/*	��ʼ��һ��PDO���󣬾��Ǵ��������ݿ����Ӷ���	*/
		$dbh=new PDO($_configuration['db_driver'], $_configuration['db_user']	, $_configuration['db_password']	);
		$dbh->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
		//echo "���ӳɹ�<br/>";	//������;
	
		$rows = $dbh->exec($sql);
		echo "update record:" . $rows;
		
		$dbh=null;
	}	catch(PDOException $e){
	//��ʾ���ݿ����������Ϣ
	die("Error!: ".$e->getMessage()."<br/>");
}
   
?>