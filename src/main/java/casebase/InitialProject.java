package casebase;

import de.dfki.mycbr.core.ICaseBase;
import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.core.casebase.Instance;
import de.dfki.mycbr.core.model.Concept;
import de.dfki.mycbr.core.model.StringDesc;
import de.dfki.mycbr.core.similarity.AmalgamationFct;
import de.dfki.mycbr.core.similarity.SymbolFct;
import de.dfki.mycbr.core.similarity.config.AmalgamationConfig;
import de.dfki.mycbr.core.similarity.config.StringConfig;
import de.dfki.mycbr.io.XMLExporter;

public class InitialProject {
	private static String projectPath = "./MinesweeperPattern.prj";
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
	
	public InitialProject() {	
		try {
			setProjectInformation();
			setSpecialSimilarity();
			setConceptAndAmalgation();
			setAttributes();
			setCaseBase();
			addFirstCase();
			xmlExport();
		} catch(Exception e) {
			System.out.println("Setup failed:");
			System.out.println(e.toString());
		}
	}
	
	private void setProjectInformation() throws Exception {
		project = new Project();
		project.setName("Minesweeper");
		project.setAuthor("Jannis Kehrhahn 275136, Marcel Nöhre 357775");
	}
	
	private void setSpecialSimilarity() throws Exception {
		SymbolFct sym = project.getSpecialFct();
		sym.setSimilarity("_unknown_", "_undefined_", 1);
		sym.setSimilarity("_undefined_", "_unknown_", 1);
		sym.setSimilarity("_others_", "_unknown_", 1);
		sym.setSimilarity("_others_", "_undefined_", 1);
		sym.setSimilarity("_unknown_", "_others_", 1);
		sym.setSimilarity("_undefined_", "_others_", 1);
	}
	
	private void setConceptAndAmalgation() throws Exception {
		minesweeperPatternConcept = project.createTopConcept("MinesweeperPatternConcept");
		minesweeperPatternSim = minesweeperPatternConcept.addAmalgamationFct(AmalgamationConfig.WEIGHTED_SUM, "MinesweeperPatternSimFct", true);
	}
	
	private void setAttributes() throws Exception {
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
	
	private StringDesc configureAttribute(String descName, int weight) throws Exception {
		StringDesc attribute = new StringDesc(minesweeperPatternConcept, descName);
		attribute.addStringFct(StringConfig.LEVENSHTEIN, descName + "Fct", true);
		minesweeperPatternSim.setWeight(descName, weight);
		return attribute;
	}
	
	private void setCaseBase() throws Exception {
		casebase = project.createDefaultCB("MinesweeperPatternCasebase");
	}
	
	private void addFirstCase() throws Exception {
		Instance instance = minesweeperPatternConcept.addInstance("EverythingCovered");
		for(StringDesc attribute : attributes) {
			instance.addAttribute(attribute, "c");
		}
		casebase.addCase(instance);
	}
	
	private void xmlExport() {
		XMLExporter.save(project, projectPath);
	}
}
