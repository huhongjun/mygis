//自动生成年度，日期，各种输入校验   侯健
//生成年度 :    function makeYear(txtName)
//生成日期 ：    function makeDate(txtName)
//开始日期和结束日期比较  ：  function Compare(kssj,jssj)
//只填数字 :    function CheckNumber(txtName,txtLab)
//校验非法字符： function checkInviableChar(txtName,txtLab)
//校验email格式： CheckEmail(txtName,txtLab)
//校验非空  ：    function CheckNull(txtName,txtLab)
//校验double型数据： CheckDouble(txtName,txtLab)
//校验长度：CheckLength(txtName,txtLab,maxLen)


function stop()
{
      if(event.keyCode==37)
          event.returnValue=false
}

//得到系统时间
function getSysTime(){
    var onedate = new Date();
    var fmtdate;
    var theyear = onedate.getYear();
    var themonth = onedate.getMonth()+1;
    var thedate = onedate.getDate();
    fmtdate = theyear+"-"+themonth+"-"+thedate;
   
    return fmtdate;
}

//生成年度
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
	   if(C!="-"&&(C<"0"||C>"9")) return str=""; //当键盘输入不是数字或“-”时，输出“”
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
			   nextyear=nextyear-0;     //将字符串变量转为数字变量
			   nextyear++;    
			   nextyear = nextyear + "";            //将数字转为字符串
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
  
//生成日期
function makeDate(formName,txtName)
{
        var frmStr,str;
        frmStr=document.getElementById(formName);
        str=new String(frmStr.elements[txtName].value);
        frmStr.elements[txtName].value=makeDate2(str);

}
function makeDate2(sour)
 {


  if(event.keyCode != 8) event.returnValue=false;　　　　　


        var frmStr,str,l,C,Cl;


        str=new String(sour);


        C=String.fromCharCode(event.keyCode);   



        if(C != "-" && (C < "0" || C > "9" )) return str="";    //如果输入不是有效字符输出为空。

        l=str.length;　　　　　//定义字符串长度

     if(l==0)                //当没有输入字符时
     {
       if(C=="1")
         str="19";
       else if(C=="2")
         str="20";
       else
         ;
     }
     else if(l<=2 )           //当输入字符数小于2时
     {
       if( C != "-") str =str+C;
     }
     else if(l==3)             //当已经输入3个字符时
     {
       if( C != "-") str =str + C + "-";
     }
     else if(l==4)             //当已经输入4个字符时
     {
       str = str + "-";
     }
     else if( l == 5)           //当已经输入5个字符时
     { if(C == "0"|| C == "1")
	     str=str + C;
      
       else if( C == "-");
       else
          str = str +"0"+ C + "-";
     }
     else if(l==6)               //当已经输入6个字符时
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
    	else if(Cl=="0") {if(C!="0"&&C!="-") str=str + C;	}　    		  
	    else;		
     }
    else if(l==7)                //当已经输入7个字符时
     {
       
       if( C>"0"&&C<"4")
           str = str  + "-" + C;
       else 
       {
           str = str + "-" ;
       }
     }
     else if(l==8)               //当已经输入8个字符时
	 { 
		 if(C!="-")
		 str=str + C;
		 else;
	 }
	 else if(l==9)                 //当已经输入9个字符时
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
    
//检查是否是日期
//txtName是输入框的name,txtLab 是输入框的标签
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
	//取消非空校验
	if(temp=="")
	{
		return true;
	}
	//该正则表达式包括闰年 ，大月，小月的验证
	var dateString =  /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29))$/ ;
	if(dateString.test(temp))
	{
		return true;
	}
	else
	{
		alert("请在" + txtLab +"中输入正确的日期!")
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
				alert("在" + txtLab +"中输入的日期格式不对");
				return false;
			}
			else
				s=s+temp.charAt(i);
		}
		
	}  
      /* 取消非空的验证
        if(s==""){
          alert("请输入" + txtLab +"！");
          frmTemp.elements[txtName].focus();
          return false;
        }
        */
      //当输入不为空时
  /*    if(s!="")
      {
        if( !isValidDate(s) ){
            alert("在" + txtLab +"中输入的日期无效！");
            frmTemp.elements[txtName].focus();
            return false;
        }
        d=new Date(s);

        if(d.toString()=="NaN")
        {
          alert("在" + txtLab +"中输入的日期格式不对")
           frmTemp.elements[txtName].focus();
		return false;
        }
      }
        return true
        */

}

