<?php
if ( stristr($_SERVER["HTTP_ACCEPT"],"application/xhtml+xml") ) 
{ 
	header("Content-type: application/xhtml+xml"); 
} 
else 
{ 
	header("Content-type: text/xml"); 
} 

echo("<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n"); 

/* 	���ݿ����Ӳ���	*/
$dbms='mysql';    	//���ݿ����� Oracle ��ODI
$host='localhost';		//���ݿ�������
$dbName='gis';   	//ʹ�õ����ݿ�
$user='root';     		//���ݿ������û���
$pass='root';         	//��Ӧ������
$dsn="$dbms:host=$host;dbname=$dbName";

/*	circle ���Ա���	*/
$circleoid ="";
$circlecx = 0;
$circlecy = 0;

$circlexml = "";
$svgxml ="";


	/*	�Ӵ��������ò�ѯ����	*/
	$group =$_REQUEST["id"];
	
	/*	ƴװSQL���			*/
	$where;
	if ($group ==0)	;
	else if ($group ==1)	$where = "where id < 30";
	else if ($group ==2) $where = "where id >= 30 and id <60";
	else	
	{
	$group = 3;
	$where = "where id >=60";
	}
	
	$sql = "SELECT ID,X,Y,CAR_CODE,CAR_NAME,CAR_TYPE,CAR_OWNER from SO_CAR_CURRENT_POS ";	//�в�ѯ����
	$sql = $sql.$where;
	//$sqlall = "SELECT ID,X,Y,CAR_CODE,CAR_NAME,CAR_TYPE,CAR_OWNER from SO_CAR_CURRENT_POS ";				//�޲�ѯ����

	if ($group == 0){
		$svgxml = '<tree id="0">
<item child="1" id="1" text="Item 0-1">
<userdata name="ud_block">ud_data</userdata>
</item>

<item child="1" id="2" text="Item 0-2">
<userdata name="ud_block">ud_data</userdata>
</item>

<item child="1" id="3" text="Item 0-3">
<userdata name="ud_block">ud_data</userdata>
</item>		</tree>';
		
		echo $svgxml;

	}
	else{
		try{
			/*	��ʼ��һ��PDO���󣬾��Ǵ��������ݿ����Ӷ���	*/
			$dbh=new PDO($dsn,$user,$pass);
			//echo "���ӳɹ�<br/>";	//������;
	
			$dbh->query("SET NAMES 'utf8'");
			$dbh->query("SET CHARACTER_SET_CLIENT=utf8");
			$dbh->query("SET CHARACTER_SET_RESULTS=utf8");
			 
			foreach($dbh->query($sql) as $row)
			{
				//print_r($row);	//������;
				$circleoid 		= $row[0];
				$circlecx 		= $row[1];
				$circlecy 		= $row[2];
				$CAR_CODE 	= $row[3];
				$CAR_NAME 	= $row[4];
				$CAR_TYPE 	= $row[5];
				$CAR_OWNER 	=$row[6];
				
				
				//����circle��SVG XML����        
				$carinforxml = "<item child='0' id='".$circleoid."' text='".$CAR_CODE."'><userdata name='ud_block'>ud_data</userdata></item>";
				
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