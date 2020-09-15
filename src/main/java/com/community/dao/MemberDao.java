package com.community.dao;

import com.community.model.MemberModel;
import org.apache.ibatis.annotations.Param;

public interface MemberDao {
    Integer signUp(@Param("userId") String userId, @Param("userPw") String userPw);

    MemberModel login(@Param("userId") String userId, @Param("userPw") String userPw);

}
