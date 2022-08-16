package cbr;

import java.util.HashMap;

import de.dfki.mycbr.core.ICaseBase;
import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.core.casebase.Instance;
import de.dfki.mycbr.core.model.AttributeDesc;
import de.dfki.mycbr.core.model.Concept;
import de.dfki.mycbr.core.model.IntegerDesc;
import de.dfki.mycbr.core.model.StringDesc;
import de.dfki.mycbr.core.similarity.AmalgamationFct;
import de.dfki.mycbr.core.similarity.SymbolFct;
import de.dfki.mycbr.core.similarity.config.AmalgamationConfig;
import de.dfki.mycbr.core.similarity.config.StringConfig;

import minesweeper.Case;
import minesweeper.Pattern;
import minesweeper.Solution;

public class CBRProject {
	protected static final String PATH = "C:\\Users\\Marcel\\cbr-workspace\\minesweeper-cbr-backend\\src\\main\\resources\\";
	protected static final String NAME = "MinesweeperPattern.prj";
	protected static final int ATTRIBUTES_AMOUNT = 29;
	private Project project;
	private Concept minesweeperPatternConcept;
	private AmalgamationFct minesweeperPatternSim;
	private ICaseBase casebase;
	private AttributeDesc[] attributes = new StringDesc[ATTRIBUTES_AMOUNT];
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
			"Row",
			"Column",
			"Solution",					
			"SolutionSteps"
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
	
	protected void importProject() throws Exception {
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
		for(int i = 0; i < ATTRIBUTES_AMOUNT; i++) {
			if(i == 0) {
				attributes[i] = configurePatternAttribute(attributeNames[i], 137);
			} else if(i < 9) {
				attributes[i] = configurePatternAttribute(attributeNames[i], 17);
			} else if (i >= 9 && i < 25) {
				attributes[i] = configurePatternAttribute(attributeNames[i], 1);
			} else {
				attributes[i] = configureSolutionAttribute(attributeNames[i]);
			}
			
		}
	}
	
	private void initCaseBase() throws Exception {
		casebase = project.createDefaultCB("MinesweeperPatternCasebase");
	}
	
	private StringDesc configurePatternAttribute(String descName, int weight) throws Exception {
		StringDesc attribute = new StringDesc(minesweeperPatternConcept, descName);
		attribute.addStringFct(StringConfig.LEVENSHTEIN, descName + "Fct", true);
		minesweeperPatternSim.setWeight(descName, weight);
		return attribute;
	}
	
	private AttributeDesc configureSolutionAttribute(String descName) throws Exception {
		AttributeDesc attribute = null;
		if(descName.equals("Row") || descName.equals("Column")) {
			attribute = new IntegerDesc(minesweeperPatternConcept, descName, 0, 1);
			minesweeperPatternSim.setWeight(descName, 50);
		} else if(descName.equals("Solution") || descName.equals("SolutionSteps")) {
			attribute = new StringDesc(minesweeperPatternConcept, descName);
			((StringDesc) attribute).addStringFct(StringConfig.LEVENSHTEIN, descName + "Fct", true);
			minesweeperPatternSim.setWeight(descName, 25);
		} else {
			throw new Exception("Empty Attribute");
		}
		return attribute;
	}
	
	private void addDefaultCase() throws Exception {
		String name = "ccccccccccccccccccccccccc";
		Pattern pattern = new Pattern(
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c", 
				"c");
		Solution solution = new Solution(0, 0, "Für dieses Muster kann keine Lösung gefunden werden", new String[0]);
		addCase(new Case(name, pattern, solution));
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
		instance.addAttribute(attributes[0], newCase.getSolution().getRow());
		instance.addAttribute(attributes[0], newCase.getSolution().getColumn());
		instance.addAttribute(attributes[0], newCase.getSolution().getSolution());
		instance.addAttribute(attributes[0], newCase.getSolution().getSolutionSteps());
		casebase.addCase(instance);
	}
}