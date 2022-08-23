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
	protected static void exportProject(Project project) throws IOException {
		XMLExporter.save(project, new Constants().getPath() + Constants.PROJECT_NAME);
	}
	
	protected static void exportCasesAsCsv(ArrayList<Case> caseList, String path) throws IOException {
		//TODO: Check why function not writing into file
		ArrayList<String[]> cases = new ArrayList<String[]>();
		for(Case caseElement : caseList) {
			cases.add(Transform.caseToStringArray(caseElement));
		}
        FileOutputStream fileOutputStream = new FileOutputStream(path); 
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream, StandardCharsets.UTF_8);
        CSVWriter csvWriter = new CSVWriter(outputStreamWriter);
        csvWriter.writeNext(Constants.CSV_HEADER);
        for(String[] csvCase : cases) {
        	csvWriter.writeNext(csvCase);
        }
        csvWriter.writeAll(cases);
        csvWriter.close();
	}
}
