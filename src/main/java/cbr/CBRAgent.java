package cbr;

import java.io.IOException;
import java.util.ArrayList;

import org.apache.tomcat.util.json.ParseException;

import minesweeper.Case;

public class CBRAgent {
	protected static CBRProject project;
	
	public void initializeCBR() {
		project = new CBRProject();
		importCsvCases(new CBRUtils().getPath() + "allCases.csv");
	}
	
	public void importCsvCases(String path) {
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
	
	public void importJsonCases(String path) {
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
	
	public void deleteCases(String[] caseNames) {
		for(String name : caseNames) {
			if(project.removeCase(name)) {
				//TODO: update allCases.csv	
			}
		}
	}
	
	public void updateCases(Case[] caseList) {
		for(Case caseElement : caseList) {
			try {
				System.out.print("Updating Case " + caseElement.getName());
				project.removeCase(caseElement.getName());
				project.addCase(caseElement);
				//TODO: update allCases.csv
				System.out.println("Success!");
			} catch (Exception e) {
				System.out.println("Failed!");
			}
			System.out.println("");
		}
	}
	
	public void saveCasesAsCsv(ArrayList<Case> caseList, String fileName) {
		try {
			System.out.print("Exporting Cases... ");
			CBRExports.exportCasesAsCsv(caseList, new CBRUtils().getPath() + fileName);
			System.out.println("Success!");
			System.out.println("File " + fileName + " was created!\n");
		} catch (IOException e) {
			System.out.println("Failed!\n");
		}
	}
	
	public void saveCasesAsJson(ArrayList<Case> caseList, String fileName) {
		try {
			System.out.print("Exporting Cases... ");
			CBRExports.exportCasesAsJson(caseList, new CBRUtils().getPath() + fileName);
			System.out.println("Success!");
			System.out.println("File " + fileName + " was created!\n");
		} catch (IOException e) {
			System.out.println("Failed!\n");
		}
	}
}
