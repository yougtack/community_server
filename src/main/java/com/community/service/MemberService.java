package com.community.service;

import com.community.model.MemberModel;

import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Member;

public interface MemberService {
    Integer signUp(MemberModel member, HttpServletResponse response);

    MemberModel login(MemberModel member, HttpServletResponse response);
}
