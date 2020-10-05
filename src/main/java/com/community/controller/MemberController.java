package com.community.controller;

import com.community.model.CheckUserModel;
import com.community.model.MemberModel;
import com.community.service.MemberService;
import com.community.util.CheckUtil;
import com.community.util.LoginUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(value = "/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    static String userId = "";

    //회원가입
    @CrossOrigin("*")
    @PostMapping(value = "/signUp")
    public Integer SignUp(@RequestBody MemberModel memberModel){
        userId = memberModel.getUserId();
        return  memberService.signUp(memberModel);
    }

    //회원가입
    @CrossOrigin("*")
    @PutMapping(value = "/signUpProfile")
    public Integer SignUpProfile(MultipartHttpServletRequest multipartHttpServletRequest) throws IOException {
        int result = 0;
        result = memberService.signUpProfile(multipartHttpServletRequest, userId);
        userId = "";
        return result;
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

    //회원리스트가져오기
    @CrossOrigin("*")
    @GetMapping(value = "/memberList")
    public List<MemberModel> memberList(){
        return memberService.getMemberList();
    }

    //회원탈퇴시키기
    @CrossOrigin("*")
    @DeleteMapping
    public Integer kickMember(@RequestBody CheckUserModel checkUserModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.memberCheck(loginUserId, response) >= 1){
            return 0;
        }
        return memberService.kickMember(checkUserModel);
    }
}