//比较开始和结束日期
function Compare(kssj,jssj){
	
	var temp1,temp2,frmTemp,a,b,c, ksObj, jsObj;
    frmTemp=document.forms[0];
	ksObj = frmTemp.elements[kssj];
	jsObj = frmTemp.elements[jssj];
	if ((ksObj == null)||(jsObj == null))
		return true;

	//如果开始时间在和结束时间有一个是空的则不做比较
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
		alert("<开始时间>不能晚于<结束时间>");
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

	//如果开始时间在和结束时间有一个是空的则不做比较
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
		alert(str1+"不能晚于"+str2);
	    frmTemp.elements[kssj].focus();
		return false;
		}
    else
		return true;
}

//检查是否是数字
//txtName是输入框的name,txtLab 是输入框的标签
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
			alert("请在"+txtLab+"中输入数字字符！");
            frmTemp.elements[txtName].focus();
            return false;
       
        }
    }
       return true;      
}


//检测框中录入的非法字符
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
        if( s == '+' || s == '·' || s == '\''|| s=='#' || s=='=' ||s == '='||s == '&'||s == '"' ){
            alert(txtLab+"中包含非法字符"+s+"!");
            frmTemp.elements[txtName].focus();
            return false;
        }
    }
    return true;
}


//去处编辑框的左右空格
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

//检查是否EMAIL地址
//检测email added by TNT
function CheckEmail(txtName,txtLab)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;
    //取消非空校验
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
		alert("请在" + txtLab +"中输入正确的e-Mail地址!")
		frmTemp.elements[txtName].focus();
		return false;
	}
}
//检测电话号码 added by TNT
function CheckPhone(txtName,txtLab)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;
    //取消非空校验
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
		alert("请在" + txtLab +"中输入正确的电话号码!")
		frmTemp.elements[txtName].focus();
		return false;
	}
}
//效验是否为小于1的小数，用于折扣的效验
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
		alert("请在" + txtLab +"中输入正确的折扣率!")
		frmTemp.elements[txtName].focus();
		return false;
	}
    
}
//校验是否是double型的小数，用于“金额”
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
        alert("请在"+txtLab+"中输入整数或小数！");
        frmTemp.elements[txtName].focus();
        return false;
        }
        }
        else if(i==temp.length-1){        
        if( s != '0' && s != '1' && s != '2'&& s!='3' && s!='4' &&s != '5'&&s != '6'&&s != '7'&&s != '8'&&s != '9')
		{
			alert("请在"+txtLab+"中输入整数或小数！");
            frmTemp.elements[txtName].focus();
            return false;
        }
        }
        else 
        {
         if( s != '0' && s != '1' && s != '2'&& s!='3' && s!='4' &&s != '5'&&s != '6'&&s != '7'&&s != '8'&&s != '9'&&s!='.')
		 {
			alert("请在"+txtLab+"中输入整数或小数！");
            frmTemp.elements[txtName].focus();
            return false;
         }
        }
    }
       return true;      
}


//检查是否为空
function CheckNull(txtName,txtLab)
{
	var frmTemp,temp;
	 StringTrim(txtName);
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;

	if(temp=="")
	{
		alert( txtLab + "不能为空！");
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}

//检查日期 －－langx
//检查日期的正确性
//@param s 日期格式 如2003/01/01
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


//检查是否是日期或为空 zwb 2004.2.17
//输入参数frmName是输入框所在的Form,txtName是输入框的name,txtLab 是输入框的标签
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
                                alert("在" + txtLab +"中输入的日期格式不对");
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
            alert("在" + txtLab +"中输入的日期无效！");
            frmTemp.elements[txtName].focus();
            return false;
        }
        d=new Date(s);

        if(d.toString()=="NaN")
        {
          alert("在" + txtLab +"中输入的日期格式不对")
           frmTemp.elements[txtName].focus();
		return false;
        }
        return true
}



//从附件路径中取得文件名,自动填入附件名称框中
//path路径字符串,附件名称的框对象 langx 20040521
function getNameFromPath( path , obj ){
    var pos = path.indexOf('\\');
    if( pos != -1 ){
         getNameFromPath( path.substring(pos+1),obj );
    }else{
        obj.value=path;
    }
}
// added by TNT 2006-07-21
//检查是否含有非法字符
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

//检查输入框的可输入长度
//txtName是输入框的name,txtLab 是输入框的标签
//maxLen是最大长度
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
		alert(txtLab +"过长，请删减!");
		frmTemp.elements[txtName].focus();
		return false;
	}
