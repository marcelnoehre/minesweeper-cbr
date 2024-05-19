package minesweeper;

/**
 * A 5x5 square representing a situation on the Minesweeper board.
 * 
 * @author Marcel N&ouml;hre, 357775
 * 
 */
public class Pattern {
	private String center;
	private String innerTopLeft;
	private String innerTop;			
	private String innerTopRight;
	private String innerRight;			
	private String innerBottomRight;
	private String innerBottom;			
	private String innerBottomLeft;
	private String innerLeft;
	private String outerTopLeftCorner;
	private String outerTopLeft; 			
	private String outerTop;			
	private String outerTopRight;		
	private String outerTopRightCorner;
	private String outerRightTop;
	private String outerRight;			
	private String outerRightBottom;	
	private String outerBottomRightCorner;
	private String outerBottomRight;
	private String outerBottom;			
	private String outerBottomLeft;	
	private String outerBottomLeftCorner;	
	private String outerLeftBottom;		
	private String outerLeft;	
	private String outerLeftTop;	
	
	/**
	 * Creates a 5x5 Minesweeper Pattern.
	 * 
	 * @param cellValues The values of the cells in a pattern
	 */
	public Pattern(String[] cellValues) {
		setCenter(cellValues[0]);
		setInnerTopLeft(cellValues[1]);
		setInnerTop(cellValues[2]);
		setInnerTopRight(cellValues[3]);
		setInnerRight(cellValues[4]);
		setInnerBottomRight(cellValues[5]);
		setInnerBottom(cellValues[6]);
		setInnerBottomLeft(cellValues[7]);
		setInnerLeft(cellValues[8]);
		setOuterTopLeftCorner(cellValues[9]);
		setOuterTopLeft(cellValues[10]);	
		setOuterTop(cellValues[11]);			
		setOuterTopRight(cellValues[12]);		
		setOuterTopRightCorner(cellValues[13]);
		setOuterRightTop(cellValues[14]);
		setOuterRight(cellValues[15]);	
		setOuterRightBottom(cellValues[16]);
		setOuterBottomRightCorner(cellValues[17]);
		setOuterBottomRight(cellValues[18]);
		setOuterBottom(cellValues[19]);		
		setOuterBottomLeft(cellValues[20]);
		setOuterBottomLeftCorner(cellValues[21]);
		setOuterLeftBottom(cellValues[22]);
		setOuterLeft(cellValues[23]);	
		setOuterLeftTop(cellValues[24]);
	}
	
	/**
	 * Creates a 5x5 Minesweeper Pattern.
	 * 
	 * @param cellValues The values of the cells in a pattern
	 */
	public Pattern(char[] cellValues) {
		setCenter(String.valueOf(cellValues[0]));
		setInnerTopLeft(String.valueOf(cellValues[1]));
		setInnerTop(String.valueOf(cellValues[2]));
		setInnerTopRight(String.valueOf(cellValues[3]));
		setInnerRight(String.valueOf(cellValues[4]));
		setInnerBottomRight(String.valueOf(cellValues[5]));
		setInnerBottom(String.valueOf(cellValues[6]));
		setInnerBottomLeft(String.valueOf(cellValues[7]));
		setInnerLeft(String.valueOf(cellValues[8]));
		setOuterTopLeftCorner(String.valueOf(cellValues[9]));
		setOuterTopLeft(String.valueOf(cellValues[10]));	
		setOuterTop(String.valueOf(cellValues[11]));			
		setOuterTopRight(String.valueOf(cellValues[12]));		
		setOuterTopRightCorner(String.valueOf(cellValues[13]));
		setOuterRightTop(String.valueOf(cellValues[14]));
		setOuterRight(String.valueOf(cellValues[15]));	
		setOuterRightBottom(String.valueOf(cellValues[16]));
		setOuterBottomRightCorner(String.valueOf(cellValues[17]));
		setOuterBottomRight(String.valueOf(cellValues[18]));
		setOuterBottom(String.valueOf(cellValues[19]));		
		setOuterBottomLeft(String.valueOf(cellValues[20]));
		setOuterBottomLeftCorner(String.valueOf(cellValues[21]));
		setOuterLeftBottom(String.valueOf(cellValues[22]));
		setOuterLeft(String.valueOf(cellValues[23]));	
		setOuterLeftTop(String.valueOf(cellValues[24]));
	}
	
