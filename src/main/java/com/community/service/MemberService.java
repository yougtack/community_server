package com.community.service;

import com.community.model.DeleteModel;
import com.community.model.MemberModel;

import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Member;
import java.util.List;

public interface MemberService {
    Integer signUp(MemberModel member, HttpServletResponse response);

    MemberModel login(MemberModel member, HttpServletResponse response);

    List<MemberModel> getMemberList();

    Integer kickMember(DeleteModel model);

    Integer update(MemberModel model);
}
