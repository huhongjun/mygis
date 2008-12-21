/**
 * 
 */
package com.nbw.svg.DyChart.ajax;
import java.util.Random;
/**
 * @author robertpi
 *
 */
public class MeterRemote {
	
	private double curr_value,full_value=200;
	
	public double getDegree(){
	Random r=new Random();
	curr_value=r.nextInt(200);
	
	return 	curr_value/full_value*270;
	}

}
