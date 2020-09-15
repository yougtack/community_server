package com.community.service.serviceimpl;

import com.community.dao.MemberDao;
import com.community.model.MemberModel;
import com.community.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Member;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberDao dao;

    @Override
    public Integer signUp(MemberModel member, HttpServletResponse response) {
        int result = 0;
        try{
           result =  dao.signUp(member.getUserId(), member.getUserPw());
        }catch(Exception e){
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
            return result;
    }

    @Override
    public MemberModel login(MemberModel member, HttpServletResponse response){
        MemberModel userInfo = dao.login(member.getUserId(), member.getUserPw());
        if(userInfo != null){
            Cookie cookie = new Cookie("userId", userInfo.getUserId());
            cookie.setMaxAge(-1);
            cookie.setPath("/");

            response.addCookie(cookie);
        }else {
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
        return userInfo;
    }
}
