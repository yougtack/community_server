package com.community.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class LoginUtil {

    public static String getCookieUserId(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        String cookieValue = null;

        if(cookies != null){
            for(int i=0; i<cookies.length; i++){
                cookieValue = cookies[i].getValue();
            }
        }
        return cookieValue;
    }

    public static String getCheckLogin(HttpServletRequest request){
        return getCookieUserId(request);
    }
}
