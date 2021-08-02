package com.deskera.timetracking.common;

public enum COUNTRY {
	
	SG("SG", "SGD", "Singapore"),
	US("US", "USD", "United States of America"),
	MY("MY", "MYR", "Malaysia"),
	AU("AU", "AUD", "Australia"),
	CA("CA", "CAD", "Canada"),
	ID("ID", "IDR", "Indonesia"),
	IN("IN", "INR", "India"),
	UK("GB", "GBP", "United Kingdom of Great Britain and Northern Ireland");
	
	
	private String abbreviation;
	private String currency;
	private String countryName;
	
	private COUNTRY(String abbreviation, String currency,String countryName) {
		this.abbreviation = abbreviation;
		this.currency = currency;
		this.countryName = countryName;
	}

	public String getCountryName() {
		return countryName;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public String getCurrency() {
		return currency;
	}
	
	public static Boolean isExist(String name) {
        if(name.isBlank()) {
            return false;
        }

        for(COUNTRY item : COUNTRY.values()) {
            if(name.equals(item.abbreviation)) {
                return true;
            }
        }
        return false;
    }
	
}
