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

/* 	���ݿ����Ӳ���	*/
$dbms='mysql';    	//���ݿ����� Oracle ��ODI
$host='localhost';		//���ݿ�������
$dbName='gis';   	//ʹ�õ����ݿ�
$user='root';     		//���ݿ������û���
$pass='root';         	//��Ӧ������
$dsn="$dbms:host=$host;dbname=$dbName";


$svgxml ="";


	/*	�Ӵ��������ò�ѯ����	*/
	$group =$_REQUEST["id"];
	
	/*	��ʼ��һ��PDO���󣬾��Ǵ��������ݿ����Ӷ���	*/
	$dbh=new PDO($dsn,$user,$pass);
	//echo "���ӳɹ�<br/>";	//������;

	$dbh->query("SET NAMES 'utf8'");
	$dbh->query("SET CHARACTER_SET_CLIENT=utf8");
	$dbh->query("SET CHARACTER_SET_RESULTS=utf8");	
	
	$sql = "SELECT ID,CAR_NAME from so_car_info where CAR_TYPE_ID="+group;	//�в�ѯ����
	//$sql = $sql.$where;
	//$sqlall = "SELECT ID,X,Y,CAR_CODE,CAR_NAME,CAR_TYPE,CAR_OWNER from SO_CAR_CURRENT_POS ";				//�޲�ѯ����
    $type1=mb_convert_encoding("����",   "UTF-8","GB2312");
    $type2=mb_convert_encoding("����",   "UTF-8","GB2312");
    $type3=mb_convert_encoding("����",   "UTF-8","GB2312");
	if ($group == 0){
			$sql = "SELECT TYPE_ID,TYPE_NAME from SO_CAR_TYPE ";	//�в�ѯ����
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
			echo $svgxml; 

	}
	else{


	    	$sql = "SELECT ID,X,Y,CAR_CODE,CAR_NAME,CAR_TYPE,CAR_OWNER from sde.SO_CAR_CURRENT_POS ";
		$sql = "SELECT ID,CAR_NAME from SO_CAR_INFO where CAR_TYPE_ID= ".$group;
		try{
			 
			foreach($dbh->query($sql) as $row)
			{
				//print_r($row);	//������;
				$circleoid 		= $row[0];
				$circlecx 		= $row[1];

						$carinforxml = "<item child='0' id='".$circleoid."' text='".$CAR_NAME."'><userdata name='ud_block'>ud_data</userdata></item>";
				
				//ƴװȫ��circle��SVG XML����
				$svgxml = $svgxml . $carinforxml;	
			}
			
				$svgxml  = "<tree id='" .$group."'>" . $svgxml . "</tree>";	
			
			//�����������˵�����
			echo $svgxml;

		// �ͷ�PHP�����ݿ����ӣ����˴���պ�Oracle OCI8�����ͻ��˻���������
			$dbh=null;
		}catch(PDOException$e){
			//��ʾ���ݿ����������Ϣ
			die("Error!: ".$e->getMessage()."<br/>");
		}
	}
/*	help
	����PHP PDO������֧�����ݿ��޹��ԣ�
	���Ӳ�ͬ���ݿ�ֻ���޸�dbms,���ܵ�ֵ��mysql/odi/mssql/postsql/odbc��
	Ĭ��������ǳ����ӣ������Ҫ���ݿⳤ���ӣ���Ҫ����һ��������array(PDO::ATTR_PERSISTENT => true) ���������
	$db=new PDO($dsn,$user,$pass,array(PDO::ATTR_PERSISTENT=>true));
	���ԣ�
		http://localhost/chd/DGGeo_PDO.php
		http://loclahost/chd/DBGeo_PDO.php?oid=1
		�������ô�����������Ӳ�����sql��䣬�������ݿ������Ϣ����
	SVG�ļ������ʹ�ã�
		SVG�л�õ��ı�����echo�����
		����·��	http://localhost/chd/DGGeo_PDO.php
		���·��	DGGeo_PDO.php(SVG�ļ�֮��ͬһ��Ŀ¼)
*/
?>