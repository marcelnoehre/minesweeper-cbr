package cbr;

import java.io.IOException;

import minesweeper.Case;

public class CBRAgent {
	protected static CBRProject project;
	
	public void initializeCBR() {
		project = new CBRProject();
	}
	
	public void importCsvFile(String path) {
		try {
			for(Case newCase : CBRImports.importCasesFromCsv(path)) {
				project.addCase(newCase);
			}
			
		} catch (IOException e) {
			
		} catch (Exception e) {}
	}
}
