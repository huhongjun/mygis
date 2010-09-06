<?php

require_once("inc/Configuration.inc.php");

class AreaService
{
	var $conn;
	
	public function __construct() 
	{
		try {
			$this->conn = oci_connect(
					'sde',//$_configuration['db_user'],
 					'sde',//$_configuration['db_password'],
 					'192.168.1.88/XE');

	       } catch (Exception $e) {
		            echo "Failed: " . $e->getMessage();
           }
			
	}

	public function getAreaAll() 
	{
		$sql ="select 
				id aid,
				name aname,
				'#FFFF' acolor
			from TBL_AREA";

		// Prepare the statement
		$stid = oci_parse($this->conn, $sql);
		if (!$stid) {
		    $e = oci_error($this->conn);
		     echo "Failed: " . $e->getMessage();
		}

		// Perform the logic of the query
		$r = oci_execute($stid);
		if (!$r) {
		    $e = oci_error($stid);
		     echo "Failed: " . $e->getMessage();
		}
		
		$rows = array();
		$idx =0;
		
		while ( ($row = oci_fetch_array($stid, OCI_BOTH))) {
			
			$areaRow = new stdClass();
			$areaRow->idx 	= $idx ;
			$areaRow->aid 	= $row[0];//mb_convert_encoding($row[0],   "UTF-8","GB2312");
			$areaRow->aname	= $row[1];
			$areaRow->acolor= $row[2] ;

			$rows[$idx] = $areaRow;

			$idx = $idx + 1;
		}
		
		oci_free_statement($stid);
		oci_close($this->conn);
		
		return $rows;
	}
	
	/**
	 * Utility function to throw an exception if an error occurs 
	 * while running a mysql command.
	 */
	private function throwExceptionOnError($link = null) {
		throw new Exception('MySQL Error - ');
	}
}

?>
