package com.DragPanel
{
	import flash.display.DisplayObject;
	import flash.events.Event;
	
	import mx.containers.Panel;
	import mx.controls.Button;
	import mx.managers.PopUpManager;
	[Event(name="minimize")]
	[Event(name="maximize")]
	[Event(name="close")]
	public class MaxRestorePanel extends Panel
	{
		private var state1:int = 1;
		private var btnStateUp:Button;
		private var btnStateDown:Button;
		private var btnStateClose:Button;
		private var myHeight:Number;
		
		[Embed("../../../assets/upArrow.gif")]private var buttonUpIcon:Class;
		[Embed("../../../assets/downArrow.gif")] private var buttonDownIcon:Class;
		[Embed("../../../Images/Close.png")] private var buttonCloseIcon:Class;
		
		public function MaxRestorePanel()
		{
			super();
		}
		
		private function setState(state:int):void
		{
			if(state1 == 0)
			{
				this.dispatchEvent(new Event('minimize'));
			}
			else if (state == 1)
			{
				this.dispatchEvent(new Event('maximize'));
			}
			else
			{
				this.dispatchEvent(new Event('close'));
			}
		}
		
		protected override function createChildren():void
		{
			super.createChildren();
			btnStateUp = new Button;
			btnStateDown = new Button;
			btnStateClose = new Button;
		
			
			btnStateUp.addEventListener("click",doMinimize);
			btnStateDown.addEventListener("click",doMaximize);
			btnStateClose.addEventListener("click",doClose);
		
			
			btnStateUp.setStyle("overIcon",buttonUpIcon);
			btnStateUp.setStyle("downIcon",buttonUpIcon);
			btnStateUp.setStyle("upIcon",buttonUpIcon);
			
			btnStateDown.setStyle("overIcon",buttonDownIcon);
			btnStateDown.setStyle("downIcon",buttonDownIcon);
			btnStateDown.setStyle("upIcon",buttonDownIcon);
			
			btnStateClose.setStyle("overIcon",buttonCloseIcon);
			btnStateClose.setStyle("downIcon",buttonCloseIcon);
			btnStateClose.setStyle("upIcon",buttonCloseIcon);
			
			btnStateUp.visible = true;
			btnStateDown.visible = false;
			
			rawChildren.addChild(btnStateUp);
			rawChildren.addChild(btnStateDown);
			rawChildren.addChild(btnStateClose);
		}
		
		private function doMaximize(event:Event):void
		{
			setState(1)
			btnStateUp.visible = true;
			btnStateDown.visible = false;
			this.height = myHeight;
		}
		
		private function doMinimize(event:Event):void
		{
			setState(0)
			btnStateUp.visible = false;
			btnStateDown.visible = true;
			myHeight = this.height;
			this.height = 30;
		}
		
		private function doClose(event:Event):void
		{
			setState(3)
			PopUpManager.removePopUp(this);
		}
		
		protected override function updateDisplayList(unscaledWidth:Number, unscaledHeight:Number):void
		{
			super.updateDisplayList(unscaledWidth,unscaledHeight);
			if (unscaledWidth > 0)
			{
				this.visible = true;
			}
			else
			{
				this.visible = false;
			}
			var margin:int = 4;
			var upAsset:DisplayObject = btnStateUp.getChildByName("upIcon");
			var downAsset:DisplayObject = btnStateDown.getChildByName("upIcon");
			var closeAsset:DisplayObject = btnStateClose.getChildByName("upIcon");
			
			btnStateUp.setActualSize(upAsset.width + margin,upAsset.height + margin);
			btnStateDown.setActualSize(downAsset.width + margin, downAsset.height + margin);
			btnStateClose.setActualSize(closeAsset.width + margin, closeAsset.height + margin);
			
			var pixelsFromTop:int = 5;
			var pixelsFromRight:int = 30;
			var buttonWidth:int = btnStateUp.width;
			
			var x:Number = unscaledWidth - buttonWidth - pixelsFromRight;
			var y:Number = pixelsFromTop;
			
			btnStateDown.move(x,y);
			btnStateUp.move(x,y);
			btnStateClose.move(x - btnStateUp.width - 5,y);
		}
	}
}