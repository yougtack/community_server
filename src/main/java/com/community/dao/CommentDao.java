package com.community.dao;

import com.community.model.CommentModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CommentDao {
    List<CommentModel> getComment(@Param("b_id") int b_id);

    Integer update(@Param("c_id") int c_id, @Param("c_content") String c_content);

    Integer insert(@Param("b_id") int b_id, @Param("c_content") String c_content, @Param("userId") String userId);

    Integer delete(@Param("c_id") int c_id);
}
