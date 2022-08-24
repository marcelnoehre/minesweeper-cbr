package cbr;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import de.dfki.mycbr.core.ICaseBase;
import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.core.casebase.Instance;
import de.dfki.mycbr.core.model.Concept;
import de.dfki.mycbr.core.model.StringDesc;
import de.dfki.mycbr.core.retrieval.Retrieval;
import de.dfki.mycbr.core.retrieval.Retrieval.RetrievalMethod;
import de.dfki.mycbr.core.similarity.AmalgamationFct;
import de.dfki.mycbr.core.similarity.Similarity;
import de.dfki.mycbr.core.similarity.SymbolFct;
import de.dfki.mycbr.core.similarity.config.AmalgamationConfig;
import de.dfki.mycbr.core.similarity.config.StringConfig;
import de.dfki.mycbr.util.Pair;
import minesweeper.Case;
import utils.Constants;
import utils.Exports;
import utils.Imports;
import utils.Transform;

public class CBRProject {
	private Project project;
	private Concept minesweeperPatternConcept;
	private AmalgamationFct minesweeperPatternSim;
	private ICaseBase casebase;
	private StringDesc[] attributes = new StringDesc[Constants.ATTRIBUTES_AMOUNT];
	
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
				addCase(Constants.DEFAULT_CASE);
				Exports.exportProject(project);
				System.out.println(" Success!");
			} catch(Exception initializing) {
				System.out.println(" Failed!");
			}
		}
	}
	
	protected void importProject() throws Exception {
		project = Imports.importProject();
		minesweeperPatternConcept = project.getConceptByID("MinesweeperPatternConcept");
		minesweeperPatternSim = project.getActiveAmalgamFct();
		importAttributes();
		casebase = project.getCB("MinesweeperPatternCasebase");
	}
	
	private void importAttributes() throws Exception {
		for(int i = 0; i < Constants.ATTRIBUTES_AMOUNT; i++) {
			attributes[i] = (StringDesc) project.getAttDescsByName(Constants.ATTRIBUTE_NAMES[i]).getFirst();
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
		sym.setSimilarity("_others_", "_unknown_", 0);
		sym.setSimilarity("_others_", "_undefined_", 0);
		sym.setSimilarity("_unknown_", "_others_", 0);
		sym.setSimilarity("_undefined_", "_others_", 0);
	}
	
	private void initConceptAndAmalgation() throws Exception {
		minesweeperPatternConcept = project.createTopConcept("MinesweeperPatternConcept");
		minesweeperPatternSim = minesweeperPatternConcept.addAmalgamationFct(AmalgamationConfig.WEIGHTED_SUM, "MinesweeperPatternSimFct", true);
	}
	
	private void initAttributes() throws Exception {
		for(int i = 0; i < Constants.ATTRIBUTES_AMOUNT; i++) {
			if(i == 0) {
				attributes[i] = configureAttribute(Constants.ATTRIBUTE_NAMES[i], 153);
			} else if(i < 9) {
				attributes[i] = configureAttribute(Constants.ATTRIBUTE_NAMES[i], 17);
			} else if (i >= 9 && i < 25) {
				attributes[i] = configureAttribute(Constants.ATTRIBUTE_NAMES[i], 1);
			} else {
				attributes[i] = configureAttribute(Constants.ATTRIBUTE_NAMES[i], 0);
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
	
	protected void addCaseList(ArrayList<Case> caseList) {
		for(Case newCase : caseList) {
			try {
				if(!checkForCase(newCase.getName())) {
					addCase(newCase);
					System.out.println("Case " + newCase.getName() + " added to casebase!");
				} else {
					System.out.println("Case " + newCase.getName() + " already exists!");	
				}
			} catch (Exception e) {
				System.out.println("Invalid Case " + newCase.getName() + " detected!");
			}
		}
		System.out.println("");
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
		instance.addAttribute(attributes[25], newCase.getSolution().getSolveable() ? "True": "False");
		instance.addAttribute(attributes[26], Transform.stringArrayToSolutionString(newCase.getSolution().getCells()));
		instance.addAttribute(attributes[27], Transform.stringArrayToSolutionString(newCase.getSolution().getTypes()));
		casebase.addCase(instance);
	}
	
	protected boolean removeCase(String name) {
		if(checkForCase(name)) {
			casebase.removeCase(name);
			System.out.println("Case " + name + " removed from case base!");	
			return true;
		} else {
			System.out.println("Case " + name + " does not exist!");
			return false;
		}
	}
	
	protected boolean checkForCase(String name) {
		boolean available = false;
		if(casebase.containsCase(name) != null) {
			available = true;
		};
		return available;
	}
	
	protected String caseQuery(Case problemCase) {
		//TODO: check if this works (need more cases)
		System.out.println("Query starts... ");
		System.out.println("Input: " + problemCase.getName());
		Retrieval retrieve = new Retrieval(minesweeperPatternConcept, casebase);
		retrieve.setRetrievalMethod(RetrievalMethod.RETRIEVE_SORTED);
		String[] problemValues = Transform.caseToStringArray(problemCase);
		int attributeCounter = 0;
		Instance query = retrieve.getQueryInstance();
		for(StringDesc attribute : attributes) {
			try {
				query.addAttribute(attribute , attribute.getAttribute(problemValues[attributeCounter]));
				attributeCounter++;
			} catch (ParseException e) {
				System.out.println("Failed!");
			}
		}
		retrieve.start();
		List<Pair<Instance, Similarity>> result = retrieve.getResult();
		System.out.println("Retrieved result:");
		
		ArrayList<Pair<Case, Double>> resultList= new ArrayList<Pair<Case, Double>>();
		int caseAmount = result.size() < Constants.RESULT_ATTRIBTUES_AMOUNT ? result.size() : Constants.RESULT_ATTRIBTUES_AMOUNT;
		for (int i = 0; i < caseAmount; i++) {
			Instance instance = minesweeperPatternConcept.getInstance(result.get(i).getFirst().getName());
			attributeCounter = 0;
			String[] caseValues = new String[Constants.ATTRIBUTES_AMOUNT];
			for(StringDesc attribute : attributes) {
				caseValues[attributeCounter] = instance.getAttForDesc(attribute).getValueAsString();
				attributeCounter++;
			}	
			Case retrievedCase = new Case(caseValues);
			double similarity = result.get(i).getSecond().getValue();
			if(similarity > Constants.MINIMUM_SIMILARITY) {
				resultList.add(new Pair<Case, Double>(retrievedCase, similarity));
				System.out.print("(+) ");
			} else {
				System.out.print("(-) ");
			}
			System.out.println("Case " + retrievedCase.getName() + 
					" fits with a probability of " + Math.floor(similarity * 100) / 100);
		}
		System.out.println("");
		return Transform.caseListToJson(resultList);
	}
}