package utils;

import java.io.FileWriter;
import java.io.IOException;

import com.opencsv.CSVWriter;

import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.io.XMLExporter;

public class Exports {
	public static void exportProject(Project project) throws IOException {
		XMLExporter.save(project, new Constants().getPath() + Constants.PROJECT_NAME);
	}
	
	@SuppressWarnings("resource")
	public static void addCaseToCSV(String[] newCase, String path) throws IOException {
		FileWriter fileWriter = new FileWriter(path, true);
		@SuppressWarnings("deprecation")
		CSVWriter csvWriter = new CSVWriter(fileWriter, Constants.CSV_SEPERATOR.charAt(0));
		csvWriter.writeNext(newCase);
		csvWriter.close();
	} 
	
	public static void removeCaseFromCSV(String pattern) {
		//TODO: implement
	}
}
