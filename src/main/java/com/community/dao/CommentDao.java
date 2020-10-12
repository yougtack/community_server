package com.community.dao;

import org.apache.ibatis.annotations.Param;

public interface CommentDao {
    Integer insert(@Param("b_id") int b_id, @Param("c_content") String c_content, @Param("userId") String userId);
    Integer secondInsert(@Param("b_id") int b_id, @Param("recomment_id") int recomment_id, @Param("c_content") String c_content, @Param("userId") String userId);

    Integer update(@Param("c_id") int c_id, @Param("c_content") String c_content);

    Integer delete(@Param("c_id") int c_id);
}
