<?php 
// &lat=[LAT]&long=[LONG]&zoom=[ZOOM]&extent=[EXTENT]
/* $url,$title,$description,$imgurl,$tags,$lat,$long,$user

	$url = $_Get();
	$title
	$description
	$imgurl,
	$lat
	$long
	$user
*/	
	echo $lat;
	print_r($_REQUEST);

	$handle = fopen("./rss.xml","r");
	$contents = fread($handle, filesize("./rss.xml"));
	fclose($handle);

	$newitem = "<item><title>$title</title><link>$url</link><description><![CDATA[" . $description . "<br><i>by: $user; tags: $tags</i>]]></description><author>$user</author><geo:lat>$lat</geo:lat><geo:long>$long</geo:long>" . $cat . $imgtag . "</item>\n\t\t";

	$pos = strpos($contents, '<item>');
	$newcontents = substr_replace($contents, $newitem, $pos, 0);

	$handle = fopen("./rss-wiki.xml","w");
	fwrite($handle, $newcontents);
	fclose($handle);

?>