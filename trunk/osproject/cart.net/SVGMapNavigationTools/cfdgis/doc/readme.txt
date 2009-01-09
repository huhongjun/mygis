200801001
	Flex只有架子；
	背景轮廓线和垛位都未实现加载
20080107
	iframe方式嵌入svg
	firefox中可以直接访问svg的函数，ie中不行
20080109
	大部分功能实现
	
	<script type="text/javascript">
		var height= document.documentElement.clientHeight - 33;
		var width = document.documentElement.clientWidth;
		var str = "<embed width='"+width+"' height='"+height+"' type='image/svg-xml' id='svgmapctrl' pluginspage='http://www.adobe.com/svg/viewer/install/' src='map.svg' wmode='transparent'></embed>" ;
		document.write(str);
	</script>	
