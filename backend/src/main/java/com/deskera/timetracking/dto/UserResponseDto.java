package com.deskera.timetracking.dto;

public class UserResponseDto {
	private long userId;
	private UserDto userDto;
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public UserDto getUserDto() {
		return userDto;
	}
	public void setUserDto(UserDto userDto) {
		this.userDto = userDto;
	}
	
	public UserResponseDto(){}
	
	public UserResponseDto(long userId, UserDto userDto) {
		this.userId = userId;
		this.userDto = userDto;
	}
	
}
