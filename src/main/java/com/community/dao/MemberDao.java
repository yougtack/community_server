package com.community.dao;

import com.community.model.LoginModel;
import com.community.model.MemberListModel;
import com.community.model.MemberModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MemberDao {
    Integer signUp(@Param("encode") String encode, @Param("userId") String userId, @Param("userPw") String userPw);

    Integer signUpProfile(@Param("userId") String userId, @Param("file_path") String file_path, @Param("file_name") String file_name);

    LoginModel login(@Param("userId") String userId, @Param("userPw") String userPw);

    List<MemberListModel> getMemberList();

    Integer kickMember(@Param("userId") String userId);

    Integer updateProfile(@Param("userId") String userId, @Param("profile") byte[] profile);
    MemberModel getUserFileImage(@Param("userId") String userId);

    Integer updateUser(@Param("userId") String userId, @Param("userPw") String userPw);

    LoginModel getUserInfo(@Param("encode") String encode);

}

