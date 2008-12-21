
var _panels=['p1','p2','p3','p4','p5','p6','p7'];
var _maxmin=['pm1','pm2','pm3','pm4','pm5','pm6','pm7'];
var _max=true;
var _lp;

function _panelShow(a,b,c)
{//	map_layer.setDraggable(false); //∑¿÷πÕº∆¨“∆∂Ø
	parent.map_tool_op=0;	
	var b=_el(b);
	
	var e=c;
	for (var i=0;i<_panels.length;i++)
	{
		if (_panels[i]!=a)
		{
			_el(_maxmin[i]).innerHTML='°ı';
			var c=_el(_panels[i]).childNodes;
			for (var k=1;k<c.length;k++)
			{
				c[k].style.display="none";
			}
		}
	}
	if (_lp==a)
	{
		if (_max)
		{
			b.innerHTML='£ﬂ';
			d="block";
			_max=false;
		}
		else
		{
			b.innerHTML='°ı';
			d="none";
			_max=true;
		}
	}
	else
	{
			b.innerHTML='£ﬂ';
			d="block";
			_max=false;
	}
	if (!e)
	{
		b.innerHTML='£ﬂ';
		d="block";
		_max=false;
	}
	_lp=a;
	_el(a).style.display='block';
	var c=_el(a).childNodes;
	for (var k=1;k<c.length;k++)
	{
		c[k].style.display=d;
	}
}
function disp1(){
	_el('p1').style.display='block';
	if(_max){
		setTimeout("_panelShow('p1','pm1',true)",300)
		_max = false;
	}else{
		_panelShow('p1','pm1',false);
	}
}


function disp2(){
	_el('p2').style.display='block';
	if(_max){
		setTimeout("_panelShow('p2','pm2',true)",200)
		_max = false;
	}else{
		_panelShow('p2','pm2',false)
	}
}
  
function setJkInterval(jkSelect){
	if (hasJK){
		if (timeJK!=null)	
			clearInterval(timeJK);	//????
		var delaytime = jkSelect.options[jkSelect.selectedIndex].text;
		if (delaytime==""){
		    if (timeJK!=null)	
			  clearInterval(timeJK);	//????			
			//alert("???????");
			return;
		}
		delaytime = delaytime * 60000;	//???
		//alert(delaytime);
		timeJK=setInterval("doRealControl('" + delaytime + "');",delaytime); 	//??
		doRealControl(60000);
	}
} 
function stopJK(){
	if (hasJK){	
		if (timeJK!=null)	
			clearInterval(timeJK);	//????	
	}
}

function disp3(){
	_el('p3').style.display='block';
	if(_max){
		setTimeout("_panelShow('p3','pm3',true)",100)
		_max = false;
	}else{
			_panelShow('p3','pm3',false)
	}
}

function disp4(){
_el('p4').style.display='block';
setTimeout("_panelShow('p4','pm4',true)",100)
}

function disp5(){
_el('p5').style.display='block';
setTimeout("_panelShow('p5','pm5',true)",100)
}
function disp6(){
_el('p6').style.display='block';
setTimeout("_panelShow('p6','pm6',true)",100)
}
function disp7(){
_el('p7').style.display='block';
setTimeout("_panelShow('p7','pm7',true)",100)
}
function setPanel(){
//	alert(_el('chkzdy').checked);
	if (_el('chkzdy').checked){
		_el('wzzdy').style.display='block';
		_el('wzsg').style.display='none';
		//	_el('showonpic').style.display='block';
		

	}else{
		_el('wzsg').style.display='block';
		_el('wzzdy').style.display='none';
	//	_el('showonpic').style.display='none';

	}	
}