package cbr;

import java.net.URLDecoder;

import minesweeper.Case;
import minesweeper.Pattern;
import minesweeper.Solution;

public class CBRUtils {
	protected String getPath() {
		String path = "";
		try {
		path = this.getClass().getClassLoader().getResource("").getPath();
        String encodedPath = URLDecoder.decode(path, "UTF-8");
        String pathArr[] = encodedPath.split(".metadata/.plugins/org.eclipse.wst.server.core/tmp0/wtpwebapps/minesweeper-cbr-backend/WEB-INF/classes/");
        path = pathArr[0] + "minesweeper-cbr-backend/src/main/resources/";
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
}
