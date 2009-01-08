////////////////////////////////////////////////////////////////////////////////
//
// Copyright © 2008 ESRI
//
// All rights reserved under the copyright laws of the United States.
// You may freely redistribute and use this software, with or
// without modification, provided you include the original copyright
// and use restrictions.  See use restrictions in the file:
// <install location>/FlexViewer/License.txt
//
////////////////////////////////////////////////////////////////////////////////

package com.esri.solutions.flexviewer
{

	import com.esri.ags.Map;
	
	import flash.events.Event;
	
	import mx.collections.ArrayCollection;
	import mx.controls.Alert;
	import mx.modules.Module;
	import mx.rpc.events.FaultEvent;
	import mx.rpc.events.ResultEvent;
	import mx.rpc.http.HTTPService;

    /**
     * BaseWidget is the foundation of all widgets. All widgets need to be derived from this BaseWidget class.
     * 
     * <p><b>NOTE</b>: Once the a new widget class is created by extending this BaseWidget class, 
     * the developer is responsible for adding the new widget class to Flex Builder project properties's
     * module table. This allows the new widge be compiled into a SWF file.
     */
    [Event(name="widgetConfigLoaded", type="flash.events.Event")]
    
	public class BaseWidget extends Module implements IBaseWidget
	{
        /**
        * Indicates the widget is minmized.
        */
        public static const STATE_MINIMIZED:String = "minimized";
        /**
        * Indicates the widget is maxmized.
        */
        public static const STATE_MAXIMIZED:String = "maximized";
        /**
        * indicate the state is closed.
        */
        public static const STATE_CLOSED:String    = "closed";
        /**
        * The data structure that holds the configuration information parsed by
        * the ConfigManager from config.xml. A widget can access top level configuration
        * information through this property. The WeidgetManager will set it when the 
        * widget is initialized.
        * 
        * @see configData
        * @see ConfigManager
        */
        public var configData:ConfigData;     
        /**
        * The XML type of configuration data.
        * @see configData
        */
        public var configXML:XML;
        /**
        * It is the currect active map the container shows. The WidgetManager will set its
        * value when a widget is initialized.
        */        
        public var map:Map;    
        /**
        * the default widget icon.
        */
        public var widgetIcon:String = "com/esri/solutions/flexviewer/assets/images/icons/i_globe.png";

        public var widgetTitle:String = "Widget";

        [Bindable]
        private var widgetId:Number;                    
		private var widgetConfig:String;										
		private var widgetState:String;		
		private var widgetTemplate:IWidgetTemplate;		
        private const WIDGET_CONFIG_LOADED:String = "widgetConfigLoaded";       
		
		/**
		 * BaseWidget constructor.
		 */
		public function BaseWidget()
		{
			super();
			this.layout = "absolute";
			addEventListener("creationComplete", initWidgetTemplate);
		}
		
		private function initWidgetTemplate(event:Event):void
		{
			var children:Array = this.getChildren();
			for each (var child:Object in children)
			{
				if (child is IWidgetTemplate)
				{
					widgetTemplate = child as IWidgetTemplate;
					widgetTemplate.setTitle(widgetTitle);
					widgetTemplate.setIcon(widgetIcon);
				}
			}
		}
		
		/**
		 * Set the widet ID. A widget ID is a internal generate identifier in number.
		 * 
		 * @param value the Number id.
		 */
		public function setId(value:Number):void
		{
			widgetId = value;
		}
		/**
		 * Set the widget title. A widget titile can be configured in the config.xml.
		 * 
		 * @param value the title text.
		 */
		public function setTitle(value:String):void
		{
			widgetTitle = value;
		}
		/**
		 * Set widget icon. A widget icon is JPL or PNG file in 40x40 size and configured
		 * in the config.xml.
		 * 
		 * @param value the icon URL.
		 */
		public function setIcon(value:String):void
		{
			widgetIcon = value;
		}
		/**
		 * Set configuration file URL. A widget can have its own configuration file. The
		 * URL is in the config.xml. The WidgetManager will pass the URL to a widget.
		 * 
		 * @param value the configuration file URL.
		 */
		public function setConfig(value:String):void
		{
			widgetConfig = value;
			configLoad();
		}
	    /**
	    * Pass in application level configuration data parsed from config.xml.
	    * 
	    * @param value the configuration data structure object.
	    * @see ConfigData
	    */
		public function setConfigData(value:ConfigData):void
		{
			configData = value;
		}
		/**
		 * Set the widget state.
		 * @param value the state string defined in BaseWidget.
		 */
		public function setState(value:String):void
		{
			widgetState = value;
			if (widgetTemplate)
				widgetTemplate.setState(value);
		}
		/**
		 * Set a map object reference. Used by WidgetManager to pass in the current
		 * map.
		 * 
		 * @param value the map reference object.
		 */
		public function setMap(value:Map):void
		{
			map = value;
		}
		
		/**
		 * Add information from widget to DataManager so that it can be shared between widgets
		 * 
		 * @param key the widget name
		 * @param arrayCollection the list of object in infoData structure.
		 */
		public function addSharedData(key:String, arrayCollection:ArrayCollection):void
		{
			var data:Object = 
			{
				key: key,
				collection: arrayCollection
			}
			SiteContainer.dispatchEvent(new AppEvent(AppEvent.DATA_ADDED, false, false, data));
			
		}
		
		/**
		 * Fetch shared data from DataManager
		 */
		public function fetchSharedData():void
		{
			SiteContainer.dispatchEvent(new AppEvent(AppEvent.DATA_FETCH));
		}
				
		/**
		 * Show information wWindow based on infoData from widget
		 */
		public function showInfoWindow(infoData:Object):void
		{
			SiteContainer.dispatchEvent(new AppEvent(AppEvent.SHOW_INFOWINDOW, false, false, infoData));
			
		}
				
		/**
		 * Set map action from widget
		 */
		public function setMapAction(action:String, status:String, callback:Function):void
		{
	        var data:Object = 
	        {
	            tool: action,
	            status: status,
	            handler: callback
	        }
		    SiteContainer.dispatchEvent(new AppEvent(AppEvent.SET_MAP_ACTION, false, false, data));	
		}
		/**
		 * Set map navigation mode, such a pan, zoomin, etc.
         * <p>The navigation methods supported are:</p>
         * <listing>
         * pan          (Navigation.PAN)
         * zoomin       (Navigation.ZOOM_IN)
         * zoomout      (Navigation.ZOOM_OUT)
         * zoomfull     (SiteContainer.NAVIGATION_ZOOM_FULL)
         * zoomprevious (SiteContainer.NAVIGATION_ZOOM_PREVIOUS)
         * zoomnext     (SiteContainer.NAVIGATION_ZOOM_NEXT)
         * </listing> 
		 */
		public function setMapNavigation(navMethod:String, status:String):void
		{
			var data:Object =
			{
				tool: navMethod,
				status: status
			}
			SiteContainer.dispatchEvent(new AppEvent(AppEvent.SET_MAP_NAVIGATION, false, false, data));
		}
		/**
		 * This will allow display a error message window.
		 */
		public function showError(errorMessage:String):void
		{
             SiteContainer.dispatchEvent(new AppEvent(AppEvent.APP_ERROR, false, false, errorMessage));
		}
		
		//config load
		private function configLoad():void
		{
			if (widgetConfig)
			{
				var configService:HTTPService = new HTTPService();
				configService.url = widgetConfig;
				configService.resultFormat = "e4x";
				configService.addEventListener(ResultEvent.RESULT, configResult);
				configService.addEventListener(FaultEvent.FAULT, configFault);	
				configService.send();
			}
		}
				
		//config fault
		private function configFault(event:mx.rpc.events.FaultEvent):void
		{
			var sInfo:String = "Error: ";
			sInfo += "Event Target: " + event.target + "\n\n";
			sInfo += "Event Type: " + event.type + "\n\n";
			sInfo += "Fault Code: " + event.fault.faultCode + "\n\n";
			sInfo += "Fault Info: " + event.fault.faultString;
			showError(sInfo);
		}
				
		//config result
		private function configResult(event:ResultEvent):void
		{
			try
			{	
				configXML = event.result as XML;
				dispatchEvent(new Event(WIDGET_CONFIG_LOADED));
			}
			catch (error:Error)
			{
				showError("A problem occured while parsing the widget configuration file. " + error.message);
			}
		}
		
	}
}