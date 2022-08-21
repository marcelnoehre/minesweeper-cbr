package cbr;

import java.net.URLDecoder;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import de.dfki.mycbr.util.Pair;
import minesweeper.Case;
import minesweeper.Pattern;
import minesweeper.Solution;

public class CBRUtils {
	
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
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected static String getCaseListAsJson(ArrayList<Pair<Case, Double>> caseList) {
		//TODO: check if this works
		JSONObject jsonContainer = new JSONObject();
		JSONArray jsonCaseList = new JSONArray();
		for(Pair caseElement : caseList) {
			JSONObject jsonCase = new JSONObject();
			int i = 0;
			for(String attribute : CBRUtils.getCaseArray((Case)caseElement.getFirst())) {
				if(CBRConstants.ATTRIBUTE_NAMES[i].equals("SolutionCells") || CBRConstants.ATTRIBUTE_NAMES[i].equals("SolutionTypes")) {
					JSONArray jsonSolutionArray = new JSONArray();
					String[] solutionArray = attribute.split(CBRConstants.SOLUTION_SEPERATOR);
					for(String solution : solutionArray) {
						jsonSolutionArray.add(solution);
					}
					jsonCase.put(CBRConstants.ATTRIBUTE_NAMES[i], jsonSolutionArray);
				} else {
					jsonCase.put(CBRConstants.ATTRIBUTE_NAMES[i], attribute);
				}
				i++;
			}
			jsonCaseList.add(jsonCase);
		}
		jsonContainer.put("CaseList", jsonCaseList);
		return jsonContainer.toJSONString();
	}
	
	protected static Case createDefaultCase() {
		String name = "CCCCCCCCCCCCCCCCCCCCCCCCC";
		Pattern pattern = new Pattern(name.toCharArray());
		Solution solution = new Solution(false, "", "");
		return new Case(name, pattern, solution);
	}
	
	protected static String[] createCsvHeader() {
		return "Center,InnerTopLeft,InnerTop,InnerTopRight,InnerRight,InnerBottomRight,InnerBottom,InnerBottomLeft,InnerLeft,OuterTopLeftCorner,OuterTopLeft,OuterTop,OuterTopRight,OuterTopRightCorner,OuterRightTop,OuterRight,OuterRightBottom,OuterBottomRightCorn,OuterBottomRight,OuterBottom,OuterBottomLeft,OuterBottomLeftCorn,OuterLeftBottom,OuterLeft,OuterLeftTop,Solveable,SolutionCells,SolutionTypes".split(CBRConstants.CSV_SEPERATOR);
	}
	
	protected static String transformSolution(String[] arr) {
        String transformation = "";
        if(arr.length > 0) {
	        for(String element : arr) {
	        	transformation += element + CBRConstants.SOLUTION_SEPERATOR;
	        }
	        transformation = transformation.substring(0, transformation.length() - 1);
        }
        return transformation;
	}
	
	protected static String[] getCaseArray(Case caseElement) {
		String[] caseArray = new String[CBRConstants.ATTRIBUTES_AMOUNT];
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
	
	protected static Case getCaseFromJsonObject(JSONObject jsonCase) {
		//TODO: check if this works
		int i = 0;
		String[] caseArray = new String[CBRConstants.ATTRIBUTES_AMOUNT];
		for(String attributeName : CBRConstants.ATTRIBUTE_NAMES) {
			caseArray[i] = (String) jsonCase.get(attributeName);
		}
		return new Case(caseArray);		
	}
}