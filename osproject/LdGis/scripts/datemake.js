//�Զ�������ȣ����ڣ���������У��   �
//������� :    function makeYear(txtName)
//�������� ��    function makeDate(txtName)
//��ʼ���ںͽ������ڱȽ�  ��  function Compare(kssj,jssj)
//ֻ������ :    function CheckNumber(txtName,txtLab)
//У��Ƿ��ַ��� function checkInviableChar(txtName,txtLab)
//У��email��ʽ�� CheckEmail(txtName,txtLab)
//У��ǿ�  ��    function CheckNull(txtName,txtLab)
//У��double�����ݣ� CheckDouble(txtName,txtLab)
//У�鳤�ȣ�CheckLength(txtName,txtLab,maxLen)


function stop()
{
      if(event.keyCode==37)
          event.returnValue=false
}

//�õ�ϵͳʱ��
function getSysTime(){
    var onedate = new Date();
    var fmtdate;
    var theyear = onedate.getYear();
    var themonth = onedate.getMonth()+1;
    var thedate = onedate.getDate();
    fmtdate = theyear+"-"+themonth+"-"+thedate;
   
    return fmtdate;
}

//�������
function makeYear(txtName)
{
        var frmStr,str;
        frmStr=document.forms[0];
        str=new String(frmStr.elements[txtName].value);
        frmStr.elements[txtName].value=makeYear2(str);

}

function makeYear2(sour)
{      
if(event.keyCode != 8) event.returnValue=false;
	var frmStr,str,l,C,V,nextyear;
	   str=new String(sour);
	   C=String.fromCharCode(event.keyCode);
	   if(C!="-"&&(C<"0"||C>"9")) return str=""; //���������벻�����ֻ�-��ʱ���������
	   l=str.length;
	   if(l==0)
	    {  
		   if(C=="1")
			   str="19";
		   else if(C=="2")
			   str="20";
		   else;
		}
	  else if(l==1)
	{if(C!="-")
	       str=str+C;
	}
	else if(l==2 )
       {
           if( C != "-") str =str+C;
       }
	 else if(l==3)
         {
           if( C != "-") 
			  {
			   nextyear=str+C;     
			   nextyear=nextyear-0;     //���ַ�������תΪ���ֱ���
			   nextyear++;    
			   nextyear = nextyear + "";            //������תΪ�ַ���
			   str =str + C + "-"+ nextyear;  
              }
		 }
	 else if(l==4)
	    { if(C!="-")
	      str=str+"-"+C;
	      else
		  str=str+"-";
		}
	 else if(l==5)
	    { if(C=="1")
			   str=str+"19";
		   else if(C=="2")
			   str=str+"20";
		   else;
        }
	 else if(l==6)
	     {
		 if(C!="-")
			 str=str+C;
		 }
	 else if(l==7)
	   {if(C!="-")
         str=str+C;
	   }
	 else if(l==8)
		   {if(C!="-")
		 str=str+C;
		   }
	  else;
		return str;     
}
  
//��������
function makeDate(formName,txtName)
{
        var frmStr,str;
        frmStr=document.getElementById(formName);
        str=new String(frmStr.elements[txtName].value);
        frmStr.elements[txtName].value=makeDate2(str);

}
function makeDate2(sour)
 {


  if(event.keyCode != 8) event.returnValue=false;����������


        var frmStr,str,l,C,Cl;


        str=new String(sour);


        C=String.fromCharCode(event.keyCode);   



        if(C != "-" && (C < "0" || C > "9" )) return str="";    //������벻����Ч�ַ����Ϊ�ա�

        l=str.length;����������//�����ַ�������

     if(l==0)                //��û�������ַ�ʱ
     {
       if(C=="1")
         str="19";
       else if(C=="2")
         str="20";
       else
         ;
     }
     else if(l<=2 )           //�������ַ���С��2ʱ
     {
       if( C != "-") str =str+C;
     }
     else if(l==3)             //���Ѿ�����3���ַ�ʱ
     {
       if( C != "-") str =str + C + "-";
     }
     else if(l==4)             //���Ѿ�����4���ַ�ʱ
     {
       str = str + "-";
     }
     else if( l == 5)           //���Ѿ�����5���ַ�ʱ
     { if(C == "0"|| C == "1")
	     str=str + C;
      
       else if( C == "-");
       else
          str = str +"0"+ C + "-";
     }
     else if(l==6)               //���Ѿ�����6���ַ�ʱ
     {
       Cl=str.charAt(5);
 
       if( Cl=="1")
            {
             if(C >= "0" && C <= "2" )
              str = str + C + "-";
             else if( C == "-")
              str = str.substring(0,5)+"01" + "-";
        
             else if(C=="3")
                str=str.substring(0,5)+"01"+"-"+"3";
			 else;
			}
    	else if(Cl=="0") {if(C!="0"&&C!="-") str=str + C;	}��    		  
	    else;		
     }
    else if(l==7)                //���Ѿ�����7���ַ�ʱ
     {
       
       if( C>"0"&&C<"4")
           str = str  + "-" + C;
       else 
       {
           str = str + "-" ;
       }
     }
     else if(l==8)               //���Ѿ�����8���ַ�ʱ
	 { 
		 if(C!="-")
		 str=str + C;
		 else;
	 }
	 else if(l==9)                 //���Ѿ�����9���ַ�ʱ
	 {   
		 Cl=str.charAt(8);
		 if(Cl=="0"||Cl=="1"||Cl=="2")
		    {if(C!="-")
			 str=str+C;
		    }
		 else if(C=="0"||C=="1") str=str+C;
		 else str=str.substring(0,8)+"0"+Cl; 
	 }
	
	 else;
	      return str;
}	
    
