package info.osmatrix.gis
{
	import flash.display.MovieClip;
	
	/*
	 * import com.brainoff.worldkitMain;
		var wk:worldkitMain = new worldkitMain();
		worldkitMain.main(this);
	 */
	public class MapMain {
	    public static var version:String = "3.3-20071029";
	
	    private var conf:MapConfig;
	    //private var img:MapImages;
	    private var interact:MapInteraction;
	    //private var rss:MapRSS;
	
	    public var parent:MovieClip;
	
	    public function MapMain (parent:MovieClip):void { 
	        this.parent = parent; 
	
	        MapUtil.setUp();
	
	        conf = new MapConfig(this);
	        //img = new MapImages(this);
	        interact = new MapInteraction(this);
	        //rss = new MapRSS(this);
	
	        conf.load();
	        interact.afterConf();
	        interact.SetupInput();
	
	
	    }
	
	    public static function main(parent:MovieClip):MapMain {
        	var wk:MapMain = new MapMain(parent);
	  		
	  		return wk;	
	    }
	
	    /*
	       Controls loading order of config, images, rss
	     */
	    public function signalDone(sig:String):void {
	        switch (sig) {
	            case "CONFIG":
	                //interact.afterConf();
	                //img.load();
	                //interact.SetupInput();
	                break;
/* 	            case "IMAGES":
	                worldkitGPX.start(this);
	                rss.start();
	                if (conf.onloadcallback) {
	                    interact.processClick("","_"+conf.onloadcallback,"");
	                }
	                break; */
	            default:
	                break;
	        }
	    }
	
	    /*
	       classes request access to other classes through worldkitMain
	     */
 	    public function getConfig():MapConfig {
	        return conf;
	    }
	    public function getInteract():MapInteraction {
	        return interact;
	    }
/*	    public function getRSS():MapRSS {
	        return rss;
	    }
	    public function getImages():MapImages {
	        return img;
	    } */
	}
}