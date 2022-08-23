package requests;

public class RequestValidator {
	protected static boolean validatePattern(String pattern) {
		//TODO: check if pattern is valid by regex
		if(pattern != null | pattern.length() != 25) {
			return true;
		}
		return false;
	}
	
	protected static boolean validateSolution(boolean solveable, String[] solutionCells, String[] solutionTypes) {
		//TODO: validate solution: null + regex
		return true;
	}
}
