package com.community.util;

import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CheckUtil {
    public static String ORIGINAL_USER_ID_ENCODE="";
    public static String ORIGINAL_USER_ID_DECODE="";
    public static String NOW_LOGIN_USER="";

    //board, comment 영역
    public static Integer loginCheck(String userId, HttpServletResponse response, HttpServletRequest request){
        int count = 0;
        NOW_LOGIN_USER = LoginUtil.getCheckLogin(request);

        if(!LoginUtil.isApp(request)){ //web일때 false
            if(NOW_LOGIN_USER == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }else if(!ORIGINAL_USER_ID_DECODE.equals(userId)) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                count++;
            }
        }else{//app일때 true
            if(ORIGINAL_USER_ID_DECODE == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }else if(!ORIGINAL_USER_ID_DECODE.equals(userId)) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                count++;
            }
        }
        return count;
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
   public static Integer memberCheck(HttpServletResponse response, HttpServletRequest request){
        int count = 0;
       NOW_LOGIN_USER = LoginUtil.getCheckLogin(request);
        if(!LoginUtil.isApp(request)){
            if(NOW_LOGIN_USER == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }else if(!ORIGINAL_USER_ID_DECODE.equals("admin")){
                response.setStatus(HttpStatus.FORBIDDEN.value());
                count++;
            }
        }else{
            if(ORIGINAL_USER_ID_DECODE == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }else if(!ORIGINAL_USER_ID_DECODE.equals("admin")) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                count++;
            }
        }
        return count;
    }
}
