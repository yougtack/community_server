package com.community.dao;

import com.community.model.CommentModel;
import org.apache.ibatis.annotations.Param;

public interface CommentDao {
    Integer insert(@Param("b_id") int b_id, @Param("userId") String userId, @Param("c_content") String c_content);

    Integer Test_second(@Param("b_id") int b_id, @Param("userId") String userId, @Param("c_content") String c_content,
                        @Param("group_id") int group_id, @Param("parent_reply_id") int parent_reply_id, @Param("depth") int depth,
                        @Param("order_no") int order_no);

    Integer update(@Param("c_id") int c_id, @Param("c_content") String c_content);

    Integer delete(@Param("c_id") int c_id);

    Integer update_order_no(@Param("group_id") int group_id, @Param("order_no") int order_no);

    Integer order_no_max(@Param("group_id") int group_id);

    Integer check_parent_reply_id(@Param("parent_reply_id") int parent_reply_id);

    Integer get_max_order_no(@Param("parent_reply_id") int parent_reply_id);
}
