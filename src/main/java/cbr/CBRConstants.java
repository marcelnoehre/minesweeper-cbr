package cbr;

/**
 * 
 * @author Marcel N&ouml;, 357775
 *
 */
public class CBRConstants {
	
	/**
	 * The name of the CBR project.
	 */
	protected static final String NAME = "MinesweeperPattern.prj";
	
	/**
	 * The amount of all attributes a case has.
	 */
	protected static final int ATTRIBUTES_AMOUNT = 28;
	
	/**
	 * The amount of cells that a pattern has.
	 */
	public static final int CELLS_AMOUNT = 25;

	/**
	 * The amount of solution elements a case has;
	 */
	public static final int SOLUTION_AMOUNT = 3;
	
	/**
	 * The amount of result that a query produces.
	 */
	protected static final int RESULT_AMOUNT = 10;
	
	/**
	 * The set of attribute names that a case of the case base has.
	 */
	protected static final String[] ATTRIBUTE_NAMES = new String[] {
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
	protected static final String CSV_SEPERATOR = ",";
	
	/**
	 * The character used to separate the values in a solution string.
	 */
	public static final String SOLUTION_SEPERATOR = "#";
}
