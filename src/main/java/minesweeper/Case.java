package minesweeper;

import cbr.CBRConstants;

/**
 *
 * A uniquely named case that includes a 5x5 pattern and solution.
 *
 * @author Marcel N&ouml;hre, 357775
 *
 */
public class Case {
	private String name;
	private Pattern pattern;
	private Solution solution;
	
	public Case(String[] caseValues) {
		String[] patternArray = new String[CBRConstants.CELLS_AMOUNT];
		String name = "";
		for(int i = 0; i < CBRConstants.CELLS_AMOUNT; i++) {
			patternArray[i] = caseValues[i];
			name += caseValues[i];
		}
		String[] solutionArray = new String[CBRConstants.SOLUTION_AMOUNT];
		for(int i = 0; i < CBRConstants.SOLUTION_AMOUNT; i++) {
			solutionArray[i] = caseValues[i + CBRConstants.CELLS_AMOUNT];
		}
		setName(name);
		setPattern(new Pattern(patternArray));
		setSolution(new Solution(solutionArray));
	}
	
	/**
	 * Creates a case.
	 * 
	 * @param name		The name of a case
	 * @param pattern	The 5x5 pattern that represents the situation
	 * @param solution	The solution of the case
	 */
	public Case(String name, Pattern pattern, Solution solution) {
		setName(name);
		setPattern(pattern);
		setSolution(solution);
	}

	/**
	 * Sets the name of the case.
	 * 
	 * @param name	The name of a case
	 */
	private void setName(String name) {
		this.name = name;
	}
	
	/**
	 * Sets the 5x5 pattern that represents the situation.
	 * 
	 * @param pattern	The 5x5 pattern that represents the situation
	 */
	private void setPattern(Pattern pattern) {
		this.pattern = pattern;
	}
	
	/**
	 * Sets the solution of the case.
	 * 
	 * @param solution	The solution of a case
	 */
	private void setSolution(Solution solution) {
		this.solution = solution;
	}
	
	/**
	 * Returns the name of the case.
	 * 
	 * @return	The name of the case
	 */
	public String getName() {
		return this.name;
	}
	
	/**
	 * Returns the 5x5 pattern that represents the situation.
	 * 
	 * @return	The 5x5 pattern that represents the situation
	 */
	public Pattern getPattern() {
		return this.pattern;
	}
	
	/**
	 * Returns the solution of the case.
	 * 
	 * @return	The solution of the case
	 */
	public Solution getSolution() {
		return this.solution;
	}
}
