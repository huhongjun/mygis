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
	$sql = "SELECT ID,X,Y,CAR_CODE,CAR_NAME,CAR_TYPE,CAR_OWNER from sde.SO_CAR_CURRENT_POS ";	//�в�ѯ����
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
		$CAR_CODE = mb_convert_encoding(ora_getcolumn ($cursor, 3),   "UTF-8","GB2312");
		$CAR_NAME = mb_convert_encoding(ora_getcolumn ($cursor, 4),   "UTF-8","GB2312");
		$CAR_TYPE = ora_getcolumn ($cursor, 5);
		$CAR_OWNER= ora_getcolumn ($cursor, 6);

	//	$circlexml = "<circle id='". $circleoid ."' cx='". $circlecx ."' cy='" . $circlecy ."' r='10' fill='#FFFFFF' stroke='#000000' />";
	//	$circlexml = "<circle id='".$circleoid."' cx='". $circlecx."' cy='" . $circlecy ."' r='10'  fill='#FFFFFF' stroke='#000000' onclick='carinfor(evt)'/>";
        $circlexml = "<use id='".$circleoid."' x='". $circlecx."' y='" . $circlecy ."' CAR_CODE='".$CAR_CODE."' CAR_NAME='".$CAR_NAME."' xlink:href='#ballGroup' stroke='red' fill='#ffff00' onclick='carinfor(evt)' onmouseout='nomralColor(evt)' onmousemove='highColor(evt)' transform='rotate(30 x,y) scale(0.01)'/>";
//	<use x="100" y="100" xlink:href="#ballGroup" stroke="lawngreen" fill="red" transform="rotate(0,0,0)">
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