var svgDoc,Map,svgMain,svgDocbak;
var svgW,svgH,vbMaxW,vbMaxH;
var vbCX,vbCY,vbCW,vbCH,WAmp,HAmp,currentAmp;
var minAmp,maxAmp=100;
var CMD=null;
var isBusy=false;
var panX,panY;
var zoomRect,rulerBck,rulerLine,inforect,infotext,HlSymbol;
var isMessuring=false;
var lonMin,latMin,lonMax,latMax,xTimes,yTimes,Scaler;
var zoomVal=0;
var moveStep=20;
//---------------------- 
var second = 1;
var svgdoc=null;
var SVGDocument = null;
var SVGRoot = null;
var cBtn = null;
var ss=null;
var staknames  =['-A区', 'A区',   'B区',   'C区',   'D区',   'E区',  'F区',  '-F区',  '1区',   '2区',   '3区',   '4区',  '5区', '6区', '7区', '8区','9区']
var stakxs     =[921.58,  911,     900.42,  889.84,  879.26,  868.68, 858.1,  847.52, 193,     203,      213,    224,    234,    245,  254,   263,  274];
var stakys     =[335.95,  325,     314.05,  303.1,   292.15,  281.2,  270.25,  259.3, 110,     120,      130,    140,150,160,170,180,190];
var stakrotates=[136.1,   136.1,   136.1,   136.1,   136.1,   136.1,  136.1,   136.1, 316.1,   316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,316.1,46.1,136.1,136.1,136.1,136.1,136.1,136.1,136.1,136.1,136.1];
var widthscale=0.2;
var a0x=911;
var a0y=325;
var a0rotate=136.1;
var controlTimer;
var angle;
var carNames=new Array(); 
var dtree;
//選中的車輛ID
var selectedCarID;