//����Ƿ�������
//txtName��������name,txtLab �������ı�ǩ
//recreated by TNT 2006-07-22
function CheckDate(txtName,txtLab)
{
	var txtObj,frmTemp,temp,s;
        StringTrim(txtName);
	frmTemp=document.forms[0];
	txtObj=frmTemp.elements[txtName];
	if(txtObj == null)
		return true;
	temp=new String(txtObj.value);
	//ȡ���ǿ�У��
	if(temp=="")
	{
		return true;
	}
	//��������ʽ�������� �����£�С�µ���֤
	var dateString =  /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/ ;
	if(dateString.test(temp))
	{
		return true;
	}
	else
	{
		alert("����" + txtLab +"��������ȷ������!")
		frmTemp.elements[txtName].focus();
		return false;
	}
//	var txtLab=frmTemp.elements
/*	s=new String("");
        if( temp.length == 8 ){
            var num = Number(temp);
            if( num.toString() != "NaN" ){
                temp = temp.substring(0,4)+"-"+temp.substring(4,6)+"-"+temp.substring(6,8);
                frmTemp.elements[txtName].value = temp;
            }
        }
	for(var i=0;i<=temp.length-1;i++)
	{
		if(temp.charAt(i)=="-" || temp.charAt(i)=="/")
			s=s+"/";
		else
		{
			if(isNaN(Number(temp.charAt(i))))
			{
				alert("��" + txtLab +"����������ڸ�ʽ����");
				return false;
			}
			else
				s=s+temp.charAt(i);
		}
		
	}  
      /* ȡ���ǿյ���֤
        if(s==""){
          alert("������" + txtLab +"��");
          frmTemp.elements[txtName].focus();
          return false;
        }
        */
      //�����벻Ϊ��ʱ
  /*    if(s!="")
      {
        if( !isValidDate(s) ){
            alert("��" + txtLab +"�������������Ч��");
            frmTemp.elements[txtName].focus();
            return false;
        }
        d=new Date(s);

        if(d.toString()=="NaN")
        {
          alert("��" + txtLab +"����������ڸ�ʽ����")
           frmTemp.elements[txtName].focus();
		return false;
        }
      }
        return true
        */

}

//�ȽϿ�ʼ�ͽ�������
function Compare(kssj,jssj){
	
	var temp1,temp2,frmTemp,a,b,c, ksObj, jsObj;
    frmTemp=document.forms[0];
	ksObj = frmTemp.elements[kssj];
	jsObj = frmTemp.elements[jssj];
	if ((ksObj == null)||(jsObj == null))
		return true;

	//�����ʼʱ���ںͽ���ʱ����һ���ǿյ������Ƚ�
	if (!(frmTemp.elements[kssj].value && frmTemp.elements[jssj].value))
	{
		return true;
	}
	temp1=new String(frmTemp.elements[kssj].value);
	temp2=new String(frmTemp.elements[jssj].value);
	a=temp1.substring(0,4);
	b=temp1.substring(5,7);
	c=temp1.substring(8,temp1.length);
	temp1=a+b+c;
    a=temp2.substring(0,4);
	b=temp2.substring(5,7);
	c=temp2.substring(8,temp2.length);
	temp2=a+b+c;
	temp1=temp1-0;
	temp2=temp2-0;
	if(temp1>temp2)
		{
		alert("<��ʼʱ��>��������<����ʱ��>");
	    frmTemp.elements[kssj].focus();
		return false;
		}
    else
		return true;
}

