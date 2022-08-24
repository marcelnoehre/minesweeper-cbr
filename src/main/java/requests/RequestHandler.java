package requests;

import cbr.CBRAgent;
import minesweeper.Case;
import utils.Constants;
import utils.Exports;
import utils.Transform;

public class RequestHandler {
	public static void initializeBackend() {
		System.out.println("\n---INITIALIZE BACKEND---");
		try {
			if(CBRAgent.project()) {
				System.out.println("Already initialized!\n");
			}
		} catch(Exception e) {
			System.out.println("Initializing project failed... restart minesweeper-cbr-backend!\n");
		}
	}
	
	public static boolean addCase(String pattern, String solveable, String solutionCells, String solutionTypes) {
		System.out.println("---ADD CASE---");
		System.out.print("Checking input...");
		if(
		RequestValidator.validatePattern(pattern) &&
		RequestValidator.validateSolution(solveable, solutionCells, solutionTypes)
		) {
			
			System.out.println(" Valid!");
			try {
				System.out.print("Adding Case " + pattern + " to case base...");
				CBRAgent.project();
				Case newCase = Transform.apiInputToCase(pattern, solveable.equals("True"), solutionCells.split(Constants.SOLUTION_SEPERATOR), solutionTypes.split(Constants.SOLUTION_SEPERATOR));
				CBRAgent.addCase(newCase);
				System.out.println(" Success!");
				try {
					System.out.print("Adding Case " + pattern + " to CaseBase.csv...");
					Exports.addCaseToCSV(Transform.caseToStringArray(newCase));
					System.out.println(" Success!\n");
				} catch(Exception e) {
					System.out.println(" Failed!\n");
				}
			} catch(Exception e) {
				System.out.println(" Failed!\n");
			}
			return true;
		}
		System.out.println(" Invalid!\n");
		return false;
	}
	
	public static boolean updateCase(String pattern, String solveable, String solutionCells, String solutionTypes) {
		System.out.println("---UPDATE CASE---");
		System.out.print("Checking input...");
		if(
		RequestValidator.validatePattern(pattern) &&
		RequestValidator.validateSolution(solveable, solutionCells, solutionTypes)
		) {
			System.out.println(" Valid!");
			try {
				System.out.print("Updating Case " + pattern + " in the case base...");
				CBRAgent.project();
				CBRAgent.removeCase(pattern);
				Case newCase = Transform.apiInputToCase(pattern, solveable.equals("True"), solutionCells.split(Constants.SOLUTION_SEPERATOR), solutionTypes.split(Constants.SOLUTION_SEPERATOR));
				CBRAgent.addCase(newCase);
				System.out.println(" Success!");
				try {
					System.out.print("Updating Case " + pattern + " at CaseBase.csv...");
					Exports.removeCaseFromCSV(pattern);
					Exports.addCaseToCSV(Transform.caseToStringArray(newCase));
					System.out.println(" Success!\n");
				} catch(Exception e) {
					System.out.println(" Failed!\n");
				}
			} catch(Exception e) {
				//TODO: store old case if adding new one fails
				System.out.println(" Failed!\n");
			}
			return true;
		}
		System.out.println(" Invalid!\n");
		return false;
	}
	
	public static boolean removeCase(String pattern) {
		System.out.println("---REMOVE CASE---");
		System.out.print("Checking input...");
		if(RequestValidator.validatePattern(pattern)) {
			System.out.println(" Valid!");
			try {
				System.out.print("Removing Case " + pattern + " from the case base...");
				CBRAgent.project();
				CBRAgent.removeCase(pattern);
				System.out.println(" Success!");
				try {
					System.out.print("Removing Case " + pattern + " from CaseBase.csv...");
					Exports.removeCaseFromCSV(pattern);
					System.out.println(" Success!\n");
				} catch(Exception e) {
					System.out.println(" Failed!\n");
				}
			} catch (Exception e) {
				System.out.println(" Failed!\n");
			}
			return true;
		}
		System.out.println(" Invalid!\n");
		return false;
	}
	
	public static String getSolution(String pattern) {
		System.out.println("---GET SOLUTION---");
		System.out.print("Checking input...");
		String result = "";
		if(RequestValidator.validatePattern(pattern)) {
			System.out.println(" Valid!");
			try {
				CBRAgent.project();
				result = CBRAgent.caseQuery(pattern);
			} catch(Exception e) {
				result = "{}";
			}
			return result;
		}
		System.out.println(" Invalid!\n");
		return "";
	}
}
