package cbr;

import java.io.FileNotFoundException;
import java.io.IOException;

import minesweeper.Case;
import minesweeper.Pattern;
import minesweeper.Solution;

import utils.Constants;
import utils.Imports;

/**
*
* Handle CBR functionalities.
*
* @author Marcel N&ouml;hre, 357775
*
*/
public class CBRAgent {
	
	/**
	 * The active CBR project.
	 */
	protected static CBRProject project;
	
	/**
	 * Sets the active CBR project.
	 * 
	 * @return The active project
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static boolean project() throws FileNotFoundException, IOException {
		if(project == null) {
			project = new CBRProject();
			System.out.println("Reading CaseBase.csv ...");
			project.addCaseList(Imports.importCasesFromCsv(new Constants().getPath() + "CaseBase.csv"));
			return false;
		}
		return true;
	}
	
	/**
	 * Check if a case exists.
	 * 
	 * @param pattern The pattern of the case
	 * @return	Wether the case exists in the case base
	 */
	public static boolean checkForCase(String pattern) {
		return project.checkForCase(pattern);
	}
	
	/**
	 * Get a case from the case base.
	 * 
	 * @param pattern The pattern of the case
	 * @return	The case found in the case base
	 */
	public static Case getCase(String pattern) {
		return project.getCase(pattern);
	}
	
	/**
	 * Add a case to the case base.
	 * 
	 * @param newCase The new case instance to add to the case base
	 * @throws Exception
	 */
	public static void addCase(Case newCase) throws Exception {
		project.addCase(newCase);
	}
	
	/**
	 * Remove a case from the case base.
	 * 
	 * @param pattern The pattern of the case to remove
	 */
	public static boolean removeCase(String pattern) {
		return project.removeCase(pattern);
	}
	
	/**
	 * Find the most similar case for a problem.
	 * 
	 * @param queryString The problem to find a solution for
	 * @return	The solution found for the problem
	 */
	public static String caseQuery(String queryString) {
		Case problemCase = new Case(queryString, new Pattern(queryString.toCharArray()), new Solution());
		return project.caseQuery(problemCase);
	}
}
