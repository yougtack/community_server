package com.community.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginModel {
    private String encode;
    private String userId;
    private byte[] profile;
}
