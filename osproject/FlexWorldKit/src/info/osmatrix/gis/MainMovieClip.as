
package info.osmatrix.gis{
	import flash.display.*;
	import flash.events.*;
	import fl.controls.Button;

	import info.osmatrix.gis.*;

	public class MainMovieClip extends MovieClip {
		var componentsMC:MovieClip;
		var mapMC:MovieClip;
		var mapMain:MapMain;

		function init() {

			btnControlBar.addEventListener(MouseEvent.CLICK, clickHandleControl);
			btnNavBar.addEventListener(MouseEvent.CLICK, clickHandleNav);
			btnCrossHair.addEventListener(MouseEvent.CLICK, clickHandleCrossHair);

			mapMC = new MapMovieClip();
			mapMC.name="map";
			mapMC.x=165;
			mapMC.y=59;
			addChild(mapMC);

			componentsMC = new ComponentsMovieClip();
			componentsMC.name="components";
			componentsMC.x=11;
			componentsMC.y=87;
			//componentsMC.border = 
			addChild(componentsMC);

			mapMain=MapMain.main(this);
		}

		function clickHandleControl( event:MouseEvent ):void {
			apiSetupControlBar();
		}
		function clickHandleNav( event:MouseEvent ):void {
			apiSetupNavBar();
		}
		function clickHandleCrossHair( event:MouseEvent ):void {
			apiSetupCrossHair();
		}

		public function apiSetupControlBar():MovieClip {
			var mc:MapControlBar = new MapControlBar();
			mc.x=16;
			componentsMC.addChild(mc);
			return mc;
		}

		public function apiSetupNavBar():void {
			var mc:MapNavBar = new MapNavBar();
			mc.x=296;
			componentsMC.addChild(mc);
		}
		public function apiSetupCrossHair():MovieClip {
			var mc:MapCrossHair = new MapCrossHair();
			mc.name="crosshair";
			mc.x=296;
			componentsMC.addChild(mc);
			return mc;
		}

	}
}