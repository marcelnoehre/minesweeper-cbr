package cbr;

import java.io.IOException;
import java.util.ArrayList;

import minesweeper.Case;

public class CBRAgent {
	protected static CBRProject project;
	
	public void initializeCBR() {
		project = new CBRProject();
	}
	
	public void importCases(String path) {
		try {
			System.out.print("Reading .csv file...");
			ArrayList<Case> caseList = CBRImports.importCasesFromCsv(path);
			System.out.println(" Success!");
			for(Case newCase : caseList) {
				try {
					//TODO: check if case exists in casebase
					project.addCase(newCase);
					System.out.println("Case " + newCase.getName() + " added to casebase!");
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("Invalid Case " + newCase.getName() + " detected!");
				}
			}
		} catch (IOException e) {
			System.out.println(" failed!");
		}
	}
	
	//TODO: export cases
	//TODO: delete cases
	//TODO: update cases
}
