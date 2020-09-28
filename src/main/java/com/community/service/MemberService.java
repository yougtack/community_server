package com.community.service;

import com.community.model.CheckUserModel;
import com.community.model.MemberModel;
import com.community.model.TestModel;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface MemberService {
    Integer signUp(MemberModel member, HttpServletResponse response);

    MemberModel login(MemberModel member);

    List<MemberModel> getMemberList();

    TestModel getUserInfo(TestModel testModel);

    Integer kickMember(CheckUserModel model, HttpServletResponse response, HttpServletRequest request);
}
