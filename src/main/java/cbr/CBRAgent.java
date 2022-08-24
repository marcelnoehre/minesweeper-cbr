package cbr;

import java.io.FileNotFoundException;
import java.io.IOException;

import minesweeper.Case;
import minesweeper.Pattern;
import minesweeper.Solution;

import utils.Constants;
import utils.Imports;

public class CBRAgent {
	protected static CBRProject project;
	
	public static boolean project() throws FileNotFoundException, IOException {;
		if(project == null) {
			project = new CBRProject();
			System.out.println("Reading CaseBase.csv ...");
			project.addCaseList(Imports.importCasesFromCsv(new Constants().getPath() + "CaseBase.csv"));
			return false;
		}
		return true;
	}
	
	public static boolean checkForCase(String pattern) {
		return project.checkForCase(pattern);
	}
	
	public static void addCase(Case newCase) throws Exception {
		project.addCase(newCase);
	}
	
	public static void removeCase(String pattern) {
		project.removeCase(pattern);
	}
	
	public static String caseQuery(String queryString) {
		 Case problemCase = new Case(queryString, new Pattern(queryString.toCharArray()), new Solution());
		 String result = project.caseQuery(problemCase);
		 return result;
	}
}
