package utils;

import java.net.URLDecoder;

import minesweeper.Case;
import minesweeper.Pattern;
import minesweeper.Solution;

public class Constants {
	
	/**
	 * The name of the CBR project.
	 */
	public static final String PROJECT_NAME = "MinesweeperPattern.prj";
	
	/**
	 * The regex to validate a pattern.
	 */
	public static final String PATTERN_REGEX = "[0-8|C|M|B]{25}";
	
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
	public static final double MINIMUM_SIMILARITY = 0.925;
	
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
	
	public static final String[] SOLUTION_TYPES = new String[] {
			"MINES.REVEALED",
			"MINES.FLAGGED",
			"WRONG.FLAG",
			"SUSPICIOUS.FLAG",
			"COVERED.AMOUNT"
	};
	
	public static final String[] SOLUTION_COORDINATES = new String[] {
			"11", "12", "13", "21", "22", "23", "31", "32", "33"
	};
	
	/**
	 * The default case when all cells of the 5x5 field are covered.
	 */
	public static final Case DEFAULT_CASE = new Case("CCCCCCCCCCCCCCCCCCCCCCCCC", new Pattern("CCCCCCCCCCCCCCCCCCCCCCCCC".toCharArray()), new Solution(false, "", ""));
	
	/**
	 * The character used to separate the values in a csv file.
	 */
	public static final String CSV_SEPERATOR = ",";
	
	/**
	 * The character used to separate the values in a solution string.
	 */
	public static final String SOLUTION_SEPERATOR = "#";
	
	/**
	 * The header of a csv file for the case objects.
	 */
	public static final String CSV_HEADER[] = "Center,InnerTopLeft,InnerTop,InnerTopRight,InnerRight,InnerBottomRight,InnerBottom,InnerBottomLeft,InnerLeft,OuterTopLeftCorner,OuterTopLeft,OuterTop,OuterTopRight,OuterTopRightCorner,OuterRightTop,OuterRight,OuterRightBottom,OuterBottomRightCorn,OuterBottomRight,OuterBottom,OuterBottomLeft,OuterBottomLeftCorn,OuterLeftBottom,OuterLeft,OuterLeftTop,Solveable,SolutionCells,SolutionTypes".split(Constants.CSV_SEPERATOR);
	
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
        String pathArr[] = encodedPath.split(".metadata/");
        path = pathArr[0] + "minesweeper-cbr-backend/src/main/webapp/WEB-INF/resources/";
        path = path.replace("/", "\\");
		} catch(Exception e) {
			System.err.println("Path Problem!");
		}
		return path;
	}
}
