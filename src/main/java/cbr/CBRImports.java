package cbr;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import com.opencsv.CSVReader;

import de.dfki.mycbr.core.Project;

import minesweeper.Case;

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
				caseList.add(CBRUtils.createCaseObject(result));
            }
        }
		return caseList;
	}
}
