package com.community.util;

import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CheckUtil {

    //board, comment 영역
    public static Integer loginCheck(String loginUserId, String userId, HttpServletResponse response, HttpServletRequest request){
        int count = 0;
        if(loginUserId == null){
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            count++;
        }else if(!loginUserId.equals(userId) || LoginUtil.isApp(request)) {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            count++;
        }
        return count;
    }

    public static Integer imageCheck(String loginUserId, HttpServletResponse response, HttpServletRequest request){
        int count = 0;
        if(loginUserId == null){
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            count++;
        }
        return count;
    }

    //member영역
   public static Integer memberCheck(String loginUserId, HttpServletResponse response){
        int count = 0;
        if(loginUserId == null){
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            count++;
        }else if(!loginUserId.equals("admin")){
            response.setStatus(HttpStatus.FORBIDDEN.value());
            count++;
        }
        return count;
    }
}
