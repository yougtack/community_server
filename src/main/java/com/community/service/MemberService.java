package com.community.service;

import com.community.model.LoginModel;
import com.community.model.MemberModel;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.List;

public interface MemberService {
    Integer signUp(MemberModel memberModel, String encode);

    Integer signUpProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId) throws IOException;

    LoginModel login(MemberModel member);

    List<MemberModel> getMemberList();

    Integer kickMember(MemberModel memberModel);

    Integer updateProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId) throws IOException;

    Integer updateUser(MemberModel memberModel);

    LoginModel getUserInfo(MemberModel memberModel);
}
