 <?php
$a = '<?xml version="1.0"?>';
$b = '<rss version="2.0" xmlns:georss="http://www.georss.org/georss">';
$c = '	<channel>
		<title>worldKit 欢迎</title>
		<link>http://www.brainoff.com/worldkit/</link>
		<description>Sample feed for worldKit</description>
		<item>
			<title>欢迎WorldKit</title>
			<link>http://brainoff.com/worldkit/</link>
			<description>If you see this, you have successfully installed worldKit on your webserver!
			</description>
			<georss:point>0 0</georss:point>
			 <dc:subject>track</dc:subject>
			 <pubDate>Sat, 07 Sep 2008 00:00:00 +00:00</pubDate>
		</item>
		<item>
			<title>Read all about it</title>
			<link>http://brainoff.com/worldkit/doc/</link>
			<description>Check out how to set up your application in the manual</description>
			<georss:point>-60 45</georss:point>
			 <dc:subject>track</dc:subject>
			 <pubDate>Sat, 07 Sep 2008 00:00:01 +00:00</pubDate>
		</item>
		<item>
			<title>Enjoy</title>
			<description>Thanks for checking in out - Mikel</description>
			<link>http://brainoff.com/worldkit/contact.php</link>
			<georss:point>45 -90</georss:point>
			 <dc:subject>track</dc:subject>
			 <pubDate>Sat, 07 Sep 2008 00:00:02 +00:00</pubDate>
		</item>
		<item>
			 <title>An example polygon</title>
			 <link>http://example.com/geo</link>
			 <description>Just an example</description>
			 <georss:polygon>30 -120 30 -100 20 -100 30 -120</georss:polygon>
			 <pubDate>Sat, 07 Sep 2008 00:00:03 +00:00</pubDate>
		</item> 
		<item>
			 <title>An example line</title>
			 <link>http://example.com/geo</link>
			 <description>Just an example</description>
			 <georss:line>50 -0.2 54 3 59 2.56</georss:line> 
			 <pubDate>Sat, 07 Sep 2008 00:00:04 +00:00</pubDate>
		</item>
		<item>
			 <title>An example box</title>
			 <link>http://example.com/geo</link>
			 <description>Just an example</description>
			 <georss:box>42.943 -71.032 43.039 -69.856</georss:box> 
			 <pubDate>Sat, 07 Sep 2008 00:00:05 +00:00</pubDate>
		</item>	 
	</channel>
</rss>';
echo $a . $b . $c;
  ?>
