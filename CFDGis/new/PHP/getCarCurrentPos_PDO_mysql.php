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
	//�в�ѯ����
	$sql = "SELECT oid,cx,cy from gis where oid='" . $oid . "'";	
	//�޲�ѯ����
	$sqlall = "SELECT id,x,y from SO_CAR_CURRENT_POS";				

	$dbh->query("SET NAMES 'utf8'");
	$dbh->query("SET CHARACTER_SET_CLIENT=utf8");
	$dbh->query("SET CHARACTER_SET_RESULTS=utf8");
	 
	foreach($dbh->query($sqlall) as $row)
	{
		//print_r($row);	//������;
		$circleoid 		= $row[0];
		$circlecx 		= $row[1];
		$circlecy 		= $row[2];		
		
		//����circle��SVG XML����        
		$circlexml = $circleoid.":". $circlecx.":". $circlecy ;


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