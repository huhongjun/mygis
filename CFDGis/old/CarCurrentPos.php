<?php
/* 	���ݿ����Ӳ���	*/
$dbms='ORA';    	//���ݿ����� Oracle ��OCI
$host='127.0.0.1';		//���ݿ�������
$dbName='lhgis';   	//ʹ�õ����ݿ�
$user='sde';     		//���ݿ������û���
$pass='sde';         	//��Ӧ������
$dsn="$dbms:host=$host;dbname=$dbName";

/*	circle ���Ա���	*/
$circleoid ="";
$circlecx = 0;
$circlecy = 0;

$circlexml = "";
$svgxml ="";

//try{
	/*	��ʼ��һ��PDO���󣬾��Ǵ��������ݿ����Ӷ���	*/
	if(!($conn=ora_logon("system@hlgis","system"))) 
	{ 
		echo "Error: Cannot connect to database\n"; 
		exit; 
	} 

	/*	�Ӵ��������ò�ѯ����	*/
	$oid =$_REQUEST["oid"];
	
	/*	ƴװSQL���			*/
	//$sql = "SELECT objectid,x,y from sde.car where objectid='" . $oid . "'";	//�в�ѯ����
	$sql = "SELECT id,x,y from sde.SO_CAR_CURRENT_POS ";	//�в�ѯ����
	$cursor=ora_open($conn);
	ora_parse($cursor,$sql,0); 
	ora_exec($cursor);
//echo $sql;
	while(ora_fetch($cursor)) 
	{ 
		//	print_r($cursor);	//������;
		$circleoid = ora_getcolumn ($cursor, 0);
		$circlecx = ora_getcolumn ($cursor, 1);
		$circlecy = ora_getcolumn ($cursor, 2); 

	//	$circlexml = "<circle id='". $circleoid ."' cx='". $circlecx ."' cy='" . $circlecy ."' r='10' fill='#FFFFFF' stroke='#000000' />";
		$circlexml = $circleoid.":". $circlecx.":". $circlecy ;
		//echo 	$circlexml;
		//ƴװȫ��circle��SVG XML����
		$svgxml = $svgxml .';'. $circlexml;
	//	echo $svgxml;
	} 

	
	//�����������˵�����
	echo $svgxml;
   
	// �ͷ�PHP�����ݿ����ӣ����˴���պ�Oracle OCI8�����ͻ��˻���������
   ora_logoff($conn); 
//}catch(){
//	die("Error!: ".$e->getMessage()."<br/>");
//}


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