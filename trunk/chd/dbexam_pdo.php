<?php
$dbms='mysql';    //���ݿ����� Oracle ��ODI,���ڿ�������˵��ʹ�ò�ͬ�����ݿ⣬ֻҪ����������ü�ס��ô��ĺ�����
$host='localhost';//���ݿ�������
$dbName='amfphp';   //ʹ�õ����ݿ�
$user='root';     //���ݿ������û���
$pass='root';         //��Ӧ������
$dsn="$dbms:host=$host;dbname=$dbName";
//

try{
    $dbh=new PDO($dsn,$user,$pass);//��ʼ��һ��PDO���󣬾��Ǵ��������ݿ����Ӷ���$dbh
    echo "���ӳɹ�<br/>";
    /*�㻹���Խ���һ����������*/

   foreach($dbh->query('SELECT * from gis') as $row)
   {
        print_r($row);//������� echo($GLOBAL); ��������Щֵ
    }
   
    $dbh=null;
}catch(PDOException$e){
    die("Error!: ".$e->getMessage()."<br/>");
}
//Ĭ��������ǳ����ӣ������Ҫ���ݿⳤ���ӣ���Ҫ����һ��������array(PDO::ATTR_PERSISTENT => true) ���������
//$db=new PDO($dsn,$user,$pass,array(PDO::ATTR_PERSISTENT=>true));

?>