	/**
	 * Sets the value of the field with index: 22.
	 * 
	 * @param center	The value of the field with the index: 22
	 */
	private void setCenter(String center) {
		this.center = center;
	}
	
	/**
	 * Sets the value of the field with index: 11.
	 * 
	 * @param innerTopLeft	The value of the field with the index: 11
	 */
	private void setInnerTopLeft(String innerTopLeft) {
		this.innerTopLeft = innerTopLeft;
	}
	
	/**
	 * Sets the value of the field with index: 21.
	 * 
	 * @param innerTop	The value of the field with the index: 21
	 */
	private void setInnerTop(String innerTop) {
		this.innerTop = innerTop;
	}
	
	/**
	 * Sets the value of the field with index: 31.
	 * 
	 * @param innerTopRight	The value of the field with the index: 31
	 */
	private void setInnerTopRight(String innerTopRight) {
		this.innerTopRight = innerTopRight;
	}
	
	/**
	 * Sets the value of the field with index: 32.
	 * 
	 * @param innerRight	The value of the field with the index: 32
	 */
	private void setInnerRight(String innerRight) {
		this.innerRight = innerRight;
	}
	
	/**
	 * Sets the value of the field with index: 33.
	 * 
	 * @param innerBottomRight	The value of the field with the index: 33
	 */
	private void setInnerBottomRight(String innerBottomRight) {
		this.innerBottomRight = innerBottomRight;
	}
	
	/**
	 * Sets the value of the field with index: 23.
	 * 
	 * @param innerBottom	The value of the field with the index: 23
	 */
	private void setInnerBottom(String innerBottom) {
		this.innerBottom = innerBottom;
	}
	
	/**
	 * Sets the value of the field with index: 13.
	 * 
	 * @param innerBottomLeft	The value of the field with the index: 13
	 */
	private void setInnerBottomLeft(String innerBottomLeft) {
		this.innerBottomLeft = innerBottomLeft;
	}
	
	/**
	 * Sets the value of the field with index: 12.
	 * 
	 * @param innerLeft	The value of the field with the index: 12
	 */
	private void setInnerLeft(String innerLeft) {
		this.innerLeft = innerLeft;
	}
	
	/**
	 * Sets the value of the field with index: 00.
	 * 
	 * @param outerTopLeftCorner	The value of the field with the index: 00
	 */
	private void setOuterTopLeftCorner(String outerTopLeftCorner) {
		this.outerTopLeftCorner = outerTopLeftCorner;
	}
	
	/**
	 * Sets the value of the field with index: 10.
	 * 
	 * @param outerTopLeft	The value of the field with the index: 10
	 */
	private void setOuterTopLeft(String outerTopLeft) {
		this.outerTopLeft = outerTopLeft;
	}
	
	/**
	 * Sets the value of the field with index: 20.
	 * 
	 * @param outerTop	The value of the field with the index: 20
	 */
	private void setOuterTop(String outerTop) {
		this.outerTop = outerTop;
	}
	
	/**
	 * Sets the value of the field with index: 30.
	 * 
	 * @param outerTopRight	The value of the field with the index: 30
	 */
	private void setOuterTopRight(String outerTopRight) {
		this.outerTopRight = outerTopRight;
	}
	
	/**
	 * Sets the value of the field with index: 40.
	 * 
	 * @param outerTopRightCorner	The value of the field with the index: 40
	 */
	private void setOuterTopRightCorner(String outerTopRightCorner) {
		this.outerTopRightCorner = outerTopRightCorner;
	}
	
