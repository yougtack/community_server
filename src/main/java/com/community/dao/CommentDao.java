package com.community.dao;

import com.community.model.CommentModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CommentDao {
//    List<CommentModel> getComment(@Param("b_id") int b_id);

    Integer insert(@Param("b_id") int b_id, @Param("c_content") String c_content, @Param("userId") String userId);
    Integer secondInsert(@Param("c_id") int c_id, @Param("c_content") String c_content, @Param("userId") String userId);

    Integer update(@Param("c_id") int c_id, @Param("c_content") String c_content);
    Integer secondUpdate(@Param("second_id") int second_id, @Param("c_content") String c_content);

    Integer delete(@Param("c_id") int c_id);
    Integer secondDelete(@Param("second_id") int second_id);

}