function Compare2(kssj,jssj,str1,str2){
	
	var temp1,temp2,frmTemp,a,b,c, ksObj, jsObj;
        frmTemp=document.forms[0];
	ksObj = frmTemp.elements[kssj];
	jsObj = frmTemp.elements[jssj];
	if ((ksObj == null)||(jsObj == null))
		return true;

	//�����ʼʱ���ںͽ���ʱ����һ���ǿյ������Ƚ�
	if (!(frmTemp.elements[kssj].value && frmTemp.elements[jssj].value))
	{
		return true;
	}
	temp1=new String(frmTemp.elements[kssj].value);
	temp2=new String(frmTemp.elements[jssj].value);
	a=temp1.substring(0,4);
	b=temp1.substring(5,7);
	c=temp1.substring(8,temp1.length);
	temp1=a+b+c;
    a=temp2.substring(0,4);
	b=temp2.substring(5,7);
	c=temp2.substring(8,temp2.length);
	temp2=a+b+c;
	temp1=temp1-0;
	temp2=temp2-0;
	if(temp1>temp2)
		{
		alert(str1+"��������"+str2);
	    frmTemp.elements[kssj].focus();
		return false;
		}
    else
		return true;
}

//����Ƿ�������
//txtName��������name,txtLab �������ı�ǩ
function CheckNumber(txtName,txtLab)
{	
	 var txtObj,temp,frmTemp;
   // alert("aa");
    frmTemp=document.forms[0];
	txtObj=frmTemp.elements[txtName];
	if(txtObj == null)
		return true;
    temp=new String(txtObj.value);

    for(var i=0;i<temp.length;i++){
        var s = temp.charAt(i);
        if( s != '0' && s != '1' && s != '2'&& s!='3' && s!='4' &&s != '5'&&s != '6'&&s != '7'&&s != '8'&&s != '9')
		{
			alert("����"+txtLab+"�����������ַ���");
            frmTemp.elements[txtName].focus();
            return false;
       
        }
    }
       return true;      
}


//������¼��ķǷ��ַ�
function checkInviableChar(txtName,txtLab){
    var txtObj,temp,frmTemp;
   // alert("aa");
    frmTemp=document.forms[0];
	txtObj=frmTemp.elements[txtName];
	if(txtObj == null)
		return true;
    temp=new String(txtObj.value);
   // alert(temp);
    for(var i=0;i<temp.length;i++){
        var s = temp.charAt(i);
        if( s == '+' || s == '��' || s == '\''|| s=='#' || s=='=' ||s == '='||s == '&'||s == '"' ){
            alert(txtLab+"�а����Ƿ��ַ�"+s+"!");
            frmTemp.elements[txtName].focus();
            return false;
        }
    }
    return true;
}


//ȥ���༭������ҿո�
function StringTrim(txtName){

	var txtObj,frmTemp,temp,sa,sb,bflag;

	frmTemp=document.forms[0];
	txtObj=frmTemp.elements[txtName];
	if(txtObj == null)
		return true;
	temp=new String(txtObj.value);
	sa=new String("");
	sb=new String("");

	bflag = false;
	for(var i=0;i<=temp.length-1;i++)
	{
	  if(!bflag){
	    if(temp.charAt(i)==" "){
	    	continue;
	    }else{
	        sa += temp.charAt(i);
	        bflag = true;
	    }
	  }else{
	      sa += temp.charAt(i);
	  }
	}
	bflag = false;
	for(var i=sa.length-1;i>=0;i--)
	{
	  if(!bflag){
	    if(sa.charAt(i)==" "){
	    	continue;
	    }else{
	        sb = sa.charAt(i) + sb;
	        bflag = true;
	    }
	  }else{
	      sb = sa.charAt(i) + sb;
	  }
	}
	frmTemp.elements[txtName].value = sb;
}

