package requests;

import cbr.CBRAgent;

public class RequestHandler {
	public static boolean addCase(String pattern, boolean solveable, String[] solutionCells, String[] solutionTypes) {
		if(
		RequestValidator.validatePattern(pattern) &&
		RequestValidator.validateSolution(solveable, solutionCells, solutionTypes)
		) {
			CBRAgent.initializeCBR();
			//TODO: newCase = utils -> create case
//			CBRAgent.addCase(newCase);
			return true;
		}
		return false;
	}
	
	public static boolean upadteCase(String pattern, boolean solveable, String[] solutionCells, String[] solutionTypes) {
		if(
		RequestValidator.validatePattern(pattern) &&
		RequestValidator.validateSolution(solveable, solutionCells, solutionTypes)
		) {
			CBRAgent.initializeCBR();
			CBRAgent.removeCase(pattern);
			//TODO: newCase = utils -> create case
//			CBRAgent.addCase(newCase);
			return true;
		}
		return false;
	}
	
	public static boolean removeCase(String pattern) {
		if(RequestValidator.validatePattern(pattern)) {
			CBRAgent.initializeCBR();
			CBRAgent.removeCase(pattern);
			return true;
		}
		return false;
	}
	
	public static String getSolution(String pattern) {
		if(RequestValidator.validatePattern(pattern)) {
			CBRAgent.initializeCBR();
			return CBRAgent.getSolution(pattern);
		}
		return "{}";
	}
	
	public static void initializeBackend() {
		CBRAgent.initializeCBR();
	}
}
