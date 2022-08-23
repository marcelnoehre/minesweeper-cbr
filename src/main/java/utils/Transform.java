package utils;

import org.json.simple.JSONObject;

import minesweeper.Case;

public class Transform {
	protected static Case jsonToCase(JSONObject jsonCase) {
		//TODO: check if this works
		int i = 0;
		String[] caseArray = new String[Constants.ATTRIBUTES_AMOUNT];
		for(String attributeName : Constants.ATTRIBUTE_NAMES) {
			caseArray[i] = (String) jsonCase.get(attributeName);
		}
		return new Case(caseArray);		
	}
}
