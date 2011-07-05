<?php

require_once("inc/Configuration.inc.php");



class ThunderService
{
	var $conn;
	
	public function __construct() 
	{
		global $_configuration;
		try {
			$this->conn = oci_connect(
					constant('db_user'),
 					constant('db_password'),
 					constant('db_host'),
					'AL32UTF8');

	       } catch (Exception $e) {
		            echo "Failed: " . $e->getMessage();
           }
			
	}

	public function getThunderForChartAll($dateQSStr,$dateZZStr) 
	{
		$sql ="select 
				t2.name xian,
				to_char(flashtime,'yyyy-mm-dd') ftime,
				to_char(flashtime,'hh24') period ,
				(abs(t1.intension)*10 - MOD(abs(t1.intension)*10,50))/10 phase,
				t1.longitude longitude,
				t1.latitude latitude
			from tbl_thunder t1,TBL_AREA t2  
			where t1.xian = t2.id  and to_char(t1.flashtime,'yyyy-mm-dd')>='".$dateQSStr."' and to_char(t1.flashtime,'yyyy-mm-dd')<='".$dateZZStr."'";

		//echo $sql;
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
			
			$thunderRow = new stdClass();
			$thunderRow->idx 	= $idx ;
			$thunderRow->xian 	= $row[0];//mb_convert_encoding($row[0],   "UTF-8","GBK");///
			$thunderRow->ftime 	= $row[1];
			$thunderRow->period = $row[2] ;
			$thunderRow->phase 	= $row[3] ;
			$thunderRow->longitude 	= $row[4] ;
			$thunderRow->latitude 	= $row[5] ;

			$rows[$idx] = $thunderRow;

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
