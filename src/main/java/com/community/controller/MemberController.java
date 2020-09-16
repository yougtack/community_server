package com.community.controller;

import com.community.model.DeleteModel;
import com.community.model.MemberModel;
import com.community.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    @PostMapping(value = "/signUp")
    public Integer SignUp(@RequestBody MemberModel member, HttpServletResponse response){
        return  memberService.signUp(member, response);
    }

    @GetMapping(value = "/login")
    public MemberModel Login(@RequestBody MemberModel member, HttpServletResponse response){
        return memberService.login(member, response);
    }

    @GetMapping(value = "/logout")
    public String logout(HttpServletResponse response){
        Cookie cookie = new Cookie("userId", "tmp");
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        return "logout!!";
    }

    @GetMapping(value = "/memberList")
    public List<MemberModel> memberList(){
        return memberService.getMemberList();
    }

    @DeleteMapping
    public Integer kickMember(@RequestBody DeleteModel model){
        return memberService.kickMember(model);
    }

    @PutMapping
    public Integer update(@RequestBody MemberModel model){
        return memberService.update(model);
    }

}
