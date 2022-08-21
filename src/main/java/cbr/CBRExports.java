package cbr;

import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.opencsv.CSVWriter;

import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.io.XMLExporter;
import minesweeper.Case;

public class CBRExports {

	protected static void exportProject(Project project) throws IOException {
		new CBRUtils().getPath();
		XMLExporter.save(project, new CBRUtils().getPath() + CBRConstants.NAME);
	}
	
	protected static void exportCasesAsCsv(ArrayList<Case> caseList, String path) throws IOException {
		//TODO: Check why function not writing into file
		ArrayList<String[]> cases = new ArrayList<String[]>();
		for(Case caseElement : caseList) {
			cases.add(CBRUtils.getCaseArray(caseElement));
		}
        FileOutputStream fileOutputStream = new FileOutputStream(path); 
        OutputStreamWriter outputStreamWriter = new OutputStreamWriter(fileOutputStream, StandardCharsets.UTF_8);
        CSVWriter csvWriter = new CSVWriter(outputStreamWriter);
        csvWriter.writeNext(CBRUtils.createCsvHeader());
        for(String[] csvCase : cases) {
        	csvWriter.writeNext(csvCase);
        }
        csvWriter.writeAll(cases);
        csvWriter.close();
	}
	
	
	@SuppressWarnings({ "unchecked", "resource" })
	protected static void exportCasesAsJson(ArrayList<Case> caseList, String path) throws IOException {
		//TODO: check if this works
		JSONArray jsonCaseList = new JSONArray();
		for(Case caseElement : caseList) {
			JSONObject jsonCase = new JSONObject();
			int i = 0;
			for(String attribute : CBRUtils.getCaseArray(caseElement)) {
				jsonCase.put(CBRConstants.ATTRIBUTE_NAMES[i], attribute);
			}
			jsonCaseList.add(jsonCase);
		}
		FileWriter file = new FileWriter(path);
        file.write(jsonCaseList.toJSONString()); 
        file.flush();
	}
}
