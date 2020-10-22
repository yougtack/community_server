package com.community.controller;

import com.community.model.CheckUserModel;
import com.community.model.LoginModel;
import com.community.model.MemberModel;
import com.community.service.MemberService;
import com.community.util.AES256Util;
import com.community.util.CheckUtil;
import com.community.util.LoginUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping(value = "/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    static String userId = "";

    //회원가입
    @PostMapping(value = "/signUp")
    public Integer SignUp(@RequestBody MemberModel memberModel) throws NoSuchPaddingException, InvalidAlgorithmParameterException, NoSuchAlgorithmException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, UnsupportedEncodingException {
        userId = memberModel.getUserId();
        AES256Util aes256Util = new AES256Util();
        String encode = aes256Util.aesEncode(memberModel.getUserId());
        return  memberService.signUp(memberModel, encode);
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
    public LoginModel Login(@RequestBody MemberModel member, HttpServletResponse response, HttpServletRequest request) throws NoSuchPaddingException, InvalidAlgorithmParameterException, NoSuchAlgorithmException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, UnsupportedEncodingException {
        boolean isApp = LoginUtil.isApp(request);
        LoginModel userInfo = memberService.login(member);
        AES256Util aes256Util = new AES256Util();
        if(userInfo != null){
            if(!isApp){
                String encode = aes256Util.aesEncode(userInfo.getUserId());
                CheckUtil.ORIGINAL_USER_ID_ENCODE = encode;
                CheckUtil.ORIGINAL_USER_ID_DECODE = aes256Util.aesDecode(encode);
                Cookie cookie = new Cookie("userId", encode);
                cookie.setMaxAge(-1);
                cookie.setPath("/");

                response.addCookie(cookie);
            }else{
                System.out.println("is app!!");

                String encode = aes256Util.aesEncode(userInfo.getUserId());
                CheckUtil.ORIGINAL_USER_ID_ENCODE = encode;
                CheckUtil.ORIGINAL_USER_ID_DECODE = aes256Util.aesDecode(encode);
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
        String status = CheckUtil.memberCheck(response, request);
        if(status.equals("1")){
            return 0;
        }else{
            checkUserModel.setUserId(status);
        }
        //checkUserModel.userId는 강퇴시킬 아이디가 들어있음
        return memberService.kickMember(checkUserModel);
    }

    //멤버 정보수정
    @PutMapping
    public Integer updateUser(@RequestBody MemberModel memberModel, HttpServletResponse response, HttpServletRequest request){
        String status = CheckUtil.loginCheck(memberModel.getUserId(), response, request);
        if(status.equals("1")){
            return 0;
        }else{
            memberModel.setUserId(status);
        }
        return memberService.updateUser(memberModel);
    }

    //유저 정보확인
    @GetMapping(value = "/userInfo")
    public LoginModel getUserInfo(@RequestBody MemberModel memberModel){
        return memberService.getUserInfo(memberModel);
    }
}