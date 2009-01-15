package info.osmatrix.map{

	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.display.MovieClip;
	import flash.display.SimpleButton;
	import flash.display.Shape;

	import info.osmatrix.map.MapMovieClip;

	public class Map extends MovieClip {

		var map1:MapMovieClip;
		var maskShape:Shape;

		public function Map():void {

		}
		public function startup():void {
			//var btnZoomIn:Button = zoomIn;
			//map1.startup();
			map1 = MapMovieClip(mapCtrl);
			zoomIn.addEventListener(MouseEvent.CLICK, setZoomIn);

			maskShape = new Shape();
			maskShape.width = map1.width;
			maskShape.width = map1.height;
			maskShape.x = map1.x;
			maskShape.y = map1.y;
			maskShape.graphics.beginFill(0xffffff, 0);
			maskShape.graphics.drawRect(0,0,map1.width, map1.height);
			maskShape.graphics.endFill();
			map1.mask = maskShape;

			this.addChild(maskShape);
			this.setChildIndex(maskShape, 0);
		}
		public function setZoomIn(evt:MouseEvent):void {

			map1.zoomInSelected = true;
		}
	}
}