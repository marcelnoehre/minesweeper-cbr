package cbr;

import java.net.URLDecoder;

import minesweeper.Case;
import minesweeper.Pattern;
import minesweeper.Solution;

public class CBRUtils {
	protected static final String CSV_SEPARATOR = ",";
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
	
	protected static String transformStringArray(String[] arr) {
        String transformation = "";
        for(String element : arr) {
        	transformation += element + CBRUtils.SOLUTION_SEPERATOR;
        }
        transformation = transformation.substring(0, transformation.length()-1);
        return transformation;
	}
}
