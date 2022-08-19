package cbr;

import java.net.URLDecoder;

import minesweeper.Case;
import minesweeper.Pattern;
import minesweeper.Solution;

public class CBRUtils {
	protected static final String CSV_SEPERATOR = ",";
	protected static final String SOLUTION_SEPERATOR = "#";
	
	protected String getPath() {
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
	
	protected static Case createDefaultCase() {
		String name = "CCCCCCCCCCCCCCCCCCCCCCCCC";
		Pattern pattern = new Pattern(
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C", 
				"C");
		Solution solution = new Solution(false, new String[0], new String[0]);
		return new Case(name, pattern, solution);
	}
	
	protected static Case createCaseObject(String[] caseArr) {
		Pattern pattern = new Pattern(
			caseArr[0], 
			caseArr[1], 
			caseArr[2], 
			caseArr[3], 
			caseArr[4], 
			caseArr[5], 
			caseArr[6], 
			caseArr[7], 
			caseArr[8], 
			caseArr[9], 
			caseArr[10], 
			caseArr[11], 
			caseArr[12], 
			caseArr[13], 
			caseArr[14], 
			caseArr[15], 
			caseArr[16], 
			caseArr[17], 
			caseArr[18], 
			caseArr[19], 
			caseArr[20], 
			caseArr[21], 
			caseArr[22], 
			caseArr[23], 
			caseArr[24]
		);
        Solution solution = new Solution(
			Boolean.parseBoolean(caseArr[25]), 
			caseArr[26].split(SOLUTION_SEPERATOR),
			caseArr[27].split(SOLUTION_SEPERATOR)
		);
		String caseName = "";
		for(int j = 0; j < 25; j++) {
			caseName += caseArr[j];
		}
		return new Case(caseName, pattern, solution);
	}
	
	protected static String[] createCsvHeader() {
		return "Center,InnerTopLeft,InnerTop,InnerTopRight,InnerRight,InnerBottomRight,InnerBottom,InnerBottomLeft,InnerLeft,OuterTopLeftCorner,OuterTopLeft,OuterTop,OuterTopRight,OuterTopRightCorner,OuterRightTop,OuterRight,OuterRightBottom,OuterBottomRightCorn,OuterBottomRight,OuterBottom,OuterBottomLeft,OuterBottomLeftCorn,OuterLeftBottom,OuterLeft,OuterLeftTop,Solveable,SolutionCells,SolutionTypes".split(CSV_SEPERATOR);
	}
	
	protected static String transformSolution(String[] arr) {
        String transformation = "";
        for(String element : arr) {
        	transformation += element + CBRUtils.SOLUTION_SEPERATOR;
        }
        transformation = transformation.substring(0, transformation.length()-1);
        return transformation;
	}
	
	protected static String[] getCaseArray(Case caseElement) {
		String[] caseArray = new String[CBRProject.ATTRIBUTES_AMOUNT];
		caseArray[0] = caseElement.getPattern().getCenter();
		caseArray[1] = caseElement.getPattern().getInnerTopLeft();
		caseArray[2] = caseElement.getPattern().getInnerTop();
		caseArray[3] = caseElement.getPattern().getInnerTopRight();
		caseArray[4] = caseElement.getPattern().getInnerRight();
		caseArray[5] = caseElement.getPattern().getInnerBottomRight();
		caseArray[6] = caseElement.getPattern().getInnerBottom();
		caseArray[7] = caseElement.getPattern().getInnerBottomLeft();
		caseArray[8] = caseElement.getPattern().getInnerLeft();
		caseArray[9] = caseElement.getPattern().getOuterTopLeftCorner();
		caseArray[10] = caseElement.getPattern().getOuterTopLeft();
		caseArray[11] = caseElement.getPattern().getOuterTop();
		caseArray[12] = caseElement.getPattern().getOuterTopRight();
		caseArray[13] = caseElement.getPattern().getOuterTopRightCorner();
		caseArray[14] = caseElement.getPattern().getOuterRightTop();
		caseArray[15] = caseElement.getPattern().getOuterRight();
		caseArray[16] = caseElement.getPattern().getOuterRightBottom();
		caseArray[17] = caseElement.getPattern().getOuterBottomRightCorner();
		caseArray[18] = caseElement.getPattern().getOuterBottomRight();
		caseArray[19] = caseElement.getPattern().getOuterBottom();
		caseArray[20] = caseElement.getPattern().getOuterBottomLeft();
		caseArray[21] = caseElement.getPattern().getOuterBottomLeftCorner();
		caseArray[22] = caseElement.getPattern().getOuterLeftBottom();
		caseArray[23] = caseElement.getPattern().getOuterLeft();
		caseArray[24] = caseElement.getPattern().getOuterLeftTop();
		caseArray[25] = caseElement.getSolution().getSolveable() ? "True" : "False";
		caseArray[26] = transformSolution(caseElement.getSolution().getCells());
		caseArray[27] = transformSolution(caseElement.getSolution().getTypes());
		return caseArray;
	}
}
