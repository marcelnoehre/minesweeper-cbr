package requests;

public class RequestHandler {
	public static void addCase(String pattern, boolean solveable, String[] solutionCells, String[] solutionTypes) {
		RequestValidator.validatePattern(pattern);
		RequestValidator.validateSolution(solveable, solutionCells, solutionTypes);
		//TODO: check for project
		//TODO: add case
	}
	
	public static void upadteCase(String pattern, boolean solveable, String[] solutionCells, String[] solutionTypes) {
		RequestValidator.validatePattern(pattern);
		RequestValidator.validateSolution(solveable, solutionCells, solutionTypes);
		//TODO: check for project
		//TODO: remove old case
		//TODO: add new Case
	}
	
	public static void removeCase(String pattern) {
		RequestValidator.validatePattern(pattern);
		//TODO: check for project
		//TODO: check for case
		//TODO: remove case
	}
	
	public static void getSolution(String pattern) {
		RequestValidator.validatePattern(pattern);
		//TODO: check for project
		//TODO: getSolution
	}
	
	public static void initializeBackend() {
		//TODO: check for Project
		//TODO: initialize CBR Project
	}
}
