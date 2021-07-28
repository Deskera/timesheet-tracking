package com.deskera.timetracking.common;

public enum COUNTRY {
	
	IN("India","IN","INR"),
	US("United States of America","US","USD"),
	SG("Singapore","SG","SGD");
	
	
	private String countryName;
	private String abbreviation;
	private String currency;
	
	private COUNTRY(String countryName,String abbreviation, String currency) {
		this.countryName = countryName;
		this.abbreviation = abbreviation;
		this.currency = currency;
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
	
}
