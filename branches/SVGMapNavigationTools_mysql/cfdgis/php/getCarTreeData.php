<?php

require_once("inc/Configuration.inc.php");
require_once("Car.php");

$svgxml ="";


	/*	�Ӵ��������ò�ѯ����: 0-��ʾ��ȡ����������Ϊ���Ķ����ڵ�	*/
	$group =$_REQUEST["id"];
	
try{
	/*	��ʼ��һ��PDO���󣬾��Ǵ��������ݿ����Ӷ���	*/
	$dbh=new PDO($_configuration['db_driver'], $_configuration['db_user']	, $_configuration['db_password']	);
	$dbh->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER);
	//echo "���ӳɹ�<br/>";
	
	if ($group == 0){
		$sql = "SELECT TYPE_ID,TYPE_NAME from SO_CAR_TYPE ";	

		$svgxml = '<tree id="0">';
		foreach($dbh->query($sql) as $row)
		{
			$TYPE_ID = $row[0]; 
			$TYPE_NAME = $row[1]; 
		        $typexml = '<item child="1" id="'.$TYPE_ID.'" text="'.$TYPE_NAME.'">
							<userdata name="ud_block">ud_data</userdata>
							</item>';
				$svgxml = $svgxml .$typexml;			
		}

		$svgxml = $svgxml."</tree>";	
					
		//�����������˵�����
		$svgxml = mb_convert_encoding($svgxml,   "UTF-8","GB2312");
		echo $svgxml; 
			
	}
	else{
		//$sqlall = "SELECT ID,X,Y,CAR_CODE,CAR_NAME,CAR_TYPE,CAR_OWNER from sde.SO_CAR_CURRENT_POS ";
		$sql = "SELECT ID,CAR_NAME from SO_CAR_INFO where CAR_TYPE_ID= ".$group;

		foreach($dbh->query($sql) as $row)
		{
			$car = new Car();
			$car->oid 		= $row[0]; 
			$car->cx 		= $row[1];
			$car->cy 		= $row[2];		
			$car->CAR_CODE 	= $row[3];
			$car->CAR_NAME 	= $row[4];
			$car->CAR_TYPE 	= $row[5];
			$car->CAR_OWNER	= $row[6];
					
			//ƴװĿ¼���Ӽ��ڵ�
			$svgxml = $svgxml . $car->toxmltree();	
		}

		$svgxml  = "<tree id='" .$group."'>" . $svgxml . "</tree>";	
					
		//�����������˵�����
		header("Content-type: text/xml"); 
		echo("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"); 
		echo $svgxml; 
			
	}
}catch(PDOException$e){
	//��ʾ���ݿ����������Ϣ
	die("Error!: ".$e->getMessage()."<br/>");
}