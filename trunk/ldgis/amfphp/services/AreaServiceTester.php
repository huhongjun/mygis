<?php

require_once("AreaService.php");

$tester = new AreaService();
$ar = $tester->getAreaAll();

var_dump($ar);

?>
