package com.deskera.timetracking.common;

public enum GENDER {
	FEMALE("FEMALE"),
	MALE("MALE"),
	OTHER("OTHER");
	
	String gender;
	
	private GENDER(String gender) {
		this.gender = gender;
	}

	public static Boolean isExist(String name) {
        if(name.isBlank()) {
            return false;
        }

        for(GENDER item : GENDER.values()) {
            if(name.equals(item.gender)) {
                return true;
            }
        }
        return false;
    }
}
