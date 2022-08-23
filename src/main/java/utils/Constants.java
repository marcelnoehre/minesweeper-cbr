package utils;

import java.net.URLDecoder;

public class Constants {
	
	/**
	 * The name of the CBR project.
	 */
	public static final String PROJECT_NAME = "MinesweeperPattern.prj";
	
	/**
	 * The amount of all attributes a case has.
	 */
	public static final int ATTRIBUTES_AMOUNT = 28;
	
	/**
	 * The amount of cells that a pattern has.
	 */
	public static final int CELL_ATTRIBUTES_AMOUNT = 25;

	/**
	 * The amount of solution elements a case has;
	 */
	public static final int SOLUTION_ATTRIBUTES_AMOUNT = 3;
	
	/**
	 * The amount of result that a query produces.
	 */
	public static final int RESULT_ATTRIBTUES_AMOUNT = 5;
	
	/**
	 * The minimum similarity to include the case in the query result.
	 */
	public static final double MINIMUM_SIMILARITY = 0.9;
	
	/**
	 * The set of attribute names that a case of the case base has.
	 */
	public static final String[] ATTRIBUTE_NAMES = new String[] {
			//center
			"Center",					//22
			//inner ring
			"InnerTopLeft",				//11
			"InnerTop",					//21
			"InnerTopRight",			//31
			"InnerRight",				//32
			"InnerBottomRight",			//33
			"InnerBottom",				//23
			"InnerBottomLeft",			//13
			"InnerLeft",				//12
			//outer ring
			"OuterTopLeftCorner", 		//00
			"OuterTopLeft", 			//10
			"OuterTop",					//20
			"OuterTopRight", 			//30
			"OuterTopRightCorner",		//40
			"OuterRightTop", 			//41
			"OuterRight", 				//42
			"OuterRightBottom", 		//43
			"OuterBottomRightCorner",	//44
			"OuterBottomRight", 		//34
			"OuterBottom", 				//24
			"OuterBottomLeft",			//14
			"OuterBottomLeftCorner",	//04
			"OuterLeftBottom", 			//03
			"OuterLeft", 				//02
			"OuterLeftTop",				//01
			//solution
			"Solvability",
			"SolutionCells",					
			"SolutionTypes"
	};
	
	/**
	 * The character used to separate the values in a csv file.
	 */
	public static final String CSV_SEPERATOR = ",";
	
	/**
	 * The character used to separate the values in a solution string.
	 */
	public static final String SOLUTION_SEPERATOR = "#";
	
	/**
	 * Creates the path to the resources storage.
	 * 
	 * @return The path to the resources storage
	 */
	public String getPath() {
		String path = "";
		try {
		path = this.getClass().getClassLoader().getResource("").getPath();
        String encodedPath = URLDecoder.decode(path, "UTF-8");
        String pathArr[] = encodedPath.split("classes/");
        path = pathArr[0] + "resources/";
        path = path.replace("/", "\\");
		} catch(Exception e) {
			System.err.println("Path Problem!");
		}
		return path;
	}

}
