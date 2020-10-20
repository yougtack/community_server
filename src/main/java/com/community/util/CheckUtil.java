package com.community.util;

import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CheckUtil {
    public static String APP_USERID = "";
    public static String ORIGINAL_USER_ID_ENCODE="";
    public static String ORIGINAL_USER_ID_DECODE="";

    //board, comment 영역
    public static Integer loginCheck(String loginUserId, String userId, HttpServletResponse response, HttpServletRequest request){

        int count = 0;
        System.out.println(userId);
        System.out.println(ORIGINAL_USER_ID_ENCODE);
        System.out.println(ORIGINAL_USER_ID_DECODE);

        if(!LoginUtil.isApp(request)){ //web일때 false
            if(loginUserId == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }else if(!ORIGINAL_USER_ID_DECODE.equals(userId)) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                count++;
            }
        }else{//app일때 true
            if(APP_USERID == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }else if(!APP_USERID.equals(userId)) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                count++;
            }
        }
        return count;
    }

    public static Integer imageCheck(String loginUserId, HttpServletResponse response, HttpServletRequest request){
        int count = 0;
        if(!LoginUtil.isApp(request)) { //web일때 false
            if (loginUserId == null) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }
        }else{//app일때 true
            if(APP_USERID == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }
        }
        return count;
    }

    //member영역
   public static Integer memberCheck(String loginUserId, HttpServletResponse response, HttpServletRequest request){
        int count = 0;
        if(!LoginUtil.isApp(request)){
            if(loginUserId == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }else if(!loginUserId.equals("admin")){
                response.setStatus(HttpStatus.FORBIDDEN.value());
                count++;
            }
        }else{
            if(APP_USERID == null){
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                count++;
            }else if(!APP_USERID.equals("admin")) {
                response.setStatus(HttpStatus.FORBIDDEN.value());
                count++;
            }
        }
        return count;
    }
}
