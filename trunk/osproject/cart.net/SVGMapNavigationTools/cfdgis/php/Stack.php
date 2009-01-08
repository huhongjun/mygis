<?php
/*
	STOW_NAME=>D区(1300,1360)
*/


Class Stack{
	public $STOWid;
	public $STOW_NAME="";
	public $BOAT_NAME="";
	public $COUSTOMER_NAME="";
	public $COUSTOMER_NAME1="";
	public $GOODS_NAME="";

	public function tostr()
	{
		$str = $this->STOWid.":".$this->STOW_NAME.":".$this->BOAT_NAME.":".$this->COUSTOMER_NAME.":".$this->COUSTOMER_NAME1.":".$this->GOODS_NAME;
		return $str;
	}
	
	public function toxml()
	{
		$str = "<stack STOWid='".$this->STOWid."' STOW_NAME='".$this->STOW_NAME."' BOAT_NAME='".$this->BOAT_NAME.
		"' COUSTOMER_NAME='".$this->COUSTOMER_NAME.
		"' COUSTOMER_NAME1='".$this->COUSTOMER_NAME1."' GOODS_NAME='".$this->GOODS_NAME."'/>";
		return $str;
	}
	
	public function tosvg()
	{
		$stacknames = array('-A区', 'A区',   'B区',   'C区',   'D区',   'E区',  'F区',  '-F区',  '1区',   '2区',  '3区',   '4区',  '5区', '6区', '7区', '8区','9区');
		$stackxs = array(921.58,  911,     900.42,  889.84,  879.26,  868.68, 858.1,  847.52, 193,     203,      213,    224,    234,    245,  254,   263,  274);
		$stackys = array(335.95,  325,     314.05,  303.1,   292.15,  281.2,  270.25,  259.3, 110,     120,      130,    140,150,160,170,180,  190);
		$stackrotates = array(136.1,   136.1,   136.1,   136.1,   136.1,   136.1,  136.1,   136.1, 316.1,   316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,46.1,136.1,136.1,136.1,136.1,136.1,136.1,136.1,136.1,136.1);
	
		$stackareastr = $this->STOW_NAME; 			//mb_convert_encoding($this->STOW_NAME, "UTF-8", "GB2312" )
		$pos1 = mb_strpos($stackareastr, '('); 		//echo $stackareastr . "=>pos1:".$pos1 . "----";
		$pos2 = mb_strpos($stackareastr, ','); 		//echo $stackareastr . "=>pos2:".$pos2 . "----";
		$pos3 = mb_strpos($stackareastr, ')'); 		//echo $stackareastr . "=>pos3:".$pos3 . "----";
		
		$area = mb_convert_encoding(mb_substr($stackareastr,0, $pos1 - 1 ,"GB2312"), "UTF-8", "GB2312" ) ;
		$widthstart = trim(mb_substr($stackareastr,$pos1 , $pos2 - $pos1 - 1, "GB2312"));	
		$widthend = trim(mb_substr($stackareastr,$pos2 , $pos3 - $pos2 -1 , "GB2312"));
		//echo "area:".$area."width:" . $widthstart .", widthend:" . $widthend;
		
		$width = $widthend - $widthstart;
		
		// // 获得所属分区的原点坐标和旋转角度
		$index = 1;
		foreach ((array)$stacknames as $key=>$value)
		{
			if($value == $area) {  $index = $key; }
		}
		$a0x = $stackxs[$index]; 
		$a0y = $stackys[$index]; 
		$a0rotate = $stackrotates[$index];
		$widthscale = 350/1500;
		//echo "[".$index."?".$a0x."?".$a0y."?".$a0rotate."]";
		
		$x = $a0x - ( $widthstart * 350 / 1500 ) * cos( (pi()/180) * (180 - $a0rotate));
		$y = $a0y + ( $widthstart * 350 / 1500 ) * sin( (pi()/180) * (180 - $a0rotate));
		
		$svgrect = "<rect x='" . $x ."' y='".$y."' width='".$width."' height='8' "." id='".$this->STOWid."'"." STOWid='".$this->STOWid."' STOW_NAME='".$this->STOW_NAME."' BOAT_NAME='".$this->BOAT_NAME."' GOODS_NAME='".$this->GOODS_NAME."' COUSTOMER_NAME='".$this->COUSTOMER_NAME.
		"' style='fill:#00FFFF;stroke:#000000;stroke-width:1' rx= '2' ry = '2' onclick='objectMouseClick(evt)' onmouseout='objectMouseOut(evt)' onmouseover='objectMouseOver(evt)' transform='rotate(" .$a0rotate." ".$x ."," . $y . ")' type='stack' attrib:tooltip='".$this->tostr()."'/>";
		$svgtext = "<text  x='".($x-10)."' y='".$y."' fill='red' stroke='red' stroke-width='0.02' font-size='9'  font-family='SimSun'> ".$this->BOAT_NAME." </text>";
		
		$svgelement = $svgrect . ";" . $svgtext;
		
		return $svgelement;
	}
}

?>