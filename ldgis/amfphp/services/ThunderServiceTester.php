<?php

require_once("ThunderService.php");

$tester = new ThunderService();
$ar = $tester->getThunderForChartAll('2009-06-13','2009-06-14');

var_dump($ar);

?>
