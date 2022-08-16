package minesweeper;

/**
 *
 * Ein mit einem Namen versehener Fall, der ein 5x5 Pattern und eine L&ouml;sung beinhaltet. 
 *
 * @author Marcel N&ouml;hre, 357775
 *
 */
public class Case {
	private String name;
	private Pattern pattern;
	private Solution solution;
	
	/**
	 * Erstellt einen Fall.
	 * 
	 * @param name		Der Name eines Falls
	 * @param pattern	Das 5x5 Pattern als Situation
	 * @param solution	Die L&ouml;sung des Falls
	 */
	public Case(String name, Pattern pattern, Solution solution) {
		setName(name);
		setPattern(pattern);
		setSolution(solution);
	}

	/**
	 * Legt den Namen des Falls fest.
	 * 
	 * @param name	Der Name des Falls
	 */
	private void setName(String name) {
		this.name = name;
	}
	
	/**
	 * Legt das 5x5 Pattern des Falls fest.
	 * 
	 * @param pattern	Das 5x5 Pattern des Falls
	 */
	private void setPattern(Pattern pattern) {
		this.pattern = pattern;
	}
	
	/**
	 * Legt die L&ouml;sung für des Falls fest.
	 * 
	 * @param solution	Die L&ouml;sung des Falls
	 */
	private void setSolution(Solution solution) {
		this.solution = solution;
	}
	
	/**
	 * Gibt den Namen des Falls zur&uuml;ck.
	 * 
	 * @return	Der Name des Falls
	 */
	public String getName() {
		return this.name;
	}
	
	/**
	 * Gibt das 5x5 Pattern des Falls zur&uuml;ck.
	 * 
	 * @return	Das 5x5 Pattern des Falls
	 */
	public Pattern getPattern() {
		return this.pattern;
	}
	
	/**
	 * Gibt die L&ouml;sung des Falls zur&uuml;ck.
	 * 
	 * @return	Die L&ouml;sung des Falls
	 */
	public Solution getSolution() {
		return this.solution;
	}
}
