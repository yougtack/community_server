package com.community.service;

import com.community.model.CheckUserModel;
import com.community.model.MemberModel;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.List;

public interface MemberService {
    Integer signUp(MultipartHttpServletRequest multipartHttpServletRequest, String userId, String userPw) throws IOException;

    MemberModel login(MemberModel member);

    List<MemberModel> getMemberList();

    Integer kickMember(CheckUserModel checkUserModel);
}
