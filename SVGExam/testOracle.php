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
$cursor=ora_open($conn); printoraerr($cursor,$conn); 
ora_parse($cursor,$w_qry,0); printoraerr($cursor,$conn); 
ora_exec($cursor); printoraerr($cursor,$conn); 
$numrows=0; 
$w_numcols=ora_numcols($cursor); 
// ��ʾͷ�� 
echo " \n"; 
for ($i=0;$i<$w_numcols;$i++) 
{ 
$align=(ora_columntype($cursor,$i)=="NUMBER")?"RIGHT":"LEFT"; 
echo "\t ".ora_columnname($cursor,$i)." \n"; 
} 
echo " \n"; 
while(ora_fetch($cursor)) 
{ 
echo " \n"; 
for ($i=0;$i<$w_numcols;$i++) 
{ 
$align=(ora_columntype($cursor,$i)=="NUMBER")?"RIGHT":"LEFT"; 
if(ora_columntype($cursor,$i)=="LONG") 
echo " ". 
ora_getcolumn($cursor,$i)." \n"; 
else 
echo " ".ora_getcolumn($cursor,$i)." \n"; 
printoraerr($cursor,$conn); 
} 
$numrows++; 
echo " \n"; 
} 
if ($numrows==0) 
echo " Query returned no records \n"; 
else 
{ 
echo " \n"; 
echo " Count \n"; 
echo " $numrows \n"; 
echo " \n"; 
} 
echo " \n"; 
ora_close($cursor); 
return; 
} 
// ������ 
if(!($conn=ora_logon("sde@ktjgis","sde"))) 
{ 
echo "Error: Cannot connect to database\n"; 
exit; 
} 
$qry="SELECT 
x \"Dept\" 
,y \"Emp\" 

FROM 
car"; 
exequery($qry,$conn); 
ora_logoff($conn); 
?> 
