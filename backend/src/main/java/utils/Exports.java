package utils;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import com.opencsv.CSVWriter;

import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.io.XMLExporter;
import minesweeper.Case;

/**
*
* Collection of export functionalities.
*
* @author Marcel N&ouml;hre, 357775
*
*/
public class Exports {
	
	/**
	 * Export the CBR project as prj file.
	 * 
	 * @param project The CBR project
	 * @throws IOException
	 */
	public static void exportProject(Project project) throws IOException {
		XMLExporter.save(project, new Constants().getPath() + Constants.PROJECT_NAME);
	}
	
	/**
	 * Export a list of cases as csv file.
	 * 
	 * @param caseList 	The list of case instances
	 * @param path		The location to save the csv file
	 * @throws IOException
	 */
	public static void exportCasesAsCsv(ArrayList<Case> caseList, String path) throws IOException {
		ArrayList<String[]> cases = new ArrayList<String[]>();
		for(Case caseElement : caseList) {
			cases.add(Transform.caseToStringArray(caseElement));
		}
        FileOutputStream fileOutputStream = new FileOutputStream(path); 
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream, StandardCharsets.UTF_8);
		@SuppressWarnings("deprecation")
		CSVWriter csvWriter = new CSVWriter(outputStreamWriter, Constants.CSV_SEPERATOR.charAt(0));        
        csvWriter.writeNext(Constants.CSV_HEADER);
        csvWriter.writeAll(cases);
        csvWriter.close();
	}
	
	/**
	 * Add one case to a existing csv file.
	 * 
	 * @param newCase	The case instance to add
	 * @param path		The location to save the csv file
	 * @throws IOException
	 */
	public static void addCaseToCSV(String[] newCase, String path) throws IOException {
		FileWriter fileWriter = new FileWriter(path, true);
		@SuppressWarnings("deprecation")
		CSVWriter csvWriter = new CSVWriter(fileWriter, Constants.CSV_SEPERATOR.charAt(0));
		csvWriter.writeNext(newCase);
		csvWriter.close();
	} 
	
	/**
	 * Remove one case from a csv file.
	 * 
	 * @param pattern	The pattern of the case instance
	 * @param path		The location to save the csv file
	 * @throws FileNotFoundException
	 * @throws IOException
	 */
	public static void removeCaseFromCSV(String pattern, String path) throws FileNotFoundException, IOException {
		ArrayList<Case> caseList = Imports.importCasesFromCsv(path);
		for(Case caseElement : caseList) {
			if(caseElement.getName().equals(pattern)) {
				caseList.remove(caseElement);
				break;
			}
		}
		exportCasesAsCsv(caseList, path);
	}
}
