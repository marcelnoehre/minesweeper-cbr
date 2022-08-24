package requests;

import utils.Constants;

public class RequestValidator {
	protected static boolean validatePattern(String pattern) {
		if(pattern != null | pattern.matches(Constants.PATTERN_REGEX)) {
			return true;
		}
		return false;
	}
	
	protected static boolean validateSolution(String solveable, String solutionCells, String solutionTypes) {
		if(solveable.equals("True") || solveable.equals("False")) {
			//TODO: check if solutionCells valid -> regex
			//TODO: split solution types check if codes are all valid -> list
		}
		return true;
	}
}
