package com.community.util;

import org.springframework.http.HttpHeaders;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class LoginUtil {
//    public static final String AGENT_NAME = "iPhone"; //상수로 agent_name을 선언
    public static final String AGENT_NAME = "smc"; //상수로 agent_name을 선언

    public static boolean isApp( HttpServletRequest request ) {
        String userAgent = request.getHeader(HttpHeaders.USER_AGENT );
        return userAgent.indexOf(AGENT_NAME) >= 0; //포함되어 있으면 참짓, 포함되어 있지 않으면 거
    }

    public static String getAuthorization( HttpServletRequest request ) {
        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        System.out.println("getAuthorization:"+request.getHeader(HttpHeaders.USER_AGENT));
        System.out.println("getAuthorization:"+request.getHeader(HttpHeaders.AUTHORIZATION));
        return authorization;
    }

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
        String userId = null;
        boolean app = isApp(request);  //웹이면 false
        if (app) {
            userId = getAuthorization(request);
        }
        else {
            userId = getCookieUserId(request);
        }
        return userId;
    }
}
