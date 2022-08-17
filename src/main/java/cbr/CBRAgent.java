package cbr;

import java.io.IOException;
import java.util.ArrayList;

import minesweeper.Case;

public class CBRAgent {
	protected static CBRProject project;
	
	public void initializeCBR() {
		project = new CBRProject();
		importCases("C:\\Users\\Marcel\\cbr-workspace\\minesweeper-cbr-backend\\src\\main\\backups\\allCases.csv");
	}
	
	public void importCases(String path) {
		try {
			System.out.print("Reading .csv file...");
			ArrayList<Case> caseList = CBRImports.importCasesFromCsv(path);
			System.out.println(" Success!");
			for(Case newCase : caseList) {
				try {
					if(!project.checkForCase(newCase.getName())) {
						project.addCase(newCase);
						//TODO: add to allCases.csv
						System.out.println("Case " + newCase.getName() + " added to casebase!");
					} else {
						System.out.println("Case " + newCase.getName() + " already exists!");	
					}
					
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("Invalid Case " + newCase.getName() + " detected!");
				}
				System.out.println("");
			}
		} catch (IOException e) {
			System.out.println(" failed!\n");
		}
	}
	
	public void removeCases(String[] caseNames) {
		for(String name : caseNames) {
			if(project.removeCase(name)) {
				//TODO remove from allCases.csv	
			}
		}
	}
	
	//TODO: export cases
	//TODO: delete cases
	//TODO: update cases
}