//����Ƿ�EMAIL��ַ
//���email added by TNT
function CheckEmail(txtName,txtLab)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;
    //ȡ���ǿ�У��
	if(temp=="")
	{
		return true;
	}

	//var dateString =  /^([A-Za-z0-9])(\w)+@(\w)+(\.)(com|com\.cn|com\.tw|net|cn|tw|net\.cn|net\.tw|org|biz|info|gov|gov\.cn|edu|edu\.cn|edu\.tw)/;
	var dateString = /^([A-Za-z0-9])+@([_a-z0-9]+\.)+[a-z0-9]{2,9}$/;

	if( dateString.test( temp.toLowerCase() ) )
	{
		return true;
	}
	else
	{
		alert("����" + txtLab +"��������ȷ��e-Mail��ַ!")
		frmTemp.elements[txtName].focus();
		return false;
	}
}
//���绰���� added by TNT
function CheckPhone(txtName,txtLab)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;
    //ȡ���ǿ�У��
	if(temp=="")
	{
		return true;
	}
	var dateString =  /^([0-9\+\-\(\)])+([0-9\)])+$/;
	if(dateString.test(temp))
	{
		return true;
	}
	else
	{
		alert("����" + txtLab +"��������ȷ�ĵ绰����!")
		frmTemp.elements[txtName].focus();
		return false;
	}
}
//Ч���Ƿ�ΪС��1��С���������ۿ۵�Ч��
function CheckZk(txtName,txtLab)
{
	var txtObj,temp,frmTemp;
    frmTemp=document.forms[0];
	txtObj=frmTemp.elements[txtName];
	if(txtObj == null)
		return true;
    temp=new String(txtObj.value);
    if(temp == "")
		return true;
    var dateString = /^(0|0\.)\d{0,2}$/;
    if(dateString.test(temp)||parseFloat(temp)==1.00)
	{
		return true;
	}
	else
	{
		alert("����" + txtLab +"��������ȷ���ۿ���!")
		frmTemp.elements[txtName].focus();
		return false;
	}
    
}
//У���Ƿ���double�͵�С�������ڡ���
function CheckDouble(txtName,txtLab)
{	
	 var txtObj,temp,frmTemp;
   // alert("aa");
    frmTemp=document.forms[0];
	txtObj=frmTemp.elements[txtName];
	if(txtObj == null)
		return true;
    temp=new String(txtObj.value);

    for(var i=0;i<temp.length;i++){
        var s = temp.charAt(i);
        if(i==0){
        if( s != '0' && s != '1' && s != '2'&& s!='3' && s!='4' &&s != '5'&&s != '6'&&s != '7'&&s != '8'&&s != '9')
        {
        alert("����"+txtLab+"������������С����");
        frmTemp.elements[txtName].focus();
        return false;
        }
        }
        else if(i==temp.length-1){        
        if( s != '0' && s != '1' && s != '2'&& s!='3' && s!='4' &&s != '5'&&s != '6'&&s != '7'&&s != '8'&&s != '9')
		{
			alert("����"+txtLab+"������������С����");
            frmTemp.elements[txtName].focus();
            return false;
        }
        }
        else 
        {
         if( s != '0' && s != '1' && s != '2'&& s!='3' && s!='4' &&s != '5'&&s != '6'&&s != '7'&&s != '8'&&s != '9'&&s!='.')
		 {
			alert("����"+txtLab+"������������С����");
            frmTemp.elements[txtName].focus();
            return false;
         }
        }
    }
       return true;      
}


