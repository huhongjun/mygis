<?php

Class Car{
	public $oid="";
	public $cx=0;
	public $cy=0;
	public $CAR_CODE=0;
	public $CAR_NAME=0;
	public $CAR_TYPE=0;
		
	public function tosvg()
	{
		$svgelement = "<use id='". $this->oid."' x='". $this->cx."' y='" .  $this->cy ."' CAR_CODE='". $this->CAR_CODE."' CAR_NAME='". $this->CAR_NAME."' CAR_TYPE='". $this->CAR_TYPE."' xlink:href='#ballGroup' stroke='red' fill='#ffff00' onclick='objectMouseClick(evt)' onmouseout='objectMouseOut(evt)' onmouseover='objectMouseOver(evt)' transform='rotate(0 x,y) scale(0.01)' type='car' infotip='" .
		$this->tostring(). "'/>";
		return $svgelement;
	}
	
	public function tostring()
	{
		return "ID:" . $this->oid . "[" . $this->CAR_CODE . "," . $this->CAR_NAME . "]";
	}
	
	public function toxmltree()
	{
		return "<item child='0' id='".$this->oid."' text='".$this->CAR_NAME."'><userdata name='ud_block'>ud_data</userdata></item>";
	}
}

?>