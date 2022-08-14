package cbr;

import java.io.IOException;
import java.util.ArrayList;

import de.dfki.mycbr.core.Project;
import minesweeper_pattern.MinesweeperPattern;

public class CBRAgent {
	private static Project project;
	
	public CBRAgent() {
		setupProject();
	}
	
	public void setupProject() {
		boolean projectAvailable = false;
		do {
			try {
				project = CBRImports.importExistingProject();
				projectAvailable = true;
			} catch (Exception e) {
				try {
					project = InitialProject.initializeProject();
				} catch (Exception e1) {}
			}
		} while(!projectAvailable);
	}
	
	public void importCases(String csvPath) {
		try {
			ArrayList<MinesweeperPattern> patternList= CBRImports.importCasesFromCsv(project, csvPath);
			for(MinesweeperPattern pattern : patternList) {
				CBRActions.addCase(project, project.getCB("MinesweeperPatternCasebase"), CBRActions.createValueArray(pattern));
			}
		} catch (IOException e) {
		} catch (Exception e) {
		}
	}
}