//	if(isInValidDateCheck(temp))
//	{
//		alert(txtLab +"含有非法字符!");
//		frmTemp.elements[txtName].focus();
//		return false;
//	}
	return true;
}

//检查输入字符是否含有非法字符
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
		alert(txtLab +"含有非法字符!");
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}

//检查输入框的可输入长度
//输入参数frmName是输入框所在的Form,txtName是输入框的name,txtLab 是输入框的标签
//mimLen是需要输入的最小长度，maxLen是最大长度
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
		alert("请输入"+txtLab + "!");
		//frmTemp.elements[txtName].focus();
		return false;
	}
	if(lCount<minLen)
	{
		alert(txtLab +"至少需要输入"+minLen+"个字符!");
		//frmTemp.elements[txtName].focus();
		return false;
	}
	if(lCount>maxLen)
	{
		alert(txtLab +"过长，请删减!");
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


//检查电话号码
function CheckPhoneNum(txtName,txtLab)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;

	if(temp=="")
	{
		alert("请在" + txtLab +"中输入数据!")
		frmTemp.elements[txtName].focus();
		return false;
	}

	var re = /[^1234567890()-\+]/i;
	if(!temp.search(re))
	{
		alert("请在" + txtLab +"中输入正确的号码!")
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}




//检查数值的输入范围
//输入参数frmName是输入框所在的Form,txtName是输入框的name,txtLab 是输入框的标签
//mimLen是需要输入的最小值，maxLen是最大值
function CheckValue(txtName,txtLab,minValue,maxValue)
{
	var frmTemp,temp;
	frmTemp=document.forms[0];
	temp=frmTemp.elements[txtName].value;
	if (temp=="")
	{
		alert("请在" + txtLab +"中输入数字!");
		frmTemp.elements[txtName].focus();
		return false;
	}
	temp=Number(temp);;
	if(isNaN(temp))
	{
		alert("请在" + txtLab +"中输入数字!");
		frmTemp.elements[txtName].focus();
		return false;
	}
	else
	{
		if(temp>=minValue && temp<=maxValue)
			return true;
		else
		{
			alert("请在" + txtLab +"中输入正确值：介于"+minValue+" 与 "+maxValue+" 之间!");
			frmTemp.elements[txtName].focus();
			return false;
		}
	}
}

//检查数值的输入范围
//obj是输入对象,txtLab 是输入框的标签
//mimLen是需要输入的最小长度，maxLen是最大长度
function CheckValue(obj,txtLab,minValue,maxValue)
{
	var temp;
	temp=obj.value;
	if (temp=="")
	{
		alert("请在" + txtLab +"中输入数字!");
		obj.focus();
		return false;
	}
	temp=Number(temp);
	if(isNaN(temp))
	{
		alert("请在" + txtLab +"中输入数字!");
		obj.focus();
		return false;
	}
	else
	{
		if(temp>=minValue && temp<=maxValue)
			return true;
		else
		{
			alert("请在" + txtLab +"中输入正确值：介于"+minValue+" 与 "+maxValue+" 之间!");
			obj.focus();
			return false;
		}
	}
}
//检查选择的值
//输入参数frmName是选择框所在的Form,SelName是选择框的name,SelLab 是选择框的标签
//intIllegue是其中的无效值
function CheckSelect(frmName,SelName,SelLab,intIllegue)
{
	var frmTemp,temp;
	frmTemp=document.forms[frmName];
	temp=frmTemp.elements[txtName].value;
	if (temp==intIllegue)
	{
		alert("请在" + txtLab +"中选择");
		frmTemp.elements[txtName].focus();
		return false;
	}
	return true;
}


//isEmpty     : 校验输入的参数是否为NULL
//isPosInteger: 包含0的整数
//isNature    : 自然数：大于零的整数
//isInteger   : 包括0的整数
//isNumber    : 浮点数
//isArabic    : 由数字组成的字串
//isPosNumber : 不为负的浮点数,包括0

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
		alert ("请输入数据!");
		input.focus();
		return false;
	}
	for (var i = 0; i < inputVal.length; i ++ ) {
		var oneChar = inputVal.charAt(i);
		if (i == 0 && oneChar == "+")
			if (inputVal.length == 1 )
			{
				alert ("请输入正的整数!");
				input.focus();
				return false;
			}
			else continue;
		if (oneChar < "0" || oneChar > "9")
		{
			alert ("请输整数!");
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
		alert("请输入正整数!");
		input.focus();
		return false;
	}
	for (var i = 0; i < inputVal.length; i ++ ) {
		var oneChar = inputVal.charAt(i);
		if (i == 0 && (oneChar == "+" || oneChar == "-") )
			if (inputVal.length == 1 )
			{
				alert("请输入正整数!");
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
			alert("请输入正整数!");
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
		alert("请在" + txtLab +"中输入数字!");
		frmTemp.elements[txtName].focus();
		return false;
	}
	temp= Math.abs(temp);
	if(temp.toString()=="NaN")
	{
		alert("请在" + txtLab +"中输入数字!");
		frmTemp.elements[txtName].focus();
		return false;
	}
	if(parseInt(temp)<0)
	{
		alert("在" + txtLab +"中输入正整数");
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
		alert("在" + txtLab +"中输入正整数");
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
		alert("请输入正整数!");
		input.focus();
		return false;
	}
	for (var i = 0; i < inputVal.length; i ++ ) {
		var oneChar = inputVal.charAt(i);
		if (i == 0 && (oneChar == "+" || oneChar == "-") )
			if (inputVal.length == 1 )
			{
				alert("请输入正整数!");
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
			alert("请输入正整数!");
			input.focus();
		 	return false;
		}
	}
	if (parseFloat(inputVal) < 0)
	{
		alert("请输入正数!");
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
//检查学年是否合法需要的函数
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

//检查学年是否合法  李铁峰
function checkYear(txtName){
        var frmTemp,temp, f, l, s;
        frmTemp=document.forms[0];
        temp=frmTemp.elements[txtName].value;

        if (isEmpty(temp)) return true;
        if (temp.length != 9){
        	alert("输入的学年长度应该为9位，请检查！");
        	frmTemp.elements[txtName].focus();
        	return false;

        }
        f = temp.substring(0, 4);

        if (!isInt(f)) {
        	alert("输入的学年前4位不是整数，请检查！");
        	frmTemp.elements[txtName].focus();
        	return false;
        }

        l = temp.substring(5, 9);

        if (!isInt(f)) {
        	alert("输入的学年的后4位不合法，请检查！");
        	frmTemp.elements[txtName].focus();
        	return false;
        }

	s= temp.charAt(4);

	if (s != '-'){
		alert("输入的学年的分隔符为'-'不合法，请检查！");
		frmTemp.elements[txtName].focus();
		return false;
	}

	if ((l < 1970) || (l > 2100) || (f < 1970) || (f > 2100)){
		alert("输入的学年的范围不合法，请检查！");
		frmTemp.elements[txtName].focus();
		return false;

	}

	if ((l - f) != 1){
		alert("输入的学年的时间间隔为1年，请检查！");
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
       alert("输入的年度长度应该为4位，请检查！");
       frmTemp.elements[txtName].focus();
       return false;

    }
    return true;
}

//显示日期控件函数
function popCalendar(frmName,txtName,host){
    if (!document.layers) {
       document.write("<a onclick=\"popUpCalendar(this, "+frmName+"."+txtName+", 'yyyy-mm-dd')\" style=\"cursor:hand\"><img src=\""+host+"/images/common/icons/calendar.gif\"  border=0></a>")
    }
}

//检查是否为字母和数字;
function isAlpha(frmName,txtName,nnn,tableName){
     var inputVal,frmTemp;
     frmTemp=document.forms[frmName];
     inputVal = new String(frmTemp.elements[txtName][nnn].value);
     for (var i = 0; i < inputVal.length; i ++ ) {
	if ( inputVal.charCodeAt(i)<48 || inputVal.charCodeAt(i)>122 || (inputVal.charCodeAt(i)<65 && inputVal.charCodeAt(i)>57) ){
        	alert("请在" + tableName + "输入英文或数字字符!");
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
        	alert("请在" + tableName + "输入英文或数字字符!");
                frmTemp.elements[txtName].focus();
                return false;
	}
     }
     return true;
}
//判断一组复选框是否选中,有选中则返回true
function checkSelect(){
  for(i=0;i<document.forms[0].length;i++)
  {
   var element=document.forms[0].elements[i]
   if(element.checked==true)
	  return true;
  }
  return false;
}


//检测非法sql字符
function checkInviableSqlChar(frmName,txtName,txtLab){
    var temp,frmTemp;
    frmTemp=document.forms[frmName];
    temp=new String(frmTemp.elements[txtName].value);
    for(var i=0;i<temp.length;i++){
        var s = temp.charAt(i);
        if( s == '\''||s == '='||s == '&'||s == '"'  ){
            alert(txtLab+"中包含非法字符"+s+"!");
            frmTemp.elements[txtName].focus();
            return false;
        }
    }
    return true;
}


