package cbr;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import com.opencsv.CSVReader;

import de.dfki.mycbr.core.Project;

import minesweeper.Case;
import minesweeper.Pattern;
import minesweeper.Solution;

public class CBRImports {

	
	protected static Project importExistingProject() throws Exception {
		Project project = new Project(new CBRUtils().getPath() + CBRProject.NAME);
		Thread.sleep(2000);
		return project;
	}
	
	protected static ArrayList<Case> importCasesFromCsv(String path) throws IOException {
		ArrayList<Case> caseList = new ArrayList<Case>();
        try (FileReader fileReader = new FileReader(path);
             CSVReader csvReader = new CSVReader(fileReader)) {
            String[] nextLine;
            csvReader.readNext();
            while ((nextLine = csvReader.readNext()) != null) {
            	String[] result = new String[CBRProject.ATTRIBUTES_AMOUNT];
            	int i = 0;
                for (String value : nextLine) {
                	result[i] = value;
                	i++;
                }
				Pattern pattern = new Pattern(
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
                Solution solution = new Solution(
					Boolean.parseBoolean(result[25]), 
					result[26].split(CBRUtils.SOLUTION_SEPERATOR),
					result[27].split(CBRUtils.SOLUTION_SEPERATOR)
				);
				String caseName = "";
				for(int j = 0; j < 25; j++) {
					caseName += result[j];
				}
				Case newCase = new Case(caseName, pattern, solution);
				caseList.add(newCase);
            }
        }
		return caseList;
	}
}
