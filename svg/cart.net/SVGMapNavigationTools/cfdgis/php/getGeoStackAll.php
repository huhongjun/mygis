<?php

require_once("inc/Configuration.inc.php");
require_once("Stack.php");

/*	ƴװSQL���			*/
//�в�ѯ����
//$sql = "SELECT objectid,x,y from sde.car where objectid='" . $oid . "'";
//�޲�ѯ����
	$sql = "select ID,STOW_NAME,BOAT_NAME,COUSTOMER_NAME,COUSTOMER_NAME1,GOODS_NAME from SO_INOUT_STACK_ITME ";	
	
try{
	/*	��ʼ��һ��PDO���󣬾��Ǵ��������ݿ����Ӷ���	*/
	$dbh=new PDO($_configuration['db_driver'], $_configuration['db_user']	, $_configuration['db_password']	);
	$dbh->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
	//echo "���ӳɹ�<br/>";	//������;
	
	//echo $sql;
	foreach($dbh->query($sql) as $row)
	{
		//print_r($row);	//������;
		$stack = new Stack();
		$stack->STOWid		= $row[0]; 
		$stack->STOW_NAME 		= $row[1];
		$stack->BOAT_NAME 		= $row[2];		
		$stack->COUSTOMER_NAME 	= $row[3];
		$stack->COUSTOMER_NAME1 	= $row[4];
		$stack->GOODS_NAME 	= $row[5];
		
		//ƴװȫ��circle��SVG XML����
		$svgxml = $svgxml .  $stack->tosvg() . ';' ;
	}
	
	//�����������˵�����
	$svgxml = mb_convert_encoding($svgxml, "UTF-8", "GB2312" );

	header("Content-type: text/xml");
	echo '<g id="' . $myId. '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  
	xmlns:attrib="http://www.carto.net/attrib"  attrib:timestamp="'. $timestamp.'">';
	echo $svgxml;
	echo "</g>";

	// �ͷ�PHP�����ݿ����ӣ����˴���պ�Oracle OCI8�����ͻ��˻���������
	$dbh=null;
}catch(PDOException$e){
	//��ʾ���ݿ����������Ϣ
	die("Error!: ".$e->getMessage()."<br/>");
}

?>