<? 

function printoraerr($in_cur) 
{ 
// 检查Oracle是否出错 
// 如果存在错误则显示 
// 当指针被激活时每次请求Oracle后调用该函数 
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
			print_r($cursor);	//调试用途
		$circleoid = ora_getcolumn ($cursor, 0);
		$circlecx = ora_getcolumn ($cursor, 1);
		$circlecy = ora_getcolumn ($cursor, 2); 
		$circlexml = "<circle id='". $circleoid ."' cx='". $circlecx ."' cy='" . $circlecy ."' r='10' fill='#FFFFFF' stroke='#000000' />";
		//拼装全部circle的SVG XML定义
		$svgxml = $svgxml . $circlexml;
	} 


        $circleD = "<circle id='". $circleoid ."' cx='". $circlecx ."' cy='" . $circlecy ."' r='10' fill='#FFFFFF' stroke='#000000' />";
        echo $circleD;

	ora_close($cursor); 
	return; 
} 

// 主程序 
if(!($conn=ora_logon("sde@lhgis","sde"))) 
{ 
	echo "Error: Cannot connect to database\n"; 
	exit; 
} 
$oid =$_REQUEST["oid"];
$sql = "SELECT objectid,x,y from sde.car where objectid='" . $oid . "'";	//有查询条件
echo $oid;
exequery($sql,$conn); 
ora_logoff($conn); 
?> 
