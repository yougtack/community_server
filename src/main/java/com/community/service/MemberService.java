package com.community.service;

import com.community.model.LoginModel;
import com.community.model.MemberListModel;
import com.community.model.MemberModel;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

public interface MemberService {
    Integer signUp(MemberModel memberModel, String encode);

    Integer signUpProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId, HttpServletRequest request) throws IOException;

    LoginModel login(MemberModel member);

    List<MemberListModel> getMemberList();

    Integer kickMember(MemberModel memberModel, HttpServletRequest request);

    Integer updateProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId, HttpServletRequest request) throws IOException;

    Integer updateUser(MemberModel memberModel);

    LoginModel getUserInfo(MemberModel memberModel);
}
