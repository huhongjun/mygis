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
	//$sql = "SELECT objectid,x,y from sde.car where objectid='" . $oid . "'";	//�в�ѯ����
	$sql = "SELECT ID,c.x,c.y, CAR_CODE,CAR_NAME,b.TYPE_name,CAR_OWNER from  so_car_info a ,so_car_type b, so_car_current_pos c where a.car_type_id = b.type_id and c.car_id = a.id ";	//�в�ѯ����

	$dbh->query("SET NAMES 'utf8'");
	$dbh->query("SET CHARACTER_SET_CLIENT=utf8");
	$dbh->query("SET CHARACTER_SET_RESULTS=utf8");
//echo $sql;
	foreach($dbh->query($sql) as $row)
	{
		//print_r($row);	//������;
		$circleoid 		= $row[0];
		$circlecx 		= $row[1];
		$circlecy 		= $row[2];		
		$CAR_CODE = $row[3];
		$CAR_NAME = $row[4];
		$CAR_TYPE = $row[5];
		$CAR_OWNER= $row[6];
		
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