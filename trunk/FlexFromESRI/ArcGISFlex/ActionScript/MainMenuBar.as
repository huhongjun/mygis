// ActionScript file
   // Event handler for the TopMenuBar control's itemClick event.
   import com.DragPanel.DragWindow;
   import com.DragPanel.FindAddress;
   import com.DragPanel.IDResults;
   import com.esri.ags.Map;
   import com.esri.ags.layers.Layer;
   
   import mx.managers.PopUpManager;
            private function TopMenuBarHandler(event:MenuEvent):void
              {
               
                // Requires <esri:Navigation id="navToolbar"> Object
                 switch (event.label)
                    {   
                    	
                    	 // Activate Selected Navigation Function                 
                    	case "Zoom In":
                    	    {
                    	    	drawToolbar.deactivate();                        
                    	    	navToolbar.activate(Navigation.ZOOM_IN);
                    	    	MainMap.zoomSliderVisible = true;
                    	    	break;
                    	    }                    
                    	case "Zoom Out":                    
                    	    {  
                    	       drawToolbar.deactivate();                      
                    	       navToolbar.activate(Navigation.ZOOM_OUT);
                    	       MainMap.zoomSliderVisible = true;
                    	       break;                    
                    	    }                    
                    	case "Pan":
                    	    {  
                    	      drawToolbar.deactivate();                      
                    	      navToolbar.activate(Navigation.PAN);
                    	      MainMap.zoomSliderVisible = true;
                    	      break;                    
                    	    }
                    	case "Full Extent":
                    	    { 
                    	      drawToolbar.deactivate();                       
                    	      navToolbar.zoomToFullExtent();
                    	      MainMap.zoomSliderVisible = true;
                    	      break;                    
                    	    }
                    	case "Zoom Previous":
                    	    {
                    	     drawToolbar.deactivate();                      
                    	     navToolbar.zoomToPrevExtent();
                    	     MainMap.zoomSliderVisible = true;
                    	      break;                    
                    	    }
                    	case "Zoom Next":
                    	    { 
                    	      drawToolbar.deactivate();                       
                    	      navToolbar.zoomToNextExtent();
                    	      MainMap.zoomSliderVisible = true;
                    	      break;                    
                    	    }
                    	    
                    	    
                    	     // Find Tools
                    	     
                    	case "Find Address":
                    	    {                        
                    	   	var win:FindAddress;
							win=FindAddress(PopUpManager.createPopUp(this,FindAddress,false));
							win.MainMap = MainMap;
							win.myGraphicsLayer =  myGraphicsLayer;
							win.sms = sms;
							
                    	      break;                    
                    	    }
                    	    
                    	    
                    	        // Show TOC
                    	     
                    	case "Tabel of Contents":
                    	    { 
                    	    
                    	    showPopUp(CenusData,MainMap);	
                    	   	break;          
                    	   	}
                    	   	
                    	case "ID Features":
                    	{
                    	var win2:IDResults
                    	win2= IDResults(PopUpManager.createPopUp(this,IDResults,false));
                    	win2.MainMap = MainMap;
                    	win2.myGraphicsLayer = myGraphicsLayer;
                    	win2.navToolBar = navToolbar
                    	break;
                    	}
                    	     
                    	     // Switch Active Map
                    	
                    	case "Street":
                    	    {                        
                    	     MapServices.url = "http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer"; 
                    	      break;                    
                    	    }
                    	case "Topo":
                    	    {                        
                    	     MapServices.url = "http://server.arcgisonline.com/ArcGIS/rest/services/NGS_Topo_US_2D/MapServer"; 
                    	      break;                    
                    	    }
                    	case "Imagery":
                    	    {                        
                    	     MapServices.url = "http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_Imagery_World_2D/MapServer"; 
                    	      break;                    
                    	    }
                    	    
                    	   // Active Drawing Tool
                        case "Point":
                           {                        
                            navToolbar.deactivate();
                            drawToolbar.activate(Draw.MAPPOINT);
                            break;                    
                           }                    
                       case "Polyline":
                           {
                            navToolbar.deactivate();                        
                            drawToolbar.activate(Draw.POLYLINE);
                            break;                    
                           }                    
                       case "FreeHand Polyline":                    
                     	  {                        
                     	   navToolbar.deactivate(); 
                     	   drawToolbar.activate(Draw.FREEHAND_POLYLINE);                      
                     	   break;                    
                     	  }                    
                       case "Polygon":                    
                     	  {                        
                     	   navToolbar.deactivate(); 
                     	   drawToolbar.activate(Draw.POLYGON);                       
                     	  break;                    
                     	  }                    
                       case "Freehand Polygon":                   
                     	   {                        
                     	   navToolbar.deactivate(); 
                     	   drawToolbar.activate(Draw.FREEHAND_POLYGON);                       
                     	   break;                    
                     	   } 
                       case "Erase":                   
                     	   {                        
                     	  	myGraphicsLayer.clear();                  
                     	   break;                    
                     	   } 
                     	   
                     	  // Printing 
                      case "Print (fit on page)":                    
                     	  {                        
                     	   doPrint(FlexPrintJobScaleType.SHOW_ALL);             
                     	  break;                    
                     	  }                    
                      case "Print (No Scaling)":                   
                     	   {                        
                     	   doPrint(FlexPrintJobScaleType.NONE);               
                     	   break;                    
                     	   }  
                     	   
                     	   // Styles
                     case "Custom Styles":                   
                     	   {                        
                     	   FlexSpy.show();          
                     	   break;                    
                     	   }  
                     	                                   
                    }
             }
             
             private function showPopUp(layer:Layer,map:Map):void
             {
             	var win:DragWindow;
				win=DragWindow(PopUpManager.createPopUp(this,DragWindow,false));
				win.myLayer = layer;
				win.x = map.width - 250
			 }
             
     