package requests;

import java.util.Arrays;

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
			for(String solutionCell: solutionCells.split(Constants.SOLUTION_SEPERATOR)) {
				if(!Arrays.stream(Constants.SOLUTION_COORDINATES).anyMatch(solutionCell::equals)) {
					return false;
				}
			}
			for(String solutionType : solutionTypes.split(Constants.SOLUTION_SEPERATOR)) {
				if(!Arrays.stream(Constants.SOLUTION_TYPES).anyMatch(solutionType::equals)) {
					return false;
				}
			}
		} else {
			return false;
		}
		return true;
	}
}
