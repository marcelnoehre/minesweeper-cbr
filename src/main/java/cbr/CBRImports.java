package cbr;

import de.dfki.mycbr.core.Project;

public class CBRImports {

	
	protected static Project importExistingProject() throws Exception {
		Project project = new Project(CBRProject.PATH + CBRProject.NAME);
		Thread.sleep(2000);
		return project;
	}
}
