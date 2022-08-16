package minesweeper;

/**
 * Die Lösung eines Falls, welche die Position des zu w&auml;lenden Felds und eine 
 * dazugehörige L&ouml;sungebeschreibung beinhaltet.
 * 
 * @author Marcel N&ouml;hre, 357775
 *
 */
public class Solution {
	private String solution;
	private String[] solutionSteps;
	
	/**
	 * Erstellt die L&ouml;sung f&uuml;r einen Fall.
	 * 
	 * @param solution		Die L&ouml;sung f&uuml;r einen Fall
	 * @param solutionSteps	Die L&ouml;sungsschritte die zu der angegebenen L&ouml;sung f&uuml;hren.
	 */
	public Solution(String solution, String[] solutionSteps) {
		setSolution(solution);
		setSolutionSteps(solutionSteps);
	}
	
	/**
	 * Legt die L&ouml;sung eines Falls fest.
	 * 
	 * @param solution Die L&ouml;sung eines Falls
	 */
	private void setSolution(String solution) {
		this.solution = solution;
	}
	
	/**
	 * Legt die L&ouml;sungsschritte eines Falls fest.
	 * 
	 * @param solutionSteps Die L&ouml;sungsschritte eines Falls
	 */
	private void setSolutionSteps(String[] solutionSteps) {
		this.solutionSteps = solutionSteps;
	}
	
	/**
	 * Gibt die L&ouml;sung eines Falls zur&uuml;ck.
	 * 
	 * @return Die L&ouml;sung eines Falls
	 */
	public String getSolution() {
		return this.solution;
	}
	
	/**
	 * Gibt die L&ouml;sungsschritte eines Falls zur&uuml;ck.
	 * 
	 * @return Die L&ouml;sungsschritte eines Falls 
	 */
	public String[] getSolutionSteps() {
		return this.solutionSteps;
	}
	
}
