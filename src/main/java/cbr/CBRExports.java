package cbr;

import java.io.IOException;

import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.io.XMLExporter;

public class CBRExports {
	private static String dataPath = ".\\";
	private static String projectName = "MinesweeperPattern.prj";

	protected static void exportProject(Project project) throws IOException {
		XMLExporter.save(project, dataPath + projectName);
	}
}
