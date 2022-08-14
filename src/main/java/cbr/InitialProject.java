package cbr;

import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.core.model.Concept;
import de.dfki.mycbr.core.similarity.SymbolFct;
import de.dfki.mycbr.core.similarity.config.AmalgamationConfig;

public class InitialProject {
	private static Project project;
	private static Concept minesweeperPatternConcept;
	
	protected static Project initializeProject() throws Exception {
		setProjectInformation();
		setSpecialSimilarity();
		setConceptAndAmalgation();
		CBRActions.createAttributes(project);
		createCaseBase();
		addDefaultCase();
		CBRExports.exportProject(project);
		return project;
	}
	
	private static void setProjectInformation() throws Exception {
		project = new Project();
		project.setName("Minesweeper");
		project.setAuthor("Jannis Kehrhahn 275136, Marcel Nöhre 357775");
	}
	
	private static void setSpecialSimilarity() throws Exception {
		SymbolFct sym = project.getSpecialFct();
		sym.setSimilarity("_unknown_", "_undefined_", 1);
		sym.setSimilarity("_undefined_", "_unknown_", 1);
		sym.setSimilarity("_others_", "_unknown_", 1);
		sym.setSimilarity("_others_", "_undefined_", 1);
		sym.setSimilarity("_unknown_", "_others_", 1);
		sym.setSimilarity("_undefined_", "_others_", 1);
	}
	
	private static void setConceptAndAmalgation() throws Exception {
		minesweeperPatternConcept = project.createTopConcept("MinesweeperPatternConcept");
		minesweeperPatternConcept.addAmalgamationFct(AmalgamationConfig.WEIGHTED_SUM, "MinesweeperPatternSimFct", true);
	}
	
	private static void createCaseBase() throws Exception {
		project.createDefaultCB("MinesweeperPatternCasebase");
	}
	
	private static void addDefaultCase() throws Exception {
		String[] values = new String[25];
		for(int i = 0; i < values.length; i++) {
			values[i] = "c";
		}
		CBRActions.addCase(minesweeperPatternConcept, project.getCB("MinesweeperPatternCasebase"), values);
	}
}
