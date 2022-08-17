package cbr;

import de.dfki.mycbr.core.ICaseBase;
import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.core.casebase.Instance;
import de.dfki.mycbr.core.model.Concept;
import de.dfki.mycbr.core.model.StringDesc;
import de.dfki.mycbr.core.similarity.AmalgamationFct;
import de.dfki.mycbr.core.similarity.SymbolFct;
import de.dfki.mycbr.core.similarity.config.AmalgamationConfig;
import de.dfki.mycbr.core.similarity.config.StringConfig;

import minesweeper.Case;

public class CBRProject {
	protected static final String PATH = "C:\\Users\\Marcel\\cbr-workspace\\minesweeper-cbr-backend\\src\\main\\resources\\";
	protected static final String NAME = "MinesweeperPattern.prj";
	protected static final int ATTRIBUTES_AMOUNT = 28;
	private Project project;
	private Concept minesweeperPatternConcept;
	private AmalgamationFct minesweeperPatternSim;
	private ICaseBase casebase;
	private StringDesc[] attributes = new StringDesc[ATTRIBUTES_AMOUNT];
	private String[] attributeNames = new String[] {
			//center
			"Center",					//22
			//inner ring
			"InnerTopLeft",				//11
			"InnerTop",					//21
			"InnerTopRight",			//31
			"InnerRight",				//32
			"InnerBottomRight",			//33
			"InnerBottom",				//23
			"InnerBottomLeft",			//13
			"InnerLeft",				//12
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
			"OuterLeftTop",				//01
			//solution
			"Solvability",
			"SolutionCells",					
			"SolutionTypes"
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
				addCase(CBRUtils.createDefaultCase());
				CBRExports.exportProject(project);
				System.out.println(" Success!");
			} catch(Exception initializing) {
				System.out.println(" Failed");
			}
		}
	}
	
	protected void importProject() throws Exception {
		project = CBRImports.importExistingProject();
		minesweeperPatternConcept = project.getConceptByID("MinesweeperPatternConcept");
		minesweeperPatternSim = project.getActiveAmalgamFct();
		importAttributes();
		casebase = project.getCB("MinesweeperPatternCasebase");
	}
	
	private void importAttributes() throws Exception {
		for(int i = 0; i < ATTRIBUTES_AMOUNT; i++) {
			attributes[i] = (StringDesc) project.getAttDescsByName(attributeNames[i]).getFirst();
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
		for(int i = 0; i < ATTRIBUTES_AMOUNT; i++) {
			if(i == 0) {
				attributes[i] = configureAttribute(attributeNames[i], 137);
			} else if(i < 9) {
				attributes[i] = configureAttribute(attributeNames[i], 17);
			} else if (i >= 9 && i < 25) {
				attributes[i] = configureAttribute(attributeNames[i], 1);
			} else {
				attributes[i] = configureAttribute(attributeNames[i], 50);
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
	
	protected void addCase(Case newCase) throws Exception {
		Instance instance = minesweeperPatternConcept.addInstance(newCase.getName());
		instance.addAttribute(attributes[0], newCase.getPattern().getCenter());
		instance.addAttribute(attributes[1], newCase.getPattern().getInnerTopLeft());
		instance.addAttribute(attributes[2], newCase.getPattern().getInnerTop());
		instance.addAttribute(attributes[3], newCase.getPattern().getInnerTopRight());
		instance.addAttribute(attributes[4], newCase.getPattern().getInnerRight());
		instance.addAttribute(attributes[5], newCase.getPattern().getInnerBottomRight());
		instance.addAttribute(attributes[6], newCase.getPattern().getInnerBottom());
		instance.addAttribute(attributes[7], newCase.getPattern().getInnerBottomLeft());
		instance.addAttribute(attributes[8], newCase.getPattern().getInnerLeft());
		instance.addAttribute(attributes[9], newCase.getPattern().getOuterTopLeftCorner());
		instance.addAttribute(attributes[10], newCase.getPattern().getOuterTopLeft());
		instance.addAttribute(attributes[11], newCase.getPattern().getOuterTop());
		instance.addAttribute(attributes[12], newCase.getPattern().getOuterTopRight());
		instance.addAttribute(attributes[13], newCase.getPattern().getOuterTopRightCorner());
		instance.addAttribute(attributes[14], newCase.getPattern().getOuterRightTop());
		instance.addAttribute(attributes[15], newCase.getPattern().getOuterRight());
		instance.addAttribute(attributes[16], newCase.getPattern().getOuterRightBottom());
		instance.addAttribute(attributes[17], newCase.getPattern().getOuterBottomRightCorner());
		instance.addAttribute(attributes[18], newCase.getPattern().getOuterBottomRight());
		instance.addAttribute(attributes[19], newCase.getPattern().getOuterBottom());
		instance.addAttribute(attributes[20], newCase.getPattern().getOuterBottomLeft());
		instance.addAttribute(attributes[21], newCase.getPattern().getOuterBottomLeftCorner());
		instance.addAttribute(attributes[22], newCase.getPattern().getOuterLeftBottom());
		instance.addAttribute(attributes[23], newCase.getPattern().getOuterLeft());
		instance.addAttribute(attributes[24], newCase.getPattern().getOuterLeftTop());
		instance.addAttribute(attributes[25], newCase.getSolution().getSolveable());
		instance.addAttribute(attributes[26], newCase.getSolution().getCells());
		instance.addAttribute(attributes[27], newCase.getSolution().getTypes());
		casebase.addCase(instance);
	}
}