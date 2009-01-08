//关于本文件：右侧浮动面板控制

// 定义7个面板，保存在数组中；p1是标题div的id，pm1是标题栏div中可见span的id
var _panels			=['p1','p2','p3','p4','p5','p6','p7'];
var _panelSpan		=['p1m','p2m','p3m','p4m','p5m','p6m','p7m'];
var _panelContent	=['p1c','p2c','p3c','p4c','p5c','p6c','p7c'];

var _maxPanel="";		//当前最大化面板

//document.oncontextmenu=new Function("return false");

//辅助函数，通过id获得dom对象
function _el(id){
	return document.getElementById(id);
}

//显示面板：panelID-标题区div的id，panelTitleSpanID-内容区div的id
//isHideTitle- 是代表收缩其余面板

function _panelShow(panelID, panelTitleSpanID, isHideTitle)
{
	//var span = _el(panelTitleSpanID);
	
	for (var i=0;i<_panels.length;i++)
	{
		var panelIndex;
		
		if (_panels[i] != panelID) {
			// panelID之外的面板的内容全部隐藏
			_el(_panelContent[i]).style.display = "none";
			_el(_panelSpan[i]).innerHTML = '□';
		}
		else {
			//如果这个panel已经最大化，则折叠
			if( _maxPanel == panelID )
			{
				//折叠panelID的内容
				_el(_panelContent[i]).style.display = "none";
				_el(_panelSpan[i]).innerHTML = '□';
				_maxPanel = "";			
			}
			else
			{
				//展开显示panelID的内容
				_el(_panelContent[i]).style.display = "block";
				_el(_panelSpan[i]).innerHTML = '-';
				_maxPanel = panelID;
			}	
			

		}
	}
	
	

}

