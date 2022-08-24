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
	
	public static void project() throws FileNotFoundException, IOException {;
		if(project == null) {
			project = new CBRProject();
			System.out.println("Reading allCases.csv ...");
			project.addCaseList(Imports.importCasesFromCsv(new Constants().getPath() + "allCases.csv"));
		}
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
