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
	if(!($conn=ora_logon("cfdgis@XE","cfdgis"))) 
	{ 
		echo "Error: Cannot connect to database\n"; 
		exit; 
	} 

	/*	�Ӵ��������ò�ѯ����	*/
	$oid =$_REQUEST["oid"];
	
	/*	ƴװSQL���			*/
	//$sql = "SELECT objectid,x,y from sde.car where objectid='" . $oid . "'";	//�в�ѯ����
	$sql = "SELECT ID,c.x,c.y, CAR_CODE,CAR_NAME,b.TYPE_name,CAR_OWNER from  so_car_info a ,so_car_type b, so_car_current_pos c where a.car_type_id = b.type_id and c.car_id = a.id ";	//�в�ѯ����
	$cursor=ora_open($conn);
	ora_parse($cursor,$sql,0); 
	ora_exec($cursor);

	while(ora_fetch($cursor)) 
	{ 
		//	print_r($cursor);	//������;
		$circleoid = ora_getcolumn ($cursor, 0);
		$circlecx = ora_getcolumn ($cursor, 1);
		$circlecy = ora_getcolumn ($cursor, 2);
		$CAR_CODE = mb_convert_encoding(ora_getcolumn ($cursor, 3),   "UTF-8","GB2312");
		$CAR_NAME = mb_convert_encoding(ora_getcolumn ($cursor, 4),   "UTF-8","GB2312");
		$CAR_TYPE = mb_convert_encoding(ora_getcolumn ($cursor, 5),   "UTF-8","GB2312");
		$CAR_OWNER= ora_getcolumn ($cursor, 6);

        $circlexml = "<use id='".$circleoid."' x='". $circlecx."' y='" . $circlecy ."' CAR_CODE='".$CAR_CODE."' CAR_NAME='".$CAR_NAME."' CAR_TYPE='".$CAR_TYPE."' xlink:href='#ballGroup' stroke='red' fill='#ffff00' onclick='carinfor(evt)' onmouseout='nomralColor(evt)' onmousemove='highColor(evt)' transform='rotate(0 x,y) scale(0.01)'/>";
        if ($circleoid == 999 )
        {
        $circlexml = "<use id='".$circleoid."' x='". $circlecx."' y='" . $circlecy ."' CAR_CODE='".$CAR_CODE."' CAR_NAME='".$CAR_NAME."' CAR_TYPE='".$CAR_TYPE."' xlink:href='#ballGroupJiaoChe' transform='rotate(0 x,y) scale(0.01)'/>";
        }
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