	/**
	 * Sets the value of the field with index: 41.
	 * 
	 * @param outerRightTop	The value of the field with the index: 41
	 */
	private void setOuterRightTop(String outerRightTop) {
		this.outerRightTop = outerRightTop;
	}
	
	/**
	 * Sets the value of the field with index: 42.
	 * 
	 * @param outerRight	The value of the field with the index: 42
	 */
	private void setOuterRight(String outerRight) {
		this.outerRight = outerRight;
	}
	
	/**
	 * Sets the value of the field with index: 43.
	 * 
	 * @param outerRightBottom	The value of the field with the index: 43
	 */
	private void setOuterRightBottom(String outerRightBottom) {
		this.outerRightBottom = outerRightBottom;
	}
	
	/**
	 * Sets the value of the field with index: 44.
	 * 
	 * @param outerBottomRightCorner	The value of the field with the index: 44
	 */
	private void setOuterBottomRightCorner(String outerBottomRightCorner) {
		this.outerBottomRightCorner = outerBottomRightCorner;
	}
	
	/**
	 * Sets the value of the field with index: 34.
	 * 
	 * @param outerBottomRight	The value of the field with the index: 34
	 */
	private void setOuterBottomRight(String outerBottomRight) {
		this.outerBottomRight = outerBottomRight;
	}
	
	/**
	 * Sets the value of the field with index: 24.
	 * 
	 * @param outerBottom	The value of the field with the index: 24
	 */
	private void setOuterBottom(String outerBottom) {
		this.outerBottom = outerBottom;
	}
	
	/**
	 * Sets the value of the field with index: 14.
	 * 
	 * @param outerBottomLeft	The value of the field with the index: 14
	 */
	private void setOuterBottomLeft(String outerBottomLeft) {
		this.outerBottomLeft = outerBottomLeft;
	}
	
	/**
	 * Sets the value of the field with index: 04.
	 * 
	 * @param outerBottomLeftCorner	The value of the field with the index: 04
	 */
	private void setOuterBottomLeftCorner(String outerBottomLeftCorner) {
		this.outerBottomLeftCorner = outerBottomLeftCorner;
	}
	
	/**
	 * Sets the value of the field with index: 03.
	 * 
	 * @param outerLeftBottom	The value of the field with the index: 03
	 */
	private void setOuterLeftBottom(String outerLeftBottom) {
		this.outerLeftBottom = outerLeftBottom;
	}
	
	/**
	 * Sets the value of the field with index: 02.
	 * 
	 * @param outerLeft	The value of the field with the index: 02
	 */
	private void setOuterLeft(String outerLeft) {
		this.outerLeft = outerLeft;
	}
	
	/**
	 * Sets the value of the field with index: 01.
	 * 
	 * @param outerLeftTop	The value of the field with the index: 01
	 */
	private void setOuterLeftTop(String outerLeftTop) {
		this.outerLeftTop = outerLeftTop;
	}
	
	/**
	 * Returns the value of the field with the index: 22.
	 *  
	 * @return	The value of the field with the index: 22
	 */
	public String getCenter() {
		return this.center;
	}
	
	/**
	 * Returns the value of the field with the index: 11.
	 *  
	 * @return	The value of the field with the index: 11
	 */
	public String getInnerTopLeft() {
		return this.innerTopLeft;
	}
	
	/**
	 * Returns the value of the field with the index: 21.
	 *  
	 * @return	The value of the field with the index: 21
	 */
	public String getInnerTop() {
		return this.innerTop;
	}
	
	/**
	 * Returns the value of the field with the index: 31.
	 *  
	 * @return	The value of the field with the index: 31
	 */
	public String getInnerTopRight() {
		return this.innerTopRight;
	}
	
	/**
	 * Returns the value of the field with the index: 32.
	 *  
	 * @return	The value of the field with the index: 32
	 */
	public String getInnerRight() {
		return this.innerRight;
	}
	
	/**
	 * Returns the value of the field with the index: 33.
	 *  
	 * @return	The value of the field with the index: 33
	 */
	public String getInnerBottomRight() {
		return this.innerBottomRight;
	}
	
