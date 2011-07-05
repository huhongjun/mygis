<?php
require_once("inc/Configuration.inc.php");

$conn = oci_connect(
					constant('db_user'),
 					constant('db_password'),
 					constant('db_host'));

$query = 'select table_name from user_tables';

echo "User: ".constant('db_user').", Password: ".constant('db_password').", Host: ".constant('db_host');
echo "<br>\n";

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
