package cbr;

import de.dfki.mycbr.core.ICaseBase;
import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.core.casebase.Instance;
import de.dfki.mycbr.core.model.Concept;
import de.dfki.mycbr.core.model.StringDesc;
import de.dfki.mycbr.core.similarity.config.StringConfig;
import minesweeper_pattern.MinesweeperPattern;

public class CBRActions {
	private static StringDesc[] attributes = new StringDesc[25];
	private static String[] attributeNames = new String[] {
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
	
	protected static ICaseBase addCase(Concept minesweeperPatternConcept, ICaseBase caseBase, String[] values) throws Exception {
		Instance instance = minesweeperPatternConcept.addInstance("");
		int i = 0;
		for(StringDesc attribute : attributes) {
			instance.addAttribute(attribute, values[i]);
			i++;
		}
		caseBase.addCase(instance);
		return caseBase;
	}
	
	protected static StringDesc[] createAttributes(Project project) throws Exception {
		
		for(int i = 0; i < attributeNames.length; i++) {
			if(i == 0) {
				attributes[i] = CBRActions.configureAttribute(attributeNames[i], 137, project);
			} else if(i < 9) {
				attributes[i] = CBRActions.configureAttribute(attributeNames[i], 17, project);
			} else {
				attributes[i] = CBRActions.configureAttribute(attributeNames[i], 1, project);
			}
		}
		return attributes;
	}
	
	protected static StringDesc configureAttribute(String descName, int weight, Project project) throws Exception {
		StringDesc attribute = new StringDesc(project.getConceptByID("MinesweeperPatternConcept"), descName);
		attribute.addStringFct(StringConfig.LEVENSHTEIN, descName + "Fct", true);
		project.getActiveAmalgamFct().setWeight(descName, weight);
		return attribute;
	}
	
	protected static StringDesc[] extractAttributesFromCase(MinesweeperPattern minesweeperPattern) {
		StringDesc[] attributes = new StringDesc[] {
			
		};
		return attributes;
	}
	
	protected static String[] createValueArray(MinesweeperPattern pattern) {
		String[] values = new String[] {
				pattern.getCenter(),
				pattern.getInnerTopLeft(),
				pattern.getInnerTop(),
				pattern.getInnerTopRight(),
				pattern.getInnerRight(),
				pattern.getInnerBottomRight(),
				pattern.getInnerBottom(),
				pattern.getInnerBottomLeft(),
				pattern.getInnerLeft(),
				pattern.getOuterTopLeftCorner(),
				pattern.getOuterTopLeft(),
				pattern.getOuterTop(),
				pattern.getOuterTopRight(),
				pattern.getOuterTopRightCorner(),
				pattern.getOuterRightTop(),
				pattern.getOuterRight(),
				pattern.getOuterRightBottom(),
				pattern.getOuterBottomRightCorner(),
				pattern.getOuterBottomRight(),
				pattern.getOuterBottom(),
				pattern.getOuterBottomLeft(),
				pattern.getOuterBottomLeftCorner(),
				pattern.getOuterLeftBottom(),
				pattern.getOuterLeft(),
				pattern.getOuterLeftTop()
		};
		return values;
	}
}
