package cbr;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.tomcat.util.json.ParseException;

import minesweeper.Case;
import minesweeper.Pattern;
import minesweeper.Solution;

public class CBRAgent {
	protected static CBRProject project;
	
	public static void initializeCBR() {
		if(project != null) {
			project = new CBRProject();
			importCsvCases(new CBRUtils().getPath() + "allCases.csv");	
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
	
	public static void importCsvCases(String path) {
		try {
			System.out.print("Reading .csv file...");
			ArrayList<Case> caseList = CBRImports.importCasesFromCsv(path);
			System.out.println(" Success!");
			project.addCaseList(caseList);
			//TODO: update allCases.csv
		} catch (IOException e) {
			System.out.println(" failed!\n");
		}
	}
	
	public static void importJsonCases(String path) {
		try {
			System.out.print("Reading .json file...");
			ArrayList<Case> caseList = CBRImports.importCasesFromJson(path);
			System.out.println("Success!");
			project.addCaseList(caseList);
			//TODO: update allCases.csv
		} catch (IOException | ParseException e) {
			System.out.println(" failed!\n");
		}
	}
	
	public static void saveCasesAsCsv(ArrayList<Case> caseList, String fileName) {
		try {
			System.out.print("Exporting Cases... ");
			CBRExports.exportCasesAsCsv(caseList, new CBRUtils().getPath() + fileName);
			System.out.println("Success!");
			System.out.println("File " + fileName + " was created!\n");
		} catch (IOException e) {
			System.out.println("Failed!\n");
		}
	}
}
