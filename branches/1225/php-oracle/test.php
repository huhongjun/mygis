<? 

function printoraerr($in_cur) 
{ 
// ���Oracle�Ƿ���� 
// ������ڴ�������ʾ 
// ��ָ�뱻����ʱÿ������Oracle����øú��� 
if(ora_errorcode($in_cur)) 
echo "Oracle code - ".ora_error($in_cur)."\n"; 
return; 
} 

function exequery($w_qry,$conn) 
{ 
	$cursor=ora_open($conn); 
//	printoraerr($cursor,$conn); 
	ora_parse($cursor,$w_qry,0); 
//	printoraerr($cursor,$conn); 
	ora_exec($cursor); 
//	printoraerr($cursor,$conn); 
	$numrows=0; 
	$w_numcols=ora_numcols($cursor); 


	while(ora_fetch($cursor)) 
	{ 
			print_r($cursor);	//������;
		$circleoid = ora_getcolumn ($cursor, 0);
		$circlecx = ora_getcolumn ($cursor, 1);
		$circlecy = ora_getcolumn ($cursor, 2); 
		$circlexml = "<circle id='". $circleoid ."' cx='". $circlecx ."' cy='" . $circlecy ."' r='10' fill='#FFFFFF' stroke='#000000' />";
		//ƴװȫ��circle��SVG XML����
		$svgxml = $svgxml . $circlexml;
	} 


        $circleD = "<circle id='". $circleoid ."' cx='". $circlecx ."' cy='" . $circlecy ."' r='10' fill='#FFFFFF' stroke='#000000' />";
        echo $circleD;

	ora_close($cursor); 
	return; 
} 

// ������ 
if(!($conn=ora_logon("sde@lhgis","sde"))) 
{ 
	echo "Error: Cannot connect to database\n"; 
	exit; 
} 
$oid =$_REQUEST["oid"];
$sql = "SELECT objectid,x,y from sde.car where objectid='" . $oid . "'";	//�в�ѯ����
echo $oid;
exequery($sql,$conn); 
ora_logoff($conn); 
?> 
