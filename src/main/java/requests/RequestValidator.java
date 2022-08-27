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
			if(!solutionCells.equals("")) {
				if(solutionCells.length() == 2) {
					if(!Arrays.stream(Constants.SOLUTION_COORDINATES).anyMatch(solutionCells::equals)) {
						return false;
					}
					if(!Arrays.stream(Constants.SOLUTION_TYPES).anyMatch(solutionTypes::equals)) {
						return false;
					}
				} else {
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
				}
			} else {
				if(!solutionTypes.equals("")) {
					return false;
				}
			}
		} else {
			return false;
		}
		return true;
	}
}
