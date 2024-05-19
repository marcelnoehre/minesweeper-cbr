package utils;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

import com.opencsv.CSVReader;

import de.dfki.mycbr.core.Project;

import minesweeper.Case;

/**
*
* Collection of import functionalities.
*
* @author Marcel N&ouml;hre, 357775
*
*/
public class Imports {
	
	/**
	 * Import a CBR project from a prj file.
	 * 
	 * @return	The imported project
	 * @throws Exception
	 */
	public static Project importProject() throws Exception {
		Project project = new Project(new Constants().getPath() + Constants.PROJECT_NAME);
		Thread.sleep(2000);
		return project;
	}
	
	/**
	 * Import a caselist from a csv file.
	 * 
	 * @param path	The location to read the csv file
	 * @return		The imported caselist
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static ArrayList<Case> importCasesFromCsv(String path) throws FileNotFoundException, IOException {
		ArrayList<Case> caseList = new ArrayList<Case>();
        try (FileReader fileReader = new FileReader(path);
             CSVReader csvReader = new CSVReader(fileReader)) {
            String[] nextLine;
            csvReader.readNext();
            while ((nextLine = csvReader.readNext()) != null) {
            	String[] result = new String[Constants.ATTRIBUTES_AMOUNT];
            	int i = 0;
                for (String value : nextLine) {
                	result[i] = value;
                	i++;
                }
				caseList.add(new Case(result));
            }
        }
		return caseList;
	}
}
