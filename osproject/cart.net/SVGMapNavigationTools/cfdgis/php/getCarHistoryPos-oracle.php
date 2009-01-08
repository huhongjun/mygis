<?php

require_once("inc/Configuration.inc.php");
require_once("Car.php");

if(!($conn=ora_logon("cfdgis@XE", "cfdgis"))) 
{ 
	echo "Error: Cannot connect to database\n"; 
	exit; 
} 

$car_id = $_REQUEST["car_id"]; // ��ȡ����ĳ�����ID
$from_time = $_REQUEST["from_time"];    // ��ȡ����Ŀ�ʼʱ��
$to_time = $_REQUEST["to_time"]; // ��ȡ�������ֹʱ��
$total_seconds = $_REQUEST["total_seconds"]; // ������ʾ����ʱ��

// �ȵõ���¼��
$sql = "SELECT count(*) vcount from SO_CAR_HISTORY_POS where car_id = ".$car_id." and cartime >= to_date('".$from_time."', 'yyyy-mm-dd hh24-mi-ss') and cartime <= to_date('".$to_time."', 'yyyy-mm-dd hh24-mi-ss') order by cartime";	//�в�ѯ����
$cursor = ora_open($conn);
ora_parse($cursor, $sql, 0);
ora_exec($cursor);
$rec_count;
while(ora_fetch($cursor)){
	$rec_count= ora_getcolumn($cursor, 0);
}

// ��ʼ��ѯ
$sql = "SELECT x, y, to_char(cartime,'yyyy-mm-dd hh24:mi:ss') cartime from SO_CAR_HISTORY_POS where car_id = ".$car_id." and cartime >= to_date('".$from_time."', 'yyyy-mm-dd hh24-mi-ss') and cartime <= to_date('".$to_time."', 'yyyy-mm-dd hh24-mi-ss') order by cartime";	//�в�ѯ����

$cursor = ora_open($conn);

ora_parse($cursor, $sql, 0);
ora_exec($cursor);

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
while(ora_fetch($cursor))
{
	//$car_id = ora_getcolumn($cursor, 0);
	//$car_code = mb_convert_encoding(ora_getcolumn($cursor, 1), "UTF-8", "GB2312");
	//$car_name = mb_convert_encoding(ora_getcolumn($cursor, 2), "UTF-8", "GB2312");;
	
	$index = $index + 1;
	$mod_index = $index % $seg_count;
	
	
	
	if($mod_index == 1) 
	{
		$one_time_str = ora_getcolumn($cursor, 2);
		if($index == 1)	$time_str = $one_time_str;
		else $time_str = $time_str."/".$one_time_str;
	}


	$pos_x = ora_getcolumn($cursor, 0);
	$pos_y = ora_getcolumn($cursor, 1);

	$one_car_pos = $pos_x.":".$pos_y;
	$car_hist_pos = $car_hist_pos.";".$one_car_pos;
}

$hist_pos_info = $time_str."&".$car_hist_pos;

echo $hist_pos_info;

ora_logoff($conn);



?>