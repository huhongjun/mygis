// ActionScript file
 private var m_image : Image = new Image();
                        
private function creationCompleteHandler() : void
{
    MainMap.infoWindow.label= "Image";
   
    MainMap.infoWindow.content = m_image;
}

private static const ATOM : Namespace = Namespaces.ATOM_NS;
private static const RE : RegExp = /M[ ](?P<mag>[^,]+),\.*/;

[Bindable]
private var arr : Array = [
    {url:"feed://earthquake.usgs.gov/eqcenter/catalogs/7day-M5.xml", georssFunction:usgs},
    {url:"feed://www.rsoe.hu/hisz/rss/disrss-eng.php", georssFunction:rsoe},
    {url:"feed://www.gdacs.org/XML/RSS.xml", georssFunction:gdacs}             
];

private function gdacs(
    arrcol : ArrayCollection,
    x : XML                
) : void
{
    var geometry : Geometry = GeoRSSUtil.toGeometry(x);
    var graphic : Graphic = new Graphic( geometry, sms1,{image:x.image});
    graphic.toolTip = x.description;
    graphic.addEventListener( MouseEvent.CLICK, graphic_clickHandler );
    arrcol.addItem( graphic );  
    
}

private function graphic_clickHandler( event : MouseEvent ) : void
{
    if( event.target is Graphic )
    {
        var graphic : Graphic = Graphic( event.target );
        m_image.source = graphic.attributes.image;
        MainMap.infoWindow.show( MapPoint( graphic.geometry ));                    
    }
}

private function rsoe(
    arrcol : ArrayCollection,
    x : XML                
) : void
{
    var geometry : Geometry = GeoRSSUtil.toGeometry(x);
    var graphic : Graphic = new Graphic( geometry, sms1);
    graphic.toolTip = x.description;
    arrcol.addItem( graphic );  
}

private function usgs(
    arrcol : ArrayCollection,
    x : XML
) : void
{
    var geometry : Geometry = GeoRSSUtil.toGeometry(x);
    var attributes : Object = {
    };
    var title : String = x.ATOM::title;
    
    var arr : Array = RE.exec( title );
    var mag : Number = Number( arr.mag );
    var symbol : Symbol;
    if( mag < 5.5 )
    {
        symbol = sms1;                    
    }
    else if( mag < 6.0 )
    {
        symbol = sms2;
    }
    else
    {
        symbol = sms3;
    }
    var graphic : Graphic = new Graphic( geometry, symbol, attributes );
    graphic.toolTip = title;
    arrcol.addItem( graphic );  
}                

private function load_clickHandler() : void
{
    georss.url = cb.selectedItem.url;
    georss.georssFunction = cb.selectedItem.georssFunction; 
  
}