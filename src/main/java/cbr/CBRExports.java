package cbr;

import java.io.IOException;

import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.io.XMLExporter;

public class CBRExports {

	protected static void exportProject(Project project) throws IOException {
		new CBRUtils().getPath();
		XMLExporter.save(project, new CBRUtils().getPath() + CBRProject.NAME);
	}
	
	//TODO: Export cases as csv
	//TODO: add cases to allCases.csv
}
