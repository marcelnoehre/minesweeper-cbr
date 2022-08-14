package cbr;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

import de.dfki.mycbr.core.Project;
import minesweeper_pattern.MinesweeperPattern;

public class CBRImports {
	private static String dataPath = ".\\";
	private static String projectName = "MinesweeperPattern.prj";
	
	protected static Project importExistingProject() throws Exception {
		Project project = new Project(dataPath + projectName);
		Thread.sleep(2000);
		// Concept minesweeperPatternConcept = project.getConceptByID("MinesweeperPatternConcept");
		return project;
	}
	
	protected static ArrayList<MinesweeperPattern> importCasesFromCsv(Project project, String csvFilePath) throws IOException {
		File file = new File(csvFilePath);
		InputStream inputStream = new FileInputStream(file);
		ArrayList<MinesweeperPattern> patternList = new ArrayList<MinesweeperPattern>();
		try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream))) {
			String line;
			bufferedReader.readLine();
			while ((line = bufferedReader.readLine()) != null) {
				String[] result = new String[25];
				String[] cellValues = line.split(",");
				if(cellValues.length > 0) {
					for(int i = 0; i < cellValues.length; i++) {
						result[i] = cellValues[i];
					}
					MinesweeperPattern pattern = new MinesweeperPattern(
							result[0], 
							result[1], 
							result[2], 
							result[3], 
							result[4], 
							result[5], 
							result[6], 
							result[7], 
							result[8], 
							result[9], 
							result[10], 
							result[11], 
							result[12], 
							result[13], 
							result[14], 
							result[15], 
							result[16], 
							result[17], 
							result[18], 
							result[19], 
							result[20], 
							result[21], 
							result[22], 
							result[23], 
							result[24]);
					patternList.add(pattern);
				}
			}
		}
		return patternList;
	}
}
