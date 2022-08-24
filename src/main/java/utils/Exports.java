package utils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import com.opencsv.CSVWriter;

import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.io.XMLExporter;

import minesweeper.Case;

public class Exports {
	public static void exportProject(Project project) throws IOException {
		XMLExporter.save(project, new Constants().getPath() + Constants.PROJECT_NAME);
	}
	
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
	
	public static void addCaseToCSV(String[] newCase) {
		//TODO: implement
	}
	
	public static void removeCaseFromCSV(String pattern) {
		//TODO: implement
	}
}
