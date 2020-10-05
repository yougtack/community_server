package com.community.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberModel {
    private String userId;
    private String userPw;
    private byte[] profile;
}
