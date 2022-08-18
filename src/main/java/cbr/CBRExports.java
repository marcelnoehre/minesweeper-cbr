package cbr;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import com.opencsv.CSVWriter;

import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.io.XMLExporter;

public class CBRExports {

	protected static void exportProject(Project project) throws IOException {
		new CBRUtils().getPath();
		XMLExporter.save(project, new CBRUtils().getPath() + CBRProject.NAME);
	}
	
	protected static void exportCasesAsCsv() throws IOException {
		//TODO: Check why it does not work
        String[] header = {"id", "name", "address", "phone"};
        String[] record1 = {"1", "first name", "address 1", "11111"};
        String[] record2 = {"2", "second name", "address 2", "22222"};

        ArrayList<String[]> list = new ArrayList<>();
        list.add(header);
        list.add(record1);
        list.add(record2);
        CSVWriter writer = new CSVWriter(new FileWriter("test.csv"));
        writer.writeAll(list);
	}

}
