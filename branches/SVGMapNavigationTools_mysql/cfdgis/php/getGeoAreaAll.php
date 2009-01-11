<?php

require_once("inc/Configuration.inc.php");
require_once("Stack.php");

$stack1 = new Stack();

	$svgxml = $stack1->toareasvg();
	//$svgxml = mb_convert_encoding($svgxml, "UTF-8", "GB2312" );

	header("Content-type: text/xml");
	echo '<g id="' . $myId. '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  
	xmlns:attrib="http://www.carto.net/attrib"  attrib:timestamp="'. $timestamp.'">';
	echo $svgxml;
	echo "</g>";

?>