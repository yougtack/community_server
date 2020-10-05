package com.community.dao;

import com.community.model.MemberModel;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.List;

public interface MemberDao {
    Integer signUp(@Param("userId") String userId, @Param("userPw") String userPw);

    Integer signUpProfile(@Param("userId") String userId, @Param("profile") byte[] profile);


    MemberModel login(@Param("userId") String userId, @Param("userPw") String userPw);

    List<MemberModel> getMemberList();

    Integer kickMember(@Param("userId") String userId);

}
