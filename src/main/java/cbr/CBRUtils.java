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
		String name = "ccccccccccccccccccccccccc";
		Pattern pattern = new Pattern(
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c");
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
	
	protected static String[] createCsvCase(Case caseElement) {
		String[] csvCase = new String[CBRProject.ATTRIBUTES_AMOUNT];
		csvCase[0] = caseElement.getPattern().getCenter();
		csvCase[1] = caseElement.getPattern().getInnerTopLeft();
		csvCase[2] = caseElement.getPattern().getInnerTop();
		csvCase[3] = caseElement.getPattern().getInnerTopRight();
		csvCase[4] = caseElement.getPattern().getInnerRight();
		csvCase[5] = caseElement.getPattern().getInnerBottomRight();
		csvCase[6] = caseElement.getPattern().getInnerBottom();
		csvCase[7] = caseElement.getPattern().getInnerBottomLeft();
		csvCase[8] = caseElement.getPattern().getInnerLeft();
		csvCase[9] = caseElement.getPattern().getOuterTopLeftCorner();
		csvCase[10] = caseElement.getPattern().getOuterTopLeft();
		csvCase[11] = caseElement.getPattern().getOuterTop();
		csvCase[12] = caseElement.getPattern().getOuterTopRight();
		csvCase[13] = caseElement.getPattern().getOuterTopRightCorner();
		csvCase[14] = caseElement.getPattern().getOuterRightTop();
		csvCase[15] = caseElement.getPattern().getOuterRight();
		csvCase[16] = caseElement.getPattern().getOuterRightBottom();
		csvCase[17] = caseElement.getPattern().getOuterBottomRightCorner();
		csvCase[18] = caseElement.getPattern().getOuterBottomRight();
		csvCase[19] = caseElement.getPattern().getOuterBottom();
		csvCase[20] = caseElement.getPattern().getOuterBottomLeft();
		csvCase[21] = caseElement.getPattern().getOuterBottomLeftCorner();
		csvCase[22] = caseElement.getPattern().getOuterLeftBottom();
		csvCase[23] = caseElement.getPattern().getOuterLeft();
		csvCase[24] = caseElement.getPattern().getOuterLeftTop();
		csvCase[25] = caseElement.getSolution().getSolveable() ? "True" : "False";
		csvCase[26] = transformSolution(caseElement.getSolution().getCells());
		csvCase[27] = transformSolution(caseElement.getSolution().getTypes());
		return csvCase;
	}
	
	
	
	protected static String transformSolution(String[] arr) {
        String transformation = "";
        for(String element : arr) {
        	transformation += element + CBRUtils.SOLUTION_SEPERATOR;
        }
        transformation = transformation.substring(0, transformation.length()-1);
        return transformation;
	}
}
