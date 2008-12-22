// ActionScript file
 private function doPrint(myFlexPrintJobScaleType:String):void
   {	
    // Create an instance of the FlexPrintJob class.
    var myPrintJob:FlexPrintJob = new FlexPrintJob();
    
    // Start the print job.                
    if (myPrintJob.start())                
    	{                   
    		try
    		   {                        
    		    // hide the zoom slider so it won't be printed
    		    MainMap.zoomSliderVisible = false; 
    		                                                   
    		    // Add the panel to print.                        
    		    myPrintJob.addObject(MainPanel, myFlexPrintJobScaleType);
    		                                         
    		    // turn the zoom slider back on                        
    		    MainMap.zoomSliderVisible = true;                    
    		    }                    
    		catch (e:Error)                    
    			{                        
    			// Handle error,                       
    			 Alert.show( e.toString() );                    
    			 }                    
    			 // Send the job to the printer. 
    			 myPrintJob.send();                
      }            
   }