package minesweeper;

/**
 * Die Lösung eines Falls, welche die Position des zu w&auml;lenden Felds und eine 
 * dazugehörige L&ouml;sungebeschreibung beinhaltet.
 * 
 * @author Marcel N&ouml;hre, 357775
 *
 */
public class Solution {
	private int row;
	private int column;
	private String solution;
	private String[] solutionSteps;
	
	/**
	 * Erstellt die L&ouml;sung f&uuml;r einen Fall.
	 * 
	 * @param row			Die Zeilenangabe des Zielfelds
	 * @param column		Die Spaltenangabe des Zielfelds
	 * @param solution		Die L&ouml;sung f&uuml;r einen Fall
	 * @param solutionSteps	Die L&ouml;sungsschritte die zu der angegebenen L&ouml;sung f&uuml;hren.
	 */
	public Solution(int row, int column, String solution, String[] solutionSteps) {
		setRow(row);
		setColumn(column);
		setSolution(solution);
		setSolutionSteps(solutionSteps);
	}
	
	/**
	 * Legt die Zeilenangabe des Ziels fest.
	 * 
	 * @param row Die Zeilenangabe des Ziels
	 */
	private void setRow(int row) {
		this.row = row;
	}
	
	/**
	 * Legt die Spaltenangabe des Ziels fest.
	 * 
	 * @param column Die Spaltenangabe des Ziels
	 */
	private void setColumn(int column) {
		this.column = column;
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
	 * Gibt die Zeilenangabe des Ziels zur&uuml;ck.
	 * 
	 * @return Die Zeilenangabe des Ziels
	 */
	protected int getRow() {
		return this.row;
	}
	
	/**
	 * Gibt die Spaltenangabe des Ziels zur&uuml;ck.
	 * 
	 * @return Die Spaltenangabe des Ziels
	 */
	protected int getColumn() {
		return this.column;
	}
	
	/**
	 * Gibt die L&ouml;sung eines Falls zur&uuml;ck.
	 * 
	 * @return Die L&ouml;sung eines Falls
	 */
	protected String solution() {
		return this.solution;
	}
	
	/**
	 * Gibt die L&ouml;sungsschritte eines Falls zur&uuml;ck.
	 * 
	 * @return Die L&ouml;sungsschritte eines Falls 
	 */
	protected String[] solutionSteps() {
		return this.solutionSteps;
	}
	
}
