<?php
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

try{
	/*	��ʼ��һ��PDO���󣬾��Ǵ��������ݿ����Ӷ���	*/
	$dbh=new PDO($dsn,$user,$pass);
	//echo "���ӳɹ�<br/>";	//������;

	/*	�Ӵ��������ò�ѯ����	*/
	$oid =$_REQUEST["oid"];
	
	/*	ƴװSQL���			*/
	$sql = "SELECT oid,cx,cy from gis where oid='" . $oid . "'";	//�в�ѯ����
	$sqlall = "SELECT ID,X,Y,CAR_CODE,CAR_NAME,CAR_TYPE,CAR_OWNER from SO_CAR_CURRENT_POS ";				//�޲�ѯ����

	$dbh->query("SET NAMES 'utf8'");
	$dbh->query("SET CHARACTER_SET_CLIENT=utf8");
	$dbh->query("SET CHARACTER_SET_RESULTS=utf8");
	 
	foreach($dbh->query($sqlall) as $row)
	{
		//print_r($row);	//������;
		$circleoid 		= $row[ID];
		$circlecx 		= $row[X];
		$circlecy 		= $row[Y];
		$CAR_CODE 	= $row[CAR_CODE];
		$CAR_NAME 	= $row[CAR_NAME];
		$CAR_TYPE 	= $row[CAR_TYPE];
		$CAR_OWNER 	=$row[CAR_OWNER];
		
		
		//����circle��SVG XML����        
		$circlexml = "<use id='".$circleoid."' x='". $circlecx."' y='" . $circlecy ."' CAR_CODE='".$CAR_CODE."' CAR_NAME='".$CAR_NAME."' xlink:href='#ballGroup' stroke='red' fill='#ffff00' onclick='carinfor(evt)' onmouseout='nomralColor(evt)' onmousemove='highColor(evt)' transform='rotate(30 x,y) scale(0.01)'/>";

		//ƴװȫ��circle��SVG XML����
		$svgxml = $svgxml . ';' . $circlexml;	
	}
	
	//�����������˵�����
	echo $svgxml;

// �ͷ�PHP�����ݿ����ӣ����˴���պ�Oracle OCI8�����ͻ��˻���������
	$dbh=null;
}catch(PDOException$e){
	//��ʾ���ݿ����������Ϣ
	die("Error!: ".$e->getMessage()."<br/>");
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