package minesweeper;

import cbr.CBRConstants;

/**
 * The solution of a case, based on the decisive fields and their information type.
 * 
 * @author Marcel N&ouml;hre, 357775
 *
 */
public class Solution {
	private boolean solveable;
	private String[] cells;
	private String[] types;
	
	/**
	 * Creates the solution of a case consisting of the decisive cells and their type.
	 * 
	 * @param solutionValues The solution values in the form of a string array
	 */
	public Solution(String[] solutionValues) {
		setSolvable(solutionValues[0].equals("True"));
		setCells(solutionValues[1].split(CBRConstants.SOLUTION_SEPERATOR));
		setTypes(solutionValues[2].split(CBRConstants.SOLUTION_SEPERATOR));
	}
	
	/**
	 * Creates the solution of a case consisting of the decisive cells and their type.
	 * 
	 * @param cells	The decisive cells
	 * @param types	The types of decisive cells
	 */
	public Solution(boolean solveable, String cells, String types) {
		setSolvable(solveable);
		setCells(cells.split(CBRConstants.SOLUTION_SEPERATOR));
		setTypes(types.split(CBRConstants.SOLUTION_SEPERATOR));
	}
	
	/**
	 * Sets the solvability information.
	 * 
	 * @param solveable	The solvability information
	 */
	private void setSolvable(boolean solveable) {
		this.solveable = solveable;
	}
	
	/**
	 * Sets the decisive cells.
	 * 
	 * @param cells	The decisive cells
	 */
	private void setCells(String[] cells) {
		this.cells = cells;
	}
	
	/**
	 * Sets the type of decisive cells.
	 * 
	 * @param types	The types of the decisive cells
	 */
	private void setTypes(String[] types) {
		this.types = types;
	}
	
	/**
	 * Returns the solvability information.
	 *
	 * @return	The solvability information
	 */
	public boolean getSolveable() {
		return solveable;
	}
	
	/**
	 * Returns the decisive cells.
	 * 
	 * @return	The decisive cells
	 */
	public String[] getCells() {
		return this.cells;
	}
	
	/**
	 * Returns the types of decisive cells.
	 * 
	 * @return	The types of the decisive cells
	 */
	public String[] getTypes() {
		return this.types;
	}
}
