package cbr;

import java.io.IOException;
import java.util.ArrayList;

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
			for(Case newCase : caseList) {
				try {
					if(!project.checkForCase(newCase.getName())) {
						project.addCase(newCase);
						System.out.println("Case " + newCase.getName() + " added to casebase!");
					} else {
						System.out.println("Case " + newCase.getName() + " already exists!");	
					}
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("Invalid Case " + newCase.getName() + " detected!");
				}
			}
			System.out.println("");
			//TODO: update allCases.csv
		} catch (IOException e) {
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
			//TODO: update casebase
			//TODO: update allCases.csv
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
	
	public void importJsonCases(String path) {
		//TODO: read json file
		//TODO: update caseBase
		//TODO: update allCases.csv
	}
	
	public void saveCasesAsJson(ArrayList<Case> caseList, String fileName) {
		//TODO: exportCasesAsJson in CBRExports
	}
}
