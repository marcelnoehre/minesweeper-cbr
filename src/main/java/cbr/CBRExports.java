package cbr;

import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

import de.dfki.mycbr.core.Project;
import de.dfki.mycbr.io.XMLExporter;

import minesweeper.Case;

public class CBRExports {

	protected static void exportProject(Project project) throws IOException {
		new CBRUtils().getPath();
		XMLExporter.save(project, new CBRUtils().getPath() + CBRProject.NAME);
	}
	
	protected static void exportCasesAsCsv(String name, ArrayList<Case> caseList) {
		//TODO: bugfix - not working
		try {
            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(new CBRUtils().getPath() + name), "UTF-8"));
            for (Case caseElement: caseList) {
                StringBuffer line = new StringBuffer();
                line.append(caseElement.getPattern().getCenter() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getInnerTopLeft() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getInnerTop() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getInnerTopRight() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getInnerRight() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getInnerBottomRight() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getInnerBottom() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getInnerBottomLeft() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getInnerLeft() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterTopLeftCorner() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterTopLeft() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterTop() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterTopRight() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterTopRightCorner() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterRightTop() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterRight() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterRightBottom() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterBottomRightCorner() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterBottomRight() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterBottom() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterBottomLeft() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterBottomLeftCorner() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterLeftBottom() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterLeft() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getPattern().getOuterLeftTop() + CBRUtils.CSV_SEPARATOR);
                line.append(caseElement.getSolution().getSolveable() + CBRUtils.CSV_SEPARATOR);
                line.append(CBRUtils.transformStringArray(caseElement.getSolution().getCells()) + CBRUtils.CSV_SEPARATOR);
                line.append(CBRUtils.transformStringArray(caseElement.getSolution().getTypes()));
                bufferedWriter.write(line.toString());
                bufferedWriter.newLine();
            }
            bufferedWriter.flush();
            bufferedWriter.close();
        }
        catch (UnsupportedEncodingException e) {}
        catch (FileNotFoundException e){}
        catch (IOException e){}
	}
}