	/**
	 * Returns the value of the field with the index: 23.
	 *  
	 * @return	The value of the field with the index: 23
	 */
	public String getInnerBottom() {
		return this.innerBottom;
	}
	
	/**
	 * Returns the value of the field with the index: 13.
	 *  
	 * @return	The value of the field with the index: 13
	 */
	public String getInnerBottomLeft() {
		return this.innerBottomLeft;
	}
	
	/**
	 * Returns the value of the field with the index: 12.
	 *  
	 * @return	The value of the field with the index: 12
	 */
	public String getInnerLeft() {
		return this.innerLeft;
	}
	
	/**
	 * Returns the value of the field with the index: 00.
	 *  
	 * @return	The value of the field with the index: 00
	 */
	public String getOuterTopLeftCorner() {
		return this.outerTopLeftCorner;
	}
	
	/**
	 * Returns the value of the field with the index: 10.
	 *  
	 * @return	The value of the field with the index: 10
	 */
	public String getOuterTopLeft() {
		return this.outerTopLeft;
	}
	
	/**
	 * Returns the value of the field with the index: 20.
	 *  
	 * @return	The value of the field with the index: 20
	 */
	public String getOuterTop() {
		return this.outerTop;
	}
	
	/**
	 * Returns the value of the field with the index: 30.
	 *  
	 * @return	The value of the field with the index: 30
	 */
	public String getOuterTopRight() {
		return this.outerTopRight;
	}
	
	/**
	 * Returns the value of the field with the index: 40.
	 *  
	 * @return	The value of the field with the index: 40
	 */
	public String getOuterTopRightCorner() {
		return this.outerTopRightCorner;
	}
	
	/**
	 * Returns the value of the field with the index: 41.
	 *  
	 * @return	The value of the field with the index: 41
	 */
	public String getOuterRightTop() {
		return this.outerRightTop;
	}
	
	/**
	 * Returns the value of the field with the index: 42.
	 *  
	 * @return	The value of the field with the index: 42
	 */
	public String getOuterRight() {
		return this.outerRight;
	}
	
	/**
	 * Returns the value of the field with the index: 43.
	 *  
	 * @return	The value of the field with the index: 43
	 */
	public String getOuterRightBottom() {
		return this.outerRightBottom;
	}
	
	/**
	 * Returns the value of the field with the index: 44.
	 *  
	 * @return	The value of the field with the index: 44
	 */
	public String getOuterBottomRightCorner() {
		return this.outerBottomRightCorner;
	}
	
	/**
	 * Returns the value of the field with the index: 34.
	 *  
	 * @return	The value of the field with the index: 34
	 */
	public String getOuterBottomRight() {
		return this.outerBottomRight;
	}
	
	/**
	 * Returns the value of the field with the index: 24.
	 *  
	 * @return	The value of the field with the index: 24
	 */
	public String getOuterBottom() {
		return this.outerBottom;
	}
	
	/**
	 * Returns the value of the field with the index: 14.
	 *  
	 * @return	The value of the field with the index: 14
	 */
	public String getOuterBottomLeft() {
		return this.outerBottomLeft;
	}
	
	/**
	 * Returns the value of the field with the index: 04.
	 *  
	 * @return	The value of the field with the index: 04
	 */
	public String getOuterBottomLeftCorner() {
		return this.outerBottomLeftCorner;
	}
	
	/**
	 * Returns the value of the field with the index: 03.
	 *  
	 * @return	The value of the field with the index: 03
	 */
	public String getOuterLeftBottom() {
		return this.outerLeftBottom;
	}
	
	/**
	 * Returns the value of the field with the index: 02.
	 *  
	 * @return	The value of the field with the index: 02
	 */
	public String getOuterLeft() {
		return this.outerLeft;
	}
	
	/**
	 * Returns the value of the field with the index: 01.
	 *  
	 * @return	The value of the field with the index: 01
	 */
	public String getOuterLeftTop() {
		return this.outerLeftTop;
	}
}
