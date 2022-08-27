package minesweeper;

import utils.Constants;

/**
 * The solution of a case, based on the decisive fields and their information type.
 * 
 * @author Marcel N&ouml;hre, 357775
 *
 */
public class Solution {
	private boolean solvability;
	private String[] cells;
	private String[] types;
	
	/**
	 * Creates a empty solution for an incoming case.
	 */
	public Solution() {
		setSolvability(false);
		setCells(new String[] {});
		setTypes(new String[] {});
	}
	
	/**
	 * Creates the solution of a case consisting of the decisive cells and their type.
	 * 
	 * @param solutionValues The solution values in the form of a string array
	 */
	public Solution(String[] solutionValues) {
		setSolvability(solutionValues[0].equals("True"));
		setCells(solutionValues[1].split(Constants.SOLUTION_SEPERATOR));
		setTypes(solutionValues[2].split(Constants.SOLUTION_SEPERATOR));
	}
	
	/**
	 * Creates the solution of a case consisting of the decisive cells and their type.
	 * 
	 * @param solvability The indication whether the case is solvable
	 * @param cells		The decisive cells
	 * @param types		The types of decisive cells
	 */
	public Solution(boolean solvability, String[] cells, String[] types) {
		setSolvability(solvability);
		setCells(cells);
		setTypes(types);
	}

	/**
	 * Creates the solution of a case consisting of the decisive cells and their type.
	 * 
	 * @param solvability The indication whether the case is solvable
	 * @param cells		The decisive cells
	 * @param types		The types of decisive cells
	 */
	public Solution(boolean solvability, String cells, String types) {
		setSolvability(solvability);
		setCells(cells.split(Constants.SOLUTION_SEPERATOR));
		setTypes(types.split(Constants.SOLUTION_SEPERATOR));
	}
	
	/**
	 * Sets the solvability information.
	 * 
	 * @param solvability	The solvability information
	 */
	private void setSolvability(boolean solvability) {
		this.solvability = solvability;
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
	public boolean getSolvability() {
		return solvability;
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
