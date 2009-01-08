<?php
/* 	数据库连接参数	*/
$dbms='ORA';    	//数据库类型 Oracle 用OCI
$host='127.0.0.1';		//数据库主机名
$dbName='lhgis';   	//使用的数据库
$user='sde';     		//数据库连接用户名
$pass='sde';         	//对应的密码
$dsn="$dbms:host=$host;dbname=$dbName";

	/*	从传入参数获得查询条件	*/
	$stackid 	=		$_REQUEST["uSTOWid"];  
	$stackarea = 		$_REQUEST["uStackArea"];  
	
	if(!($conn=ora_logon("cfdgis@XE","cfdgis"))) 
	{ 
		echo "Error: Cannot connect to database\n"; 
		exit; 
	} 


	
	/*	拼装SQL语句			*/
	$sql = "update SO_INOUT_STACK_ITME set STOW_NAME='" . $stackarea ."' where id=" .  $stackid;
	
	$cursor=ora_open($conn);
	echo $sql;
	ora_parse($cursor,$sql,0); 
	ora_exec($cursor);
 
	// 释放PHP的数据库连接，即此处清空后Oracle OCI8驱动客户端会重用连接
   ora_logoff($conn); 
   
?>