<?php
/* 	���ݿ����Ӳ���	*/
$dbms='mysql';    	//���ݿ����� Oracle ��ODI
$host='localhost';		//���ݿ�������
$dbName='gis';   	//ʹ�õ����ݿ�
$user='root';     		//���ݿ������û���
$pass='root';         	//��Ӧ������
$dsn="$dbms:host=$host;dbname=$dbName";

$car_id = $_REQUEST["car_id"]; // ��ȡ����ĳ�����ID
$from_time = $_REQUEST["from_time"];    // ��ȡ����Ŀ�ʼʱ��
$to_time = $_REQUEST["to_time"]; // ��ȡ�������ֹʱ��
$total_seconds = $_REQUEST["total_seconds"]; // ������ʾ����ʱ��

try{
	/*	��ʼ��һ��PDO���󣬾��Ǵ��������ݿ����Ӷ���	*/
	$dbh=new PDO($dsn,$user,$pass);
	//echo "���ӳɹ�<br/>";	//������;

	/*	�Ӵ��������ò�ѯ����	*/
	$oid =$_REQUEST["oid"];
	
	/*	ƴװSQL���			*/
	// �ȵõ���¼��
	$sql = "SELECT count(*) vcount from SO_CAR_HISTORY_POS where car_id = ".$car_id." and cartime >= '".$from_time."' and cartime <= '".$to_time."' order by cartime";	//�в�ѯ����

	$dbh->query("SET NAMES 'utf8'");
	$dbh->query("SET CHARACTER_SET_CLIENT=utf8");
	$dbh->query("SET CHARACTER_SET_RESULTS=utf8");
	//echo $sql;
	$rec_count;
	foreach($dbh->query($sql) as $row)
	{
		//print_r($row);	//������;
		$rec_count = $row[0];
	}
	// ��ʼ��ѯ
	$sql = "SELECT x, y, cartime from SO_CAR_HISTORY_POS where car_id = ".$car_id." and cartime >= '".$from_time."' and cartime <= '".$to_time."' order by cartime";	//�в�ѯ����
	// ���ؽ����xml�ĵ�
	$car_hist_pos = "";
	$one_car_pos = "";

	// ��ʱ��ƽ�֣�ÿ��Ҫ��ʾ�������¼��
	$seg_count = 1; // ÿ��ļ�¼��
	if($rec_count > 0)
		$seg_count = ceil($rec_count / $total_seconds); // ��ȡ��������

	//if($seg_count < 1) $seg_count = 1;

	$one_time_str;
	$time_str = "";

	$mod_index = 0;

	$index = 0;
	foreach($dbh->query($sql) as $row)
	{
		//$car_id = ora_getcolumn($cursor, 0);
		//$car_code = mb_convert_encoding(ora_getcolumn($cursor, 1), "UTF-8", "GB2312");
		//$car_name = mb_convert_encoding(ora_getcolumn($cursor, 2), "UTF-8", "GB2312");;
		
		$index = $index + 1;
		$mod_index = $index % $seg_count;
		
		
		
		if($mod_index == 1) 
		{
			$one_time_str = $row[2];
			if($index == 1)	$time_str = $one_time_str;
			else $time_str = $time_str."/".$one_time_str;
		}


		$pos_x = $row[0];
		$pos_y = $row[1];

		$one_car_pos = $pos_x.":".$pos_y;
		$car_hist_pos = $car_hist_pos.";".$one_car_pos;
	}
	$hist_pos_info = $time_str."&".$car_hist_pos;

	echo $hist_pos_info;

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