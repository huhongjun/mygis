var svgdoc;

function init()
{
		//alert("1111");
	    svgdoc = document.getElementById("mapctrl");
		string =  "<circle cx='150' cy='200' r='5'/>";
		node = parseXML(string, svgdoc);
	
		string =  "<circle cx='150' cy='200' r='5'/>";
        svgdoc.rootElement.appendChild(node);

}