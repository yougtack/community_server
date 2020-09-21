package com.community.controller;

import com.community.model.CheckUserModel;
import com.community.model.MemberModel;
import com.community.model.TestModel;
import com.community.service.MemberService;
import com.community.util.LoginUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/member")
public class MemberController {

    @Autowired
    MemberService memberService;


    //회원가입
    @CrossOrigin("*")
    @PostMapping(value = "/signUp")
    public Integer SignUp(@RequestBody MemberModel member, HttpServletResponse response){
        return  memberService.signUp(member, response);
    }

    //로그인
    @CrossOrigin("*")
    @PostMapping(value = "/login")
    public MemberModel Login(@RequestBody MemberModel member, HttpServletResponse response, HttpServletRequest request){
        boolean isApp = LoginUtil.isApp( request );
        MemberModel userInfo = memberService.login(member);
        if(userInfo != null){
            if(!isApp){
                Cookie cookie = new Cookie("userId", userInfo.getUserId());
                cookie.setMaxAge(-1);
                cookie.setPath("/");

                response.addCookie(cookie);
            }
        }else {
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
        return userInfo;
    }

    //로그아웃
    @CrossOrigin("*")
    @GetMapping(value = "/logout")
    public String logout(HttpServletResponse response){
        Cookie cookie = new Cookie("userId", "tmp");
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        return "logout!!";
    }

    //계정정보 가져오기
    @GetMapping(value = "/userInfo")
    public TestModel getUserInfo(@RequestBody TestModel testModel){
        return memberService.getUserInfo(testModel);
    }

    //회원리스트가져오기
    @CrossOrigin("*")
    @GetMapping(value = "/memberList")
    public List<MemberModel> memberList(){
        return memberService.getMemberList();
    }

    //회원탈퇴시키기
    @CrossOrigin("*")
    @DeleteMapping
    public Integer kickMember(@RequestBody CheckUserModel model, HttpServletResponse response, HttpServletRequest request){
        return memberService.kickMember(model, response, request);
    }
}