//����Ƿ�Ϊ��
function CheckNull(txtName,txtLab)
{
	var frmTemp,temp;
	 StringTrim(txtName);
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;

	if(temp=="")
	{
		alert( txtLab + "����Ϊ�գ�");
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}

//������� ����langx
//������ڵ���ȷ��
//@param s ���ڸ�ʽ ��2003/01/01
function isValidDate(s) {

    var year = "-1";
    var day = "-1";
    var month = "-1";

    try{
        var j = s.indexOf("/");
        var mtemp = s.substring(j+1);
        year = s.substring(0,j);
        j = mtemp.indexOf("/");
        month = mtemp.substring(0,j);
        day = mtemp.substring(j+1);
        //var day = mtemp.substring(0,j);
    }catch( e ){
        return false;
    }
    if( month.length>2 || year.length>4 || day.length>2 ){
        return false;
    }
    month = Number(month);
    year = Number(year);
    day = Number(day);
    //alert(year+","+month+","+day);
    if( year.toString()=="NaN" ||
        month.toString()=="NaN" ||
        day.toString()=="NaN" ){
        return false;
    }
    if( year > 9999 || year < 1000  ){
        return false;
    }
    if (month < 1 || month > 12) {
        return false;
    }
    if (day < 1 || day > 31) {
        return false;
    }
    if ((month == 4 || month == 6 || month == 9 || month == 11) &&
        (day == 31)) {
        return false;
    }
    if (month == 2) {
        var leap = (year % 4 == 0 &&
                   (year % 100 != 0 || year % 400 == 0));
        if (day>29 || (day == 29 && !leap)) {
            return false;
        }
    }
    return true;
}


//����Ƿ������ڻ�Ϊ�� zwb 2004.2.17
//�������frmName����������ڵ�Form,txtName��������name,txtLab �������ı�ǩ
function CheckDateorNull(frmName,txtName,txtLab)
{
        var frmTemp,temp,s;

        frmTemp=document.forms[frmName];
        temp=new String(frmTemp.elements[txtName].value);
        s=new String("");
        if( temp.length == 8 ){
            var num = Number(temp);
            if( num.toString() != "NaN" ){
                temp = temp.substring(0,4)+"-"+temp.substring(4,6)+"-"+temp.substring(6,8);
                frmTemp.elements[txtName].value = temp;
            }
        }

        for(var i=0;i<=temp.length-1;i++)
        {
                if(temp.charAt(i)=="-" || temp.charAt(i)=="/")
                        s=s+"/";
                else
                {
                        if(isNaN(Number(temp.charAt(i))))
                        {
                                alert("��" + txtLab +"����������ڸ�ʽ����");
                                return false;
                        }
                        else
                                s=s+temp.charAt(i);
                }
        }
        if(s==""){
          return true;
        }
        if( !isValidDate(s) ){
            alert("��" + txtLab +"�������������Ч��");
            frmTemp.elements[txtName].focus();
            return false;
        }
        d=new Date(s);

        if(d.toString()=="NaN")
        {
          alert("��" + txtLab +"����������ڸ�ʽ����")
           frmTemp.elements[txtName].focus();
		return false;
        }
        return true
}



//�Ӹ���·����ȡ���ļ���,�Զ����븽�����ƿ���
//path·���ַ���,�������ƵĿ���� langx 20040521
function getNameFromPath( path , obj ){
    var pos = path.indexOf('\\');
    if( pos != -1 ){
         getNameFromPath( path.substring(pos+1),obj );
    }else{
        obj.value=path;
    }
}
// added by TNT 2006-07-21
//����Ƿ��зǷ��ַ�
function isInValidDataCheck(dataStringToCheck)
{
	var dateString =  /^(?:[\u4e00-\u9fa5]*\w*\s*)+$/;
	if(!dateString.test(dataStringToCheck))
	{
		return true;
	}
	else
	{
		return false;
	}
}

//��������Ŀ����볤��
//txtName��������name,txtLab �������ı�ǩ
//maxLen����󳤶�
function CheckLength(txtName,txtLab,maxLen)
{
	var txtObj,temp,lCount=0;
        StringTrim(txtName);
        
	frmTemp=document.forms[0];
	
	txtObj=frmTemp.elements[txtName];
	if(txtObj == null)
		return true;
	
	temp=new String(txtObj.value);
	for(var i =0;i<temp.length;i++)
	{
		if(temp.charCodeAt(i)>255)
			lCount +=2;
		else
			lCount +=1;
	}

	if(lCount>maxLen)
	{
		alert(txtLab +"��������ɾ��!");
		frmTemp.elements[txtName].focus();
		return false;
	}
//	if(isInValidDateCheck(temp))
//	{
//		alert(txtLab +"���зǷ��ַ�!");
//		frmTemp.elements[txtName].focus();
//		return false;
//	}
	return true;
}

//��������ַ��Ƿ��зǷ��ַ�
//added by TNT 2006-07-22
function CheckInvalidData(txtName,txtLab)
{
	var txtObj,temp,lCount=0;
        StringTrim(txtName);
        
	frmTemp=document.forms[0];
	
	txtObj=frmTemp.elements[txtName];
	if(txtObj == null)
		return true;
	
	temp=new String(txtObj.value);
	if(isInValidDataCheck(temp))
	{
		alert(txtLab +"���зǷ��ַ�!");
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}

//��������Ŀ����볤��
//�������frmName����������ڵ�Form,txtName��������name,txtLab �������ı�ǩ
//mimLen����Ҫ�������С���ȣ�maxLen����󳤶�
function CheckXQLength(txtName,txtLab,minLen,maxLen)
{
	var temp,lCount=0;
        StringTrim(txtName);
        if( !checkInviableChar(frmName,txtName,txtLab) ){
            return false;
        }
	frmTemp=document.forms[0];
	temp=new String(frmTemp.elements[txtName].value);
	for(var i =0;i<temp.length;i++)
	{
		if(temp.charCodeAt(i)>255)
			lCount +=2;
		else
			lCount +=1;
	}
	if(minLen>0 && lCount==0)
	{
		alert("������"+txtLab + "!");
		//frmTemp.elements[txtName].focus();
		return false;
	}
	if(lCount<minLen)
	{
		alert(txtLab +"������Ҫ����"+minLen+"���ַ�!");
		//frmTemp.elements[txtName].focus();
		return false;
	}
	if(lCount>maxLen)
	{
		alert(txtLab +"��������ɾ��!");
		//frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}




function isEmptyOrEmail(txtName,txtLab)
{
        var frmTemp,temp;
        frmTemp=document.forms[0];
        temp=frmTemp.elements[txtName].value;

        if (isEmpty(temp)) return true;
        return CheckEmail(txtName,txtLab);
}


//���绰����
function CheckPhoneNum(txtName,txtLab)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;

	if(temp=="")
	{
		alert("����" + txtLab +"����������!")
		frmTemp.elements[txtName].focus();
		return false;
	}

	var re = /[^1234567890()-\+]/i;
	if(!temp.search(re))
	{
		alert("����" + txtLab +"��������ȷ�ĺ���!")
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}




//�����ֵ�����뷶Χ
//�������frmName����������ڵ�Form,txtName��������name,txtLab �������ı�ǩ
//mimLen����Ҫ�������Сֵ��maxLen�����ֵ
function CheckValue(txtName,txtLab,minValue,maxValue)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;
	if (temp=="")
	{
		alert("����" + txtLab +"����������!");
		frmTemp.elements[txtName].focus();
		return false;
	}
	temp=Number(temp);;
	if(isNaN(temp))
	{
		alert("����" + txtLab +"����������!");
		frmTemp.elements[txtName].focus();
		return false;
	}
	else
	{
		if(temp>=minValue && temp<=maxValue)
			return true;
		else
		{
			alert("����" + txtLab +"��������ȷֵ������"+minValue+" �� "+maxValue+" ֮��!");
			frmTemp.elements[txtName].focus();
			return false;
		}
	}
}

//�����ֵ�����뷶Χ
//obj���������,txtLab �������ı�ǩ
//mimLen����Ҫ�������С���ȣ�maxLen����󳤶�
function CheckValue(obj,txtLab,minValue,maxValue)
{
	var temp;
	temp=obj.value;
	if (temp=="")
	{
		alert("����" + txtLab +"����������!");
		obj.focus();
		return false;
	}
	temp=Number(temp);
	if(isNaN(temp))
	{
		alert("����" + txtLab +"����������!");
		obj.focus();
		return false;
	}
	else
	{
		if(temp>=minValue && temp<=maxValue)
			return true;
		else
		{
			alert("����" + txtLab +"��������ȷֵ������"+minValue+" �� "+maxValue+" ֮��!");
			obj.focus();
			return false;
		}
	}
}
//���ѡ���ֵ
//�������frmName��ѡ������ڵ�Form,SelName��ѡ����name,SelLab ��ѡ���ı�ǩ
//intIllegue�����е���Чֵ
function CheckSelect(frmName,SelName,SelLab,intIllegue)
{
	var frmTemp,temp;
	frmTemp=document.forms[frmName];
	temp=frmTemp.elements[txtName].value;
	if (temp==intIllegue)
	{
		alert("����" + txtLab +"��ѡ��");
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}


//isEmpty     : У������Ĳ����Ƿ�ΪNULL
//isPosInteger: ����0������
//isNature    : ��Ȼ���������������
//isInteger   : ����0������
//isNumber    : ������
//isArabic    : ��������ɵ��ִ�
//isPosNumber : ��Ϊ���ĸ�����,����0

function isEmpty(inputStr) {
        if (inputStr == null || inputStr == '') return true;
        return false;
}

function isInteger(inputVal) {
	inputStr = inputVal.toString();
	if (isEmpty(inputStr)) return false;
	for (var i = 0; i < inputVal.length; i ++ ) {
		var oneChar = inputVal.charAt(i);
		if (i == 0 && (oneChar == "+" || oneChar == "-") )
			if (inputVal.length == 1 ) 	return false;
			else continue;
		if (oneChar < "0" || oneChar > "9")
			return false;
	}
	return true;
}

function isPosInteger(input) {
	inputVal = input.value;
	if (isEmpty(inputVal))
	{
		alert ("����������!");
		input.focus();
		return false;
	}
	for (var i = 0; i < inputVal.length; i ++ ) {
		var oneChar = inputVal.charAt(i);
		if (i == 0 && oneChar == "+")
			if (inputVal.length == 1 )
			{
				alert ("��������������!");
				input.focus();
				return false;
			}
			else continue;
		if (oneChar < "0" || oneChar > "9")
		{
			alert ("��������!");
			input.focus();
			return false;
		}
	}
	return true;
}

function isNature(inputVal) {
	if (isInteger(inputVal)) {
		if (parseInt(inputVal.toString()) < 1 ) return false;
	}
	else	return false;
	return true;
}

function isNumberOrNull(inputVal) {
	oneDecimal = false;
	inputStr = inputVal.toString();
	if (isEmpty(inputStr)) return true;
	for (var i = 0; i < inputVal.length; i ++ ) {
		var oneChar = inputVal.charAt(i);
		if (i == 0 && (oneChar == "+" || oneChar == "-") )
			if (inputVal.length == 1 ) 	return false;
			else continue;
		if (oneChar == "." && !oneDecimal) {
			oneDecimal = true;
			continue;
		}
		if (oneChar < "0" || oneChar > "9")
			return false;
	}
	return true;
}

function isNumberOrNull(txtName,txtLab)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;

	if (isEmpty(temp)) return true;
	return CheckNumber(txtName,txtLab);
}

function isNumber(input) {
	oneDecimal = false;
	inputVal = input.value;
	if (isEmpty(inputVal))
	{
		alert("������������!");
		input.focus();
		return false;
	}
	for (var i = 0; i < inputVal.length; i ++ ) {
		var oneChar = inputVal.charAt(i);
		if (i == 0 && (oneChar == "+" || oneChar == "-") )
			if (inputVal.length == 1 )
			{
				alert("������������!");
				input.focus();
			 	return false;
			}
			else continue;
		if (oneChar == "." && !oneDecimal) {
			oneDecimal = true;
			continue;
		}
		if (oneChar < "0" || oneChar > "9")
		{
			alert("������������!");
			input.focus();
		 	return false;
		}
	}
	return true;
}
function isInteger(frmName,txtName,txtLab)
{
	var frmTemp,temp;
	frmTemp=document.forms[frmName];
	temp=frmTemp.elements[txtName].value;
	if (temp=="")
	{
		alert("����" + txtLab +"����������!");
		frmTemp.elements[txtName].focus();
		return false;
	}
	temp= Math.abs(temp);
	if(temp.toString()=="NaN")
	{
		alert("����" + txtLab +"����������!");
		frmTemp.elements[txtName].focus();
		return false;
	}
	if(parseInt(temp)<0)
	{
		alert("��" + txtLab +"������������");
		frmTemp.elements[txtName].focus();
		return false;
	}
	var re,p;
	re = /\./i;
	temp=temp.toString();
	p=temp.search(re);
	if(p==-1)
		return true;
	else
	{
		alert("��" + txtLab +"������������");
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}
function isPosNumber(input) {
	oneDecimal = false;
	inputVal = input.value;
	if (isEmpty(inputVal))
	{
		alert("������������!");
		input.focus();
		return false;
	}
	for (var i = 0; i < inputVal.length; i ++ ) {
		var oneChar = inputVal.charAt(i);
		if (i == 0 && (oneChar == "+" || oneChar == "-") )
			if (inputVal.length == 1 )
			{
				alert("������������!");
				input.focus();
			 	return false;
			}
			else continue;
		if (oneChar == "." && !oneDecimal) {
			oneDecimal = true;
			continue;
		}
		if (oneChar < "0" || oneChar > "9")
		{
			alert("������������!");
			input.focus();
		 	return false;
		}
	}
	if (parseFloat(inputVal) < 0)
	{
		alert("����������!");
		input.focus();
	 	return false;
	}
	return true;
}

function isArabic(inputVal) {
	var checkOK = "0123456789";
	var checkStr = inputVal.toString();
	if (isEmpty(checkStr)) return false;
	for (i = 0;  i < checkStr.length;  i++){
		ch = checkStr.charAt(i);
		if (checkOK.indexOf(ch) == -1)
			return (false);
	}
	return true;
}

function isEmptyOrEmail(frmName,txtName,txtLab)
{
        var frmTemp,temp;
        frmTemp=document.forms[frmName];
        temp=frmTemp.elements[txtName].value;

        if (isEmpty(temp)) return true;
        return CheckEmail(frmName,txtName,txtLab);

}

function isEmptyOrPhoneNum(frmName,txtName,txtLab)
{
        var frmTemp,temp;
        frmTemp=document.forms[frmName];
        temp=frmTemp.elements[txtName].value;

        if (isEmpty(temp)) return true;
        return CheckPhoneNum(frmName,txtName,txtLab);

}
//���ѧ���Ƿ�Ϸ���Ҫ�ĺ���
function isInt(inputVal) {
	inputStr = inputVal.toString();
	if (isEmpty(inputStr)) return false;
	for (var i = 0; i < inputVal.length; i ++ ) {
		var oneChar = inputVal.charAt(i);
		if (i == 0 && (oneChar == "+" || oneChar == "-") )
			if (inputVal.length == 1 ) 	return false;
			else continue;
		if (oneChar < "0" || oneChar > "9")
			return false;
	}
	return true;
}

//���ѧ���Ƿ�Ϸ�  ������
function checkYear(txtName){
        var frmTemp,temp, f, l, s;
        frmTemp=document.forms[0];
        temp=frmTemp.elements[txtName].value;

        if (isEmpty(temp)) return true;
        if (temp.length != 9){
        	alert("�����ѧ�곤��Ӧ��Ϊ9λ�����飡");
        	frmTemp.elements[txtName].focus();
        	return false;

        }
        f = temp.substring(0, 4);

        if (!isInt(f)) {
        	alert("�����ѧ��ǰ4λ�������������飡");
        	frmTemp.elements[txtName].focus();
        	return false;
        }

        l = temp.substring(5, 9);

        if (!isInt(f)) {
        	alert("�����ѧ��ĺ�4λ���Ϸ������飡");
        	frmTemp.elements[txtName].focus();
        	return false;
        }

	s= temp.charAt(4);

	if (s != '-'){
		alert("�����ѧ��ķָ���Ϊ'-'���Ϸ������飡");
		frmTemp.elements[txtName].focus();
		return false;
	}

	if ((l < 1970) || (l > 2100) || (f < 1970) || (f > 2100)){
		alert("�����ѧ��ķ�Χ���Ϸ������飡");
		frmTemp.elements[txtName].focus();
		return false;

	}

	if ((l - f) != 1){
		alert("�����ѧ���ʱ����Ϊ1�꣬���飡");
		frmTemp.elements[txtName].focus();
		return false;

	}

        return true;
}

function CheckTime(txtName)
{
    var frmTemp,temp, f, l, s;
    frmTemp=document.forms[0];
    temp=frmTemp.elements[txtName].value;

    if (isEmpty(temp)) return true;
    if (temp.length != 4){
       alert("�������ȳ���Ӧ��Ϊ4λ�����飡");
       frmTemp.elements[txtName].focus();
       return false;

    }
    return true;
}

//��ʾ���ڿؼ�����
function popCalendar(frmName,txtName,host){
    if (!document.layers) {
       document.write("<a onclick=\"popUpCalendar(this, "+frmName+"."+txtName+", 'yyyy-mm-dd')\" style=\"cursor:hand\"><img src=\""+host+"/images/common/icons/calendar.gif\"  border=0></a>")
    }
}

//����Ƿ�Ϊ��ĸ������;
function isAlpha(frmName,txtName,nnn,tableName){
     var inputVal,frmTemp;
     frmTemp=document.forms[frmName];
     inputVal = new String(frmTemp.elements[txtName][nnn].value);
     for (var i = 0; i < inputVal.length; i ++ ) {
	if ( inputVal.charCodeAt(i)<48 || inputVal.charCodeAt(i)>122 || (inputVal.charCodeAt(i)<65 && inputVal.charCodeAt(i)>57) ){
        	alert("����" + tableName + "����Ӣ�Ļ������ַ�!");
                frmTemp.elements[txtName][nnn].focus();
                return false;
	}
     }
     return true;
}
function isAlpha(frmName,txtName,tableName){
     var inputVal,frmTemp;
     frmTemp=document.forms[frmName];
     inputVal = new String(frmTemp.elements[txtName].value);
     for (var i = 0; i < inputVal.length; i ++ ) {
	if ( inputVal.charCodeAt(i)<48 || inputVal.charCodeAt(i)>122 || (inputVal.charCodeAt(i)<65 && inputVal.charCodeAt(i)>57) ){
        	alert("����" + tableName + "����Ӣ�Ļ������ַ�!");
                frmTemp.elements[txtName].focus();
                return false;
	}
     }
     return true;
}
//�ж�һ�鸴ѡ���Ƿ�ѡ��,��ѡ���򷵻�true
function checkSelect(){
  for(i=0;i<document.forms[0].length;i++)
  {
   var element=document.forms[0].elements[i]
   if(element.checked==true)
	  return true;
  }
  return false;
}


//���Ƿ�sql�ַ�
function checkInviableSqlChar(frmName,txtName,txtLab){
    var temp,frmTemp;
    frmTemp=document.forms[frmName];
    temp=new String(frmTemp.elements[txtName].value);
    for(var i=0;i<temp.length;i++){
        var s = temp.charAt(i);
        if( s == '\''||s == '='||s == '&'||s == '"'  ){
            alert(txtLab+"�а����Ƿ��ַ�"+s+"!");
            frmTemp.elements[txtName].focus();
            return false;
        }
    }
    return true;
}


