<?php
/* 	���ݿ����Ӳ���	*/
$dbms='ORA';    	//���ݿ����� Oracle ��OCI
$host='127.0.0.1';		//���ݿ�������
$dbName='lhgis';   	//ʹ�õ����ݿ�
$user='sde';     		//���ݿ������û���
$pass='sde';         	//��Ӧ������
$dsn="$dbms:host=$host;dbname=$dbName";

	/*	�Ӵ��������ò�ѯ����	*/
	$stackid 	=		$_REQUEST["uSTOWid"];  
	$stackarea = 		$_REQUEST["uStackArea"];  
	
	if(!($conn=ora_logon("cfdgis@XE","cfdgis"))) 
	{ 
		echo "Error: Cannot connect to database\n"; 
		exit; 
	} 


	
	/*	ƴװSQL���			*/
	$sql = "update SO_INOUT_STACK_ITME set STOW_NAME='" . $stackarea ."' where id=" .  $stackid;
	
	$cursor=ora_open($conn);
	echo $sql;
	ora_parse($cursor,$sql,0); 
	ora_exec($cursor);
 
	// �ͷ�PHP�����ݿ����ӣ����˴���պ�Oracle OCI8�����ͻ��˻���������
   ora_logoff($conn); 
   
?>