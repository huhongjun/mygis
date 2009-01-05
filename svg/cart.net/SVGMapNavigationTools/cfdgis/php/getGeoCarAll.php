<?php

require_once("inc/Configuration.inc.php");
require_once("Car.php");

/*	ƴװSQL���			*/
//�в�ѯ����
//$sql = "SELECT objectid,x,y from sde.car where objectid='" . $oid . "'";
//�޲�ѯ����
$sql = "SELECT ID,c.x,c.y, CAR_CODE,CAR_NAME,b.TYPE_name,CAR_OWNER from  so_car_info a ,so_car_type b, so_car_current_pos c where a.car_type_id = b.type_id and c.car_id = a.id ";
	
try{
	/*	��ʼ��һ��PDO���󣬾��Ǵ��������ݿ����Ӷ���	*/
	$dbh=new PDO($_configuration['db_driver'], $_configuration['db_user']	, $_configuration['db_password']	);
	$dbh->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
	//echo "���ӳɹ�<br/>";	//������;
	
	//echo $sql;
	foreach($dbh->query($sql) as $row)
	{
		//print_r($row);	//������;
		$car = new Car();
		$car->oid 		= $row[0]; 
		$car->cx 		= $row[1];
		$car->cy 		= $row[2];		
		$car->CAR_CODE 	= $row[3];
		$car->CAR_NAME 	= $row[4];
		$car->CAR_TYPE 	= $row[5];
		$car->CAR_OWNER	= $row[6];
		
		//ƴװȫ��circle��SVG XML����
		$svgxml = $svgxml .  $car->tosvg() . ';' ;
		//	echo $svgxml;
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