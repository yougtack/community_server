package com.community.controller;

import com.community.model.CheckUserModel;
import com.community.model.MemberModel;
import com.community.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @GetMapping(value = "/login")
    public MemberModel Login(@RequestBody MemberModel member, HttpServletResponse response){
        return memberService.login(member, response);
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
    public Integer kickMember(@RequestBody CheckUserModel model, HttpServletResponse response, HttpServletRequest request){
        return memberService.kickMember(model, response, request);
    }

    //회원비밀번호 수정
    @CrossOrigin("*")
    @PutMapping
    public Integer update(@RequestBody MemberModel model, HttpServletResponse response, HttpServletRequest request){
        return memberService.update(model, response, request);
    }
}
