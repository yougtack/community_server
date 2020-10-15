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
    @PostMapping(value = "/signUp")
    public Integer SignUp(@RequestBody MemberModel memberModel){
        userId = memberModel.getUserId();
        return  memberService.signUp(memberModel);
    }

    //회원프로핆
    @PutMapping(value = "/signUpProfile")
    public Integer SignUpProfile(MultipartHttpServletRequest multipartHttpServletRequest) throws IOException {
        int result =  memberService.signUpProfile(multipartHttpServletRequest, userId);
        userId = "";
        return result;
    }

    //회원프로핆 변경
    @PutMapping(value = "/profile/{userId}")
    public Integer updateProfile(MultipartHttpServletRequest multipartHttpServletRequest, @PathVariable String userId) throws IOException {
        return  memberService.updateProfile(multipartHttpServletRequest, userId);
    }

    //로그인
    @PostMapping(value = "/login")
    public MemberModel Login(@RequestBody MemberModel member, HttpServletResponse response, HttpServletRequest request){
        boolean isApp = LoginUtil.isApp(request);
        MemberModel userInfo = memberService.login(member);
        if(userInfo != null){
            if(!isApp){
                Cookie cookie = new Cookie("userId", userInfo.getUserId());
                cookie.setMaxAge(-1);
                cookie.setPath("/");
                cookie.setHttpOnly(true);

                response.addCookie(cookie);
            }else{
//                System.out.println(LoginUtil.getAuthorization(request));
            }
        }else {
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
        return userInfo;
    }

    //로그아웃
    @GetMapping(value = "/logout")
    public String logout(HttpServletResponse response){
        Cookie cookie = new Cookie("userId", "tmp");
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        return "logout!!";
    }

    //회원리스트가져오기
    @GetMapping(value = "/memberList")
    public List<MemberModel> memberList(){
        return memberService.getMemberList();
    }

    //회원탈퇴시키기
    @DeleteMapping
    public Integer kickMember(@RequestBody CheckUserModel checkUserModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);//현재 로그인되어있는 값
        if(CheckUtil.memberCheck(loginUserId, response, request) >= 1){
            return 0;
        }
        //checkUserModel.userId는 강퇴시킬 아이디가 들어있음
        return memberService.kickMember(checkUserModel);
    }

    //멤버 정보수정
    @PutMapping
    public Integer updateUser(@RequestBody MemberModel memberModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.loginCheck(loginUserId, memberModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return memberService.updateUser(memberModel);
    }
}
