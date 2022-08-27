package requests;

import java.io.IOException;

import cbr.CBRAgent;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
	
	public static void addCase(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("---ADD CASE---");
		String pattern = request.getParameter("pattern");
		String solvability = request.getParameter("solvability");
		String solutionCells = request.getParameter("solutionCells");
		String solutionTypes = request.getParameter("solutionTypes");
		response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		System.out.print("Checking input...");
		if(
		RequestValidator.validatePattern(pattern) &&
		RequestValidator.validateSolution(solvability, solutionCells, solutionTypes)
		) {
			System.out.println(" Valid!");
			if(!CBRAgent.checkForCase(pattern)) {
				try {
					System.out.print("Adding Case " + pattern + " to case base...");
					CBRAgent.project();
					Case newCase = Transform.apiInputToCase(pattern, solvability.equals("True"), solutionCells.split(Constants.SOLUTION_SEPERATOR), solutionTypes.split(Constants.SOLUTION_SEPERATOR));
					CBRAgent.addCase(newCase);
					System.out.println(" Success!");
					try {
						System.out.print("Adding Case " + pattern + " to CaseBase.csv...");
						Exports.addCaseToCSV(Transform.caseToStringArray(newCase), new Constants().getPath() + "CaseBase.csv");
						System.out.println(" Success!\n");
					} catch(Exception e) {
						System.out.println(" Failed!\n");
					}
				} catch(Exception e) {
					System.out.println(" Failed!\n");
				}
				try {
					response.getOutputStream().println("{}");
				} catch (IOException e) {
				}
			} else {
				System.out.println("Case " + pattern + " already exists!\n");
				try {
					response.sendError(250, "Case " + pattern + " already exists");
				} catch (IOException e) {
				}
			}
		}
		System.out.println(" Invalid!\n");
		try {
			response.sendError(400, "Bad Request");
		} catch (IOException e) {
		}
	}
	
	public static void updateCase(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("---UPDATE CASE---");
		String pattern = request.getParameter("pattern");
		String solveable = request.getParameter("solveable");
		String solutionCells = request.getParameter("solutionCells");
		String solutionTypes = request.getParameter("solutionTypes");
		response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		System.out.print("Checking input...");
		if(
		RequestValidator.validatePattern(pattern) &&
		RequestValidator.validateSolution(solveable, solutionCells, solutionTypes)
		) {
			System.out.println(" Valid!");
			Case dataStorage = null;
			if(CBRAgent.checkForCase(pattern)) {
				try {
					System.out.print("Updating Case " + pattern + " in the case base...");
					CBRAgent.project();
					dataStorage = CBRAgent.getCase(pattern);
					CBRAgent.removeCase(pattern);
					Case newCase = Transform.apiInputToCase(pattern, solveable.equals("True"), solutionCells.split(Constants.SOLUTION_SEPERATOR), solutionTypes.split(Constants.SOLUTION_SEPERATOR));
					CBRAgent.addCase(newCase);
					System.out.println(" Success!");
					try {
						System.out.print("Updating Case " + pattern + " at CaseBase.csv...");
						Exports.removeCaseFromCSV(pattern, new Constants().getPath() + "CaseBase.csv");
						Exports.addCaseToCSV(Transform.caseToStringArray(newCase), new Constants().getPath() + "CaseBase.csv");
						System.out.println(" Success!\n");
					} catch(Exception e) {
						System.out.println(" Failed!\n");
					}
				} catch(Exception e) {
					try {
						CBRAgent.addCase(dataStorage);
					} catch (Exception e1) {
					}
					System.out.println(" Failed!\n");
				}
				try {
					response.getOutputStream().println("{}");
				} catch (IOException e) {
				}
			} else {
				System.out.println("Case " + pattern + " does not exist!\n");
				try {
					response.sendError(250, "Case " + pattern + " does not exist");
				} catch (IOException e) {
				}
			}
		}
		System.out.println(" Invalid!\n");
		try {
			response.sendError(400, "Bad Request");
		} catch (IOException e) {
		}
	}
	
	public static void removeCase(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("---REMOVE CASE---");
		String pattern = request.getParameter("pattern");
		response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		System.out.print("Checking input...");
		if(RequestValidator.validatePattern(pattern)) {
			System.out.println(" Valid!");
			if(CBRAgent.checkForCase(pattern)) {
				try {
					System.out.print("Removing Case " + pattern + " from the case base...");
					CBRAgent.project();
					CBRAgent.removeCase(pattern);
					System.out.println(" Success!");
					try {
						System.out.print("Removing Case " + pattern + " from CaseBase.csv...");
						Exports.removeCaseFromCSV(pattern, new Constants().getPath() + "CaseBase.csv");
						System.out.println(" Success!\n");
					} catch(Exception e) {
						System.out.println(" Failed!\n");
					}
				} catch (Exception e) {
					System.out.println(" Failed!\n");
				}
				try {
					response.getOutputStream().println("{}");
				} catch (IOException e) {
				}
			} else {
				System.out.println("Case " + pattern + " does not exist!\n");
				try {
					response.sendError(250, "Case " + pattern + " does not exist");
				} catch (IOException e) {
				}
			}
		}
		System.out.println(" Invalid!\n");
		try {
			response.sendError(400, "Bad Request");
		} catch (IOException e) {
		}
	}
	
	public static void getSolution(HttpServletRequest request, HttpServletResponse response) {
		System.out.println("---GET SOLUTION---");
		String pattern = request.getParameter("pattern");
		response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		System.out.print("Checking input...");
		if(RequestValidator.validatePattern(pattern)) {
			System.out.println(" Valid!");
			try {
				CBRAgent.project();
				response.getOutputStream().println(CBRAgent.caseQuery(pattern));
			} catch(Exception e) {
				try {
					response.sendError(500, "Internal Server Error ");
				} catch (IOException e1) {
				}
			}
		} else {
			System.out.println(" Invalid!\n");
			try {
				response.sendError(400, "Bad Request");
			} catch (IOException e) {
			}
		}
	}
}
