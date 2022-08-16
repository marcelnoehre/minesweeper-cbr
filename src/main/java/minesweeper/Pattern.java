package minesweeper;

/**
 * Ein 5x5 gro&szlig;es Feld das eine Situation auf dem Minesweeper Spielfeld repr&auml;sentiert.
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
	 * Erstellt ein 5x5 gro&szlig;es Minesweeper Spielfeld.
	 * 
	 * @param center 					Das Feld mit dem Index: 22
	 * @param innerTopLeft				Das Feld mit dem Index: 11
	 * @param innerTop					Das Feld mit dem Index: 21
	 * @param innerTopRight				Das Feld mit dem Index: 31
	 * @param innerRight				Das Feld mit dem Index: 32
	 * @param innerBottomRight			Das Feld mit dem Index: 33
	 * @param innerBottom				Das Feld mit dem Index: 23
	 * @param innerBottomLeft			Das Feld mit dem Index: 13
	 * @param innerLeft					Das Feld mit dem Index: 12
	 * @param outerTopLeftCorner		Das Feld mit dem Index: 00
	 * @param outerTopLeft				Das Feld mit dem Index: 10
	 * @param outerTop					Das Feld mit dem Index: 20
	 * @param outerTopRight				Das Feld mit dem Index: 30
	 * @param outerTopRightCorner		Das Feld mit dem Index: 40
	 * @param outerRightTop				Das Feld mit dem Index: 41
	 * @param outerRight				Das Feld mit dem Index: 42
	 * @param outerRightBottom			Das Feld mit dem Index: 43
	 * @param outerBottomRightCorner	Das Feld mit dem Index: 44
	 * @param outerBottomRight			Das Feld mit dem Index: 34
	 * @param outerBottom				Das Feld mit dem Index: 24
	 * @param outerBottomLeft			Das Feld mit dem Index: 14
	 * @param outerBottomLeftCorner		Das Feld mit dem Index: 04
	 * @param outerLeftBottom			Das Feld mit dem Index: 03
	 * @param outerLeft					Das Feld mit dem Index: 02
	 * @param outerLeftTop				Das Feld mit dem Index: 01
	 */
	public Pattern(
			String center,
			String innerTopLeft,
			String innerTop,		
			String innerTopRight,
			String innerRight,			
			String innerBottomRight,
			String innerBottom,		
			String innerBottomLeft,
			String innerLeft,
			String outerTopLeftCorner,
			String outerTopLeft,			
			String outerTop,			
			String outerTopRight,		
			String outerTopRightCorner,
			String outerRightTop,
			String outerRight,		
			String outerRightBottom,	
			String outerBottomRightCorner,
			String outerBottomRight,
			String outerBottom,		
			String outerBottomLeft,
			String outerBottomLeftCorner,
			String outerLeftBottom,	
			String outerLeft,	
			String outerLeftTop
			) {
		setCenter(center);
		setInnerTopLeft(innerTopLeft);
		setInnerTop(innerTop);
		setInnerTopRight(innerTopRight);
		setInnerRight(innerRight);
		setInnerBottomRight(innerBottomRight);
		setInnerBottom(innerBottom);
		setInnerBottomLeft(innerBottomLeft);
		setInnerLeft(innerLeft);
		setOuterTopLeftCorner(outerTopLeftCorner);
		setOuterTopLeft(outerTopLeft);	
		setOuterTop(outerTop);			
		setOuterTopRight(outerTopRight);		
		setOuterTopRightCorner(outerTopRightCorner);
		setOuterRightTop(outerRightTop);
		setOuterRight(outerRight);	
		setOuterRightBottom(outerRightBottom);
		setOuterBottomRightCorner(outerBottomRightCorner);
		setOuterBottomRight(outerBottomRight);
		setOuterBottom(outerBottom);		
		setOuterBottomLeft(outerBottomLeft);
		setOuterBottomLeftCorner(outerBottomLeftCorner);
		setOuterLeftBottom(outerLeftBottom);
		setOuterLeft(outerLeft);	
		setOuterLeftTop(outerLeftTop);
	}
	
	/**
	 * Legt das Feld mit dem Index: 22 fest.
	 * 
	 * @param center Das Feld mit dem Index: 22
	 */
	private void setCenter(String center) {
		this.center = center;
	}
	
	/**
	 * Legt das Feld mit dem Index: 11 fest.
	 * 
	 * @param innerTopLeft Das Feld mit dem Index: 11
	 */
	private void setInnerTopLeft(String innerTopLeft) {
		this.innerTopLeft = innerTopLeft;
	}
	
	/**
	 * Legt das Feld mit dem Index: 21 fest.
	 * 
	 * @param innerTop Das Feld mit dem Index: 21
	 */
	private void setInnerTop(String innerTop) {
		this.innerTop = innerTop;
	}
	
	/**
	 * Legt das Feld mit dem Index: 31 fest.
	 * 
	 * @param innerTopRight Das Feld mit dem Index: 31
	 */
	private void setInnerTopRight(String innerTopRight) {
		this.innerTopRight = innerTopRight;
	}
	
	/**
	 * Legt das Feld mit dem Index: 32 fest.
	 * 
	 * @param innerRight Das Feld mit dem Index: 32
	 */
	private void setInnerRight(String innerRight) {
		this.innerRight = innerRight;
	}
	
	/**
	 * Legt das Feld mit dem Index: 33 fest.
	 * 
	 * @param innerBottomRight Das Feld mit dem Index: 33
	 */
	private void setInnerBottomRight(String innerBottomRight) {
		this.innerBottomRight = innerBottomRight;
	}
	
	/**
	 * Legt das Feld mit dem Index: 23 fest.
	 * 
	 * @param innerBottom Das Feld mit dem Index: 23
	 */
	private void setInnerBottom(String innerBottom) {
		this.innerBottom = innerBottom;
	}
	
	/**
	 * Legt das Feld mit dem Index: 13 fest.
	 * 
	 * @param innerBottomLeft Das Feld mit dem Index: 13
	 */
	private void setInnerBottomLeft(String innerBottomLeft) {
		this.innerBottomLeft = innerBottomLeft;
	}
	
	/**
	 * Legt das Feld mit dem Index: 12 fest.
	 * 
	 * @param innerLeft Das Feld mit dem Index: 12
	 */
	private void setInnerLeft(String innerLeft) {
		this.innerLeft = innerLeft;
	}
	
	/**
	 * Legt das Feld mit dem Index: 00 fest.
	 * 
	 * @param outerTopLeftCorner Das Feld mit dem Index: 00
	 */
	private void setOuterTopLeftCorner(String outerTopLeftCorner) {
		this.outerTopLeftCorner = outerTopLeftCorner;
	}
	
	/**
	 * Legt das Feld mit dem Index: 10 fest.
	 * 
	 * @param outerTopLeft Das Feld mit dem Index: 10
	 */
	private void setOuterTopLeft(String outerTopLeft) {
		this.outerTopLeft = outerTopLeft;
	}
	
	/**
	 * Legt das Feld mit dem Index: 20 fest.
	 * 
	 * @param outerTop Das Feld mit dem Index: 20
	 */
	private void setOuterTop(String outerTop) {
		this.outerTop = outerTop;
	}
	
	/**
	 * Legt das Feld mit dem Index: 30 fest.
	 * 
	 * @param outerTopRight Das Feld mit dem Index: 30
	 */
	private void setOuterTopRight(String outerTopRight) {
		this.outerTopRight = outerTopRight;
	}
	
	/**
	 * Legt das Feld mit dem Index: 40 fest.
	 * 
	 * @param outerTopRightCorner Das Feld mit dem Index: 40
	 */
	private void setOuterTopRightCorner(String outerTopRightCorner) {
		this.outerTopRightCorner = outerTopRightCorner;
	}
	
	/**
	 * Legt das Feld mit dem Index: 41 fest.
	 * 
	 * @param outerRightTop Das Feld mit dem Index: 41
	 */
	private void setOuterRightTop(String outerRightTop) {
		this.outerRightTop = outerRightTop;
	}
	
	/**
	 * Legt das Feld mit dem Index: 42 fest.
	 * 
	 * @param outerRight Das Feld mit dem Index: 42
	 */
	private void setOuterRight(String outerRight) {
		this.outerRight = outerRight;
	}
	
	/**
	 * Legt das Feld mit dem Index: 43 fest.
	 * 
	 * @param outerRightBottom Das Feld mit dem Index: 43
	 */
	private void setOuterRightBottom(String outerRightBottom) {
		this.outerRightBottom = outerRightBottom;
	}
	
	/**
	 * Legt das Feld mit dem Index: 44 fest.
	 * 
	 * @param outerBottomRightCorner Das Feld mit dem Index: 44
	 */
	private void setOuterBottomRightCorner(String outerBottomRightCorner) {
		this.outerBottomRightCorner = outerBottomRightCorner;
	}
	
	/**
	 * Legt das Feld mit dem Index: 34 fest.
	 * 
	 * @param outerBottomRight Das Feld mit dem Index: 34
	 */
	private void setOuterBottomRight(String outerBottomRight) {
		this.outerBottomRight = outerBottomRight;
	}
	
	/**
	 * Legt das Feld mit dem Index: 24 fest.
	 * 
	 * @param outerBottom Das Feld mit dem Index: 24
	 */
	private void setOuterBottom(String outerBottom) {
		this.outerBottom = outerBottom;
	}
	
	/**
	 * Legt das Feld mit dem Index: 14 fest.
	 * 
	 * @param outerBottomLeft Das Feld mit dem Index: 14
	 */
	private void setOuterBottomLeft(String outerBottomLeft) {
		this.outerBottomLeft = outerBottomLeft;
	}
	
	/**
	 * Legt das Feld mit dem Index: 04 fest.
	 * 
	 * @param outerBottomLeftCorner Das Feld mit dem Index: 04
	 */
	private void setOuterBottomLeftCorner(String outerBottomLeftCorner) {
		this.outerBottomLeftCorner = outerBottomLeftCorner;
	}
	
	/**
	 * Legt das Feld mit dem Index: 03 fest.
	 * 
	 * @param outerLeftBottom Das Feld mit dem Index: 03
	 */
	private void setOuterLeftBottom(String outerLeftBottom) {
		this.outerLeftBottom = outerLeftBottom;
	}
	
	/**
	 * Legt das Feld mit dem Index: 02 fest.
	 * 
	 * @param outerLeft Das Feld mit dem Index: 02
	 */
	private void setOuterLeft(String outerLeft) {
		this.outerLeft = outerLeft;
	}
	
	/**
	 * Legt das Feld mit dem Index: 01 fest.
	 * 
	 * @param outerLeftTop Das Feld mit dem Index: 01
	 */
	private void setOuterLeftTop(String outerLeftTop) {
		this.outerLeftTop = outerLeftTop;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 22 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 22
	 */
	protected String getCenter() {
		return this.center;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 11 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 11
	 */
	protected String getInnerTopLeft() {
		return this.innerTopLeft;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 21 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 21
	 */
	protected String getInnerTop() {
		return this.innerTop;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 31 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 31
	 */
	protected String getInnerTopRight() {
		return this.innerTopRight;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 32 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 32
	 */
	protected String getInnerRight() {
		return this.innerRight;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 33 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 33
	 */
	protected String getInnerBottomRight() {
		return this.innerBottomRight;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 23 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 23
	 */
	protected String getInnerBottom() {
		return this.innerBottom;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 13 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 13
	 */
	protected String getInnerBottomLeft() {
		return this.innerBottomLeft;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 12 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 12
	 */
	protected String getInnerLeft() {
		return this.innerLeft;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 00 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 00
	 */
	protected String getOuterTopLeftCorner() {
		return this.outerTopLeftCorner;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 10 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 10
	 */
	protected String getOuterTopLeft() {
		return this.outerTopLeft;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 20 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 20
	 */
	protected String getOuterTop() {
		return this.outerTop;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 30 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 30
	 */
	protected String getOuterTopRight() {
		return this.outerTopRight;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 40 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 40
	 */
	protected String getOuterTopRightCorner() {
		return this.outerTopRightCorner;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 41 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 41
	 */
	protected String getOuterRightTop() {
		return this.outerRightTop;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 42 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 42
	 */
	protected String getOuterRight() {
		return this.outerRight;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 43 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 43
	 */
	protected String getOuterRightBottom() {
		return this.outerRightBottom;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 44 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 44
	 */
	protected String getOuterBottomRightCorner() {
		return this.outerBottomRightCorner;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 34 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 34
	 */
	protected String getOuterBottomRight() {
		return this.outerBottomRight;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 24 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 24
	 */
	protected String getOuterBottom() {
		return this.outerBottom;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 14 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 14
	 */
	protected String getOuterBottomLeft() {
		return this.outerBottomLeft;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 04 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 04
	 */
	protected String getOuterBottomLeftCorner() {
		return this.outerBottomLeftCorner;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 03 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 03
	 */
	protected String getOuterLeftBottom() {
		return this.outerLeftBottom;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 02 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 02
	 */
	protected String getOuterLeft() {
		return this.outerLeft;
	}
	
	/**
	 * Gibt das Feld mit dem Index: 01 zur&uuml;ck.
	 *  
	 * @return Das Feld mit dem Index: 01
	 */
	protected String getOuterLeftTop() {
		return this.outerLeftTop;
	}
}
