//line break for text
//textToAppend = nodeReference to a SVG text node
//myText = content of text node
function textFlow(myText,textToAppend,charPerLine,x,ddy,maxNrLines) {
        //first check if textToAppend already has child nodes and remove them
        while(textToAppend.hasChildNodes()) {
        	textToAppend.removeChild(textToAppend.firstChild);
        }
        //extract and add line breaks for start
        var dashArray = new Array();
        var dashFound = true;
        var indexPos = 0;
        var cumulY = 0;
        while (dashFound == true) {
                var result = myText.indexOf("-",indexPos);
                if (result == -1) {
                        //could not find a dash
                        dashFound = false;
                }
                else {
                        dashArray.push(result);
                        indexPos = result + 1;
                }
        }
        var words = myText.split(/[\s-]/);
        var line = "";
        var dy = 0;
        var prevLineLength = 0;
        var lineCounter = 0;
        for (i=0;i<words.length;i++) {
                var word = words[i];
                if (line.length + word.length > charPerLine || i == words.length - 1) {
                        lineCounter++;
                        var tspanEl = document.createElementNS(svgNS,"tspan");
                        tspanEl.setAttributeNS(null,"x",x);
                        tspanEl.setAttributeNS(null,"dy",dy);
                        var nextLine = false;
                        if (line.length + word.length < charPerLine) {
                                line += word;
                                nextLine = true;
                        }
                        if (maxNrLines) {
                        	if (lineCounter == maxNrLines) {
                        		if (i < words.length - 1) {
                        			//alert("shortening text");
                        			line += " ...";
                        		}
                        	}
                        }
                        var myTextNode = document.createTextNode(line);                		

                        tspanEl.appendChild(myTextNode);
                        textToAppend.appendChild(tspanEl);
                        prevLineLength += line.length;
                        if(checkDashPosition(dashArray,(prevLineLength + word.length))) {
                                line = word + "-";
                        }
                        else {
                                line = word + " ";
                        }
                        dy = ddy;
                        cumulY += dy;
                        //this case is when we are already at the last line
                        if ((i == words.length - 1) && (nextLine == false)) {
                        	if (maxNrLines) {
                        		if (lineCounter == maxNrLines) {
                        			var myTextNode = document.createTextNode(" ...");
                        			tspanEl.appendChild(myTextNode);
                        			return cumulY;
                        		}
                        	}
                               	var tspanEl = document.createElementNS(svgNS,"tspan");
                                tspanEl.setAttributeNS(null,"x",x);
                                tspanEl.setAttributeNS(null,"dy",dy);
                                var myTextNode = document.createTextNode(line);
                                tspanEl.appendChild(myTextNode);
                                textToAppend.appendChild(tspanEl);
                                cumulY += dy;
                        }
                        if (maxNrLines) {
                        	if (lineCounter == maxNrLines) {
                        		return cumulY;
                        	}
                        }
               }
                else {
                        if(checkDashPosition(dashArray,(prevLineLength + line.length + word.length))) {
                                line += word + "-";
                        }
                        else {
                                line += word + " ";
                        }
                }
        }
        return cumulY;
}

function checkDashPosition(dashArray,pos) {
        var result = false;
        for (var i=0;i<dashArray.length;i++) {
                if (dashArray[i] == pos) {
                        result = true;
                }
        }
        return result;
}