package com.community.dao;

import com.community.model.MemberModel;
import com.community.model.TestModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MemberDao {
    Integer signUp(@Param("userId") String userId, @Param("userPw") String userPw);

    MemberModel login(@Param("userId") String userId, @Param("userPw") String userPw);

    List<MemberModel> getMemberList();

    TestModel getUserInfo(@Param("userId") String userId);

    Integer kickMember(@Param("userId") String userId);

}
