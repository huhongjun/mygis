

function showHistoryOnMainViewForFlex(qsDate, zzDate){
     if (isLoadingMap)
           return;

  //var form = document.getElementById("lshfForm")
  //dateq = document.getElementById("hfsjq").value
dateq = 	qsDate
  //datez = document.getElementById("hfsjz").value
datez = 	zzDate
  dateval = document.getElementById("hfjg").value
	if (!xmlHttp)
		initializeXmlHttp();
	datestart = dateq;
	datestop = datez;
	var src = "";
//alert(dateval);
	src = "realControl.do?method=lshf&hfsjq=" + dateq +"&hfsjz="+datez+"&hfjg="+dateval;
		/*if (dateval == "day"){
			daysval = 1;
			daysvals = 0;
		}
		if (dateval == "week"){
			daysval = 7;
			daysvals = 0;
		}		
		if (dateval == "month"){
			daysval = 30;
			daysvals = 0;
		}
		if (dateval == "season"){
			daysval = 120;
			daysvals = 0;
		}
		if (dateval == "year"){
			daysval = 365;
			daysvals = 0;
		}	*/
	src +=getPictureRequestParameters();	
//alert(src);	
	xmlHttp.open("post",src, true);
	
    showWaitPanel();
    isLoadingMap = true;
    xmlHttp.onreadystatechange = updateStartPageLSHF;
	xmlHttp.send();


}