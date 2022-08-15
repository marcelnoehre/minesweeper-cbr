package cbr;

import java.util.HashMap;

import de.dfki.mycbr.core.ICaseBase;
import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.core.casebase.Instance;
import de.dfki.mycbr.core.model.AttributeDesc;
import de.dfki.mycbr.core.model.Concept;
import de.dfki.mycbr.core.model.StringDesc;
import de.dfki.mycbr.core.similarity.AmalgamationFct;
import de.dfki.mycbr.core.similarity.SymbolFct;
import de.dfki.mycbr.core.similarity.config.AmalgamationConfig;
import de.dfki.mycbr.core.similarity.config.StringConfig;

public class CBRProject {
	protected static final String PATH = "C:\\Users\\Marcel\\cbr-workspace\\minesweeper-cbr-backend\\src\\main\\resources\\";
	protected static final String NAME = "MinesweeperPattern.prj";
	private Project project;
	private Concept minesweeperPatternConcept;
	private AmalgamationFct minesweeperPatternSim;
	private ICaseBase casebase;
	private StringDesc[] attributes = new StringDesc[25];
	private String[] attributeNames = new String[] {
			//center
			"Center",					//22
			//inner ring
			"InnerTopLeft",				//11
			"InnerTop",					//12
			"InnerTopRight",			//13
			"InnerRight",				//23
			"InnerBottomRight",			//33
			"InnerBottom",				//32
			"InnerBottomLeft",			//31
			"InnerLeft",				//21
			//outer ring
			"OuterTopLeftCorner", 		//00
			"OuterTopLeft", 			//10
			"OuterTop",					//20
			"OuterTopRight", 			//30
			"OuterTopRightCorner",		//40
			"OuterRightTop", 			//41
			"OuterRight", 				//42
			"OuterRightBottom", 		//43
			"OuterBottomRightCorner",	//44
			"OuterBottomRight", 		//34
			"OuterBottom", 				//24
			"OuterBottomLeft",			//14
			"OuterBottomLeftCorner",	//04
			"OuterLeftBottom", 			//03
			"OuterLeft", 				//02
			"OuterLeftTop"				//01
	};
	
	protected CBRProject() {
		try {
			System.out.println("Importing Project...");
			importProject();
			System.out.println("The project " + project.getName() + " from " + project.getAuthor() + " was imported!");
		} catch(Exception importing) {
			try {
				System.out.println("No project found!");
				System.out.print("Creating new Project...");
				initProjectInformation();
				initSpecialSimilarity();
				initConceptAndAmalgation();
				initAttributes();
				initCaseBase();
				addDefaultCase();
				CBRExports.exportProject(project);
				System.out.println(" Success!");
			} catch(Exception initializing) {
				System.out.println(" Failed");
			}
		}
	}
	
	private void importProject() throws Exception {
		project = CBRImports.importExistingProject();
		minesweeperPatternConcept = project.getConceptByID("MinesweeperPatternConcept");
		minesweeperPatternSim = project.getActiveAmalgamFct();
		importAttributes(project.getAllAttributeDescs());
		casebase = project.getCB("MinesweeperPatternCasebase");
	}
	
	private void importAttributes(HashMap<String, AttributeDesc> map) throws Exception {
		int position = 0;
		for (Object description : map.values()) {
		    attributes[position] = (StringDesc) description;
		}
	}
	
	private void initProjectInformation() throws Exception {
		project = new Project();
		project.setName("MinesweeperBackend");
		project.setAuthor("Jannis Kehrhahn 275136 and Marcel Nöhre 357775");
	}
	
	private void initSpecialSimilarity() throws Exception {
		SymbolFct sym = project.getSpecialFct();
		sym.setSimilarity("_unknown_", "_undefined_", 1);
		sym.setSimilarity("_undefined_", "_unknown_", 1);
		sym.setSimilarity("_others_", "_unknown_", 1);
		sym.setSimilarity("_others_", "_undefined_", 1);
		sym.setSimilarity("_unknown_", "_others_", 1);
		sym.setSimilarity("_undefined_", "_others_", 1);
	}
	
	private void initConceptAndAmalgation() throws Exception {
		minesweeperPatternConcept = project.createTopConcept("MinesweeperPatternConcept");
		minesweeperPatternSim = minesweeperPatternConcept.addAmalgamationFct(AmalgamationConfig.WEIGHTED_SUM, "MinesweeperPatternSimFct", true);
	}
	
	private void initAttributes() throws Exception {
		for(int i = 0; i < attributeNames.length; i++) {
			if(i == 0) {
				attributes[i] = configureAttribute(attributeNames[i], 137);
			} else if(i < 9) {
				attributes[i] = configureAttribute(attributeNames[i], 17);
			} else {
				attributes[i] = configureAttribute(attributeNames[i], 1);
			}
		}
	}
	
	private void initCaseBase() throws Exception {
		casebase = project.createDefaultCB("MinesweeperPatternCasebase");
	}
	
	private StringDesc configureAttribute(String descName, int weight) throws Exception {
		StringDesc attribute = new StringDesc(minesweeperPatternConcept, descName);
		attribute.addStringFct(StringConfig.LEVENSHTEIN, descName + "Fct", true);
		minesweeperPatternSim.setWeight(descName, weight);
		return attribute;
	}
	
	private void addDefaultCase() throws Exception {
		String[] values = new String[25];
		for(int i = 0; i < values.length; i++) {
			values[i] = "c";
		}
		addCase(values);
	}
	
	protected void addCase(String[] values) throws Exception {
		String name = "";
		for(String value : values) {
			name += value;
		}
		Instance instance = minesweeperPatternConcept.addInstance(name);
		for(StringDesc attribute : attributes) {
			instance.addAttribute(attribute, "c");
		}
		casebase.addCase(instance);
	}
}