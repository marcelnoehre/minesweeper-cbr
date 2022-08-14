package casebase;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.core.model.Concept;
import minesweeper_pattern.MinesweeperPattern;

public class ImportProject {
	private static String projectPath = "./MinesweeperPattern.prj";
	private Project project;
	private Concept minesweeperPatternConcept;
	
	public  void importExistingProject() throws Exception {
		project = new Project(projectPath);
		Thread.sleep(2000);
		minesweeperPatternConcept = project.getConceptByID("MinesweeperPatternConcept");
	}
	
	public void importCasesFromCsv(String csvFilePath) throws IOException {
		//Part␣file␣=␣request.getPart("file");␣//␣(we␣assume␣a␣file␣uploaded␣from␣a␣.jsp␣site)
		File file = new File(csvFilePath);
		StringBuilder stringBuilder = new StringBuilder();
		InputStream inputStream = new FileInputStream(file);
		BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        ArrayList<MinesweeperPattern> cases = new ArrayList<MinesweeperPattern>();
		String line;
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
        		cases.add(pattern);
        	}
        }
	}
}
