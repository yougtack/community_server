package com.community.util;

import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CheckUtil {
    public static String ORIGINAL_USER_ID_ENCODE=""; //암호화
    public static String ORIGINAL_USER_ID_DECODE=""; //복호화
    public static String NOW_LOGIN_USER=""; //현재 로그인 유저

    //board, comment 영역
    public static String loginCheck(String userId, HttpServletResponse response, HttpServletRequest request){
        NOW_LOGIN_USER = LoginUtil.getCheckLogin(request);


        if(!LoginUtil.isApp(request)){ //web일때 false
            if(NOW_LOGIN_USER == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return "1";
            }else if(!ORIGINAL_USER_ID_ENCODE.equals(userId)) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                return "1";
            }
        }else{//app일때 true
            if(ORIGINAL_USER_ID_DECODE == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return "1";
            }else if(!ORIGINAL_USER_ID_DECODE.equals(userId)) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                return "1";
            }
        }
        return ORIGINAL_USER_ID_DECODE;
    }

    public static Integer imageCheck(HttpServletResponse response, HttpServletRequest request){
        int count = 0;
        NOW_LOGIN_USER = LoginUtil.getCheckLogin(request);
        if(!LoginUtil.isApp(request)) { //web일때 false
            if (NOW_LOGIN_USER == null) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }
        }else{//app일때 true
            if(ORIGINAL_USER_ID_DECODE == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }
        }
        return count;
    }

    //member영역
   public static String memberCheck(HttpServletResponse response, HttpServletRequest request){
       NOW_LOGIN_USER = LoginUtil.getCheckLogin(request);
        if(!LoginUtil.isApp(request)){
            if(NOW_LOGIN_USER == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return "1";
            }else if(!ORIGINAL_USER_ID_DECODE.equals("admin")){
                response.setStatus(HttpStatus.FORBIDDEN.value());
                return "1";
            }
        }else{
            if(ORIGINAL_USER_ID_DECODE == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return "1";

            }else if(!ORIGINAL_USER_ID_DECODE.equals("admin")) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                return "1";
            }
        }

        return ORIGINAL_USER_ID_DECODE;
    }
}
