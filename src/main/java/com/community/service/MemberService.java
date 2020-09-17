package com.community.service;

import com.community.model.CheckUserModel;
import com.community.model.MemberModel;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface MemberService {
    Integer signUp(MemberModel member, HttpServletResponse response);

    MemberModel login(MemberModel member);

    List<MemberModel> getMemberList();

    Integer kickMember(CheckUserModel model, HttpServletResponse response, HttpServletRequest request);

    Integer update(MemberModel model, HttpServletResponse response, HttpServletRequest request);
}
