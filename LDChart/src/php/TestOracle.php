<?php
require_once("inc/Configuration.inc.php");

$conn = oci_connect(
					$_configuration['db_user'],
 					$_configuration['db_password'],
 					$_configuration['db_host']);

$query = 'select table_name from user_tables';

$stid = oci_parse($conn, $query);
oci_execute($stid, OCI_DEFAULT);
while ($row = oci_fetch_array($stid, OCI_ASSOC)) {
  foreach ($row as $item) {
    echo $item." ";
  }
  echo "<br>\n";
}

oci_free_statement($stid);
oci_close($conn);

?>
