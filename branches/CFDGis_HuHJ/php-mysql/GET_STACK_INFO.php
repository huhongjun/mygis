<?php
/* 	���ݿ����Ӳ���	*/
$dbms='mysql';    	//���ݿ����� Oracle ��ODI
$host='localhost';		//���ݿ�������
$dbName='gis';   	//ʹ�õ����ݿ�
$user='root';     		//���ݿ������û���
$pass='root';         	//��Ӧ������
$dsn="$dbms:host=$host;dbname=$dbName";

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
	$sql = "select ID,STOW_NAME,BOAT_NAME,COUSTOMER_NAME,COUSTOMER_NAME1,GOODS_NAME from SO_INOUT_STACK_ITME ";	//�в�ѯ����
	//�޲�ѯ����
	$sqlall = "SELECT id,x,y from SO_CAR_CURRENT_POS";				

	$dbh->query("SET NAMES 'utf8'");
	$dbh->query("SET CHARACTER_SET_CLIENT=utf8");
	$dbh->query("SET CHARACTER_SET_RESULTS=utf8");
	 
	foreach($dbh->query($sql) as $row)
	{
		//print_r($row);	//������;
		$STOWid 					= $row[0];
		$STOW_NAME				= $row[1];
		$BOAT_NAME				= $row[2];		
		$COUSTOMER_NAME		= $row[3];	
		$COUSTOMER_NAME1	= $row[4];	
		$GOODS_NAME			= $row[5];	
		
		//����circle��SVG XML����        
		$STOWxml 	= $STOWid.":".$STOW_NAME.":".$BOAT_NAME.":".$COUSTOMER_NAME.":".$COUSTOMER_NAME1.":".$GOODS_NAME;

		//ƴװȫ��circle��SVG XML����
		$svgxml = $svgxml . ';' . $STOWxml;	
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