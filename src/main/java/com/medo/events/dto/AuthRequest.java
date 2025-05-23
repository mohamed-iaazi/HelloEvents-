package com.medo.events.dto;


import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class AuthRequest {
    private String userName;
    private String password;

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}
