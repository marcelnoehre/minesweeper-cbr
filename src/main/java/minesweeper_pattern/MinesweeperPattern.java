package minesweeper_pattern;

public class MinesweeperPattern {
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
	
	public MinesweeperPattern(
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
	
	private void setCenter(String center) {
		this.center = center;
	}
	
	private void setInnerTopLeft(String innerTopLeft) {
		this.innerTopLeft = innerTopLeft;
	}
	
	private void setInnerTop(String innerTop) {
		this.innerTop = innerTop;
	}
	
	private void setInnerTopRight(String innerTopRight) {
		this.innerTopRight = innerTopRight;
	}
	
	private void setInnerRight(String innerRight) {
		this.innerRight = innerRight;
	}
	
	private void setInnerBottomRight(String innerBottomRight) {
		this.innerBottomRight = innerBottomRight;
	}
	
	private void setInnerBottom(String innerBottom) {
		this.innerBottom = innerBottom;
	}
	
	private void setInnerBottomLeft(String innerBottomLeft) {
		this.innerBottomLeft = innerBottomLeft;
	}
	
	private void setInnerLeft(String innerLeft) {
		this.innerLeft = innerLeft;
	}
	
	private void setOuterTopLeftCorner(String outerTopLeftCorner) {
		this.outerTopLeftCorner = outerTopLeftCorner;
	}
	
	private void setOuterTopLeft(String outerTopLeft) {
		this.outerTopLeft = outerTopLeft;
	}
	
	private void setOuterTop(String outerTop) {
		this.outerTop = outerTop;
	}
	
	private void setOuterTopRight(String outerTopRight) {
		this.outerTopRight = outerTopRight;
	}
	
	private void setOuterTopRightCorner(String outerTopRightCorner) {
		this.outerTopRightCorner = outerTopRightCorner;
	}
	
	private void setOuterRightTop(String outerRightTop) {
		this.outerRightTop = outerRightTop;
	}
	
	private void setOuterRight(String outerRight) {
		this.outerRight = outerRight;
	}
	
	private void setOuterRightBottom(String outerRightBottom) {
		this.outerRightBottom = outerRightBottom;
	}
	
	private void setOuterBottomRightCorner(String outerBottomRightCorner) {
		this.outerBottomRightCorner = outerBottomRightCorner;
	}
	
	private void setOuterBottomRight(String outerBottomRight) {
		this.outerBottomRight = outerBottomRight;
	}
	
	private void setOuterBottom(String outerBottom) {
		this.outerBottom = outerBottom;
	}
	
	private void setOuterBottomLeft(String outerBottomLeft) {
		this.outerBottomLeft = outerBottomLeft;
	}
	
	private void setOuterBottomLeftCorner(String outerBottomLeftCorner) {
		this.outerBottomLeftCorner = outerBottomLeftCorner;
	}
	
	private void setOuterLeftBottom(String outerLeftBottom) {
		this.outerLeftBottom = outerLeftBottom;
	}
	
	private void setOuterLeft(String outerLeft) {
		this.outerLeft = outerLeft;
	}
	
	private void setOuterLeftTop(String outerLeftTop) {
		this.outerLeftTop = outerLeftTop;
	}
	
	
	
	public String getCenter() {
		return this.center;
	}
	
	public String getInnerTopLeft() {
		return this.innerTopLeft;
	}
	
	public String getInnerTop() {
		return this.innerTop;
	}
	
	public String getInnerTopRight() {
		return this.innerTopRight;
	}
	
	public String getInnerRight() {
		return this.innerRight;
	}
	
	public String getInnerBottomRight() {
		return this.innerBottomRight;
	}
	
	public String getInnerBottom() {
		return this.innerBottom;
	}
	
	public String getInnerBottomLeft() {
		return this.innerBottomLeft;
	}
	
	public String getInnerLeft() {
		return this.innerLeft;
	}
	
	public String getOuterTopLeftCorner() {
		return this.outerTopLeftCorner;
	}
	
	public String getOuterTopLeft() {
		return this.outerTopLeft;
	}
	
	public String getOuterTop() {
		return this.outerTop;
	}
	
	public String getOuterTopRight() {
		return this.outerTopRight;
	}
	
	public String getOuterTopRightCorner() {
		return this.outerTopRightCorner;
	}
	
	public String getOuterRightTop() {
		return this.outerRightTop;
	}
	
	public String getOuterRight() {
		return this.outerRight;
	}
	
	public String getOuterRightBottom() {
		return this.outerRightBottom;
	}
	
	public String getOuterBottomRightCorner() {
		return this.outerBottomRightCorner;
	}
	
	public String getOuterBottomRight() {
		return this.outerBottomRight;
	}
	
	public String getOuterBottom() {
		return this.outerBottom;
	}
	
	public String getOuterBottomLeft() {
		return this.outerBottomLeft;
	}
	
	public String getOuterBottomLeftCorner() {
		return this.outerBottomLeftCorner;
	}
	
	public String getOuterLeftBottom() {
		return this.outerLeftBottom;
	}
	
	public String getOuterLeft() {
		return this.outerLeft;
	}
	
	public String getOuterLeftTop() {
		return this.outerLeftTop;
	}
}
