package com.community.dao;

import com.community.model.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BoardDao {

    List<BoardModel> getBoardList();

    List<BoardModel> getMyBoardList(@Param("userId") String userId);

    List<BoardModel> getMyCommentBoards(@Param("userId") String userId);

    int insert(@Param("b_type") String b_type, @Param("b_title") String b_title, @Param("b_content") String b_content, @Param("user_id") String user_id);
    int secondInsert(@Param("b_recomment_id") int b_recomment_id, @Param("b_type") String b_type, @Param("b_title") String b_title, @Param("b_content") String b_content, @Param("user_id") String user_id);

    int update(@Param("b_type") String b_type, @Param("b_title") String b_title, @Param("b_content") String b_content, @Param("b_id") int b_id);
    int delete(@Param("b_id") int b_id);



    Integer count(@Param("b_id") int b_id);
    ViewModel getView(@Param("b_id") int b_id);

    List<BoardModel> search(@Param("word") String word);
    List<BoardModel> getRank();

    Integer imageUpload(@Param("image") byte[] image, @Param("fileName") String fileName, @Param("b_id") int b_id);
    Integer imageInsert(@Param("image") byte[] image, @Param("fileName") String fileName, @Param("saveFileName") String saveFileName, @Param("b_id") int b_id);

    List<ImageModel> getImage(@Param("b_id") int b_id);

    ImageModel getViewImage(@Param("i_id") int i_id);

    Integer deleteImage(@Param("i_id") int i_id);
    int getB_id();

    Integer Test(@Param("b_id") int b_id, @Param("userId") String userId, @Param("c_content") String c_content);

    Integer Test_second(@Param("b_id") int b_id, @Param("userId") String userId, @Param("c_content") String c_content,
                        @Param("group_id") int group_id, @Param("parent_reply_id") int parent_reply_id, @Param("depth") int depth,
                        @Param("order_no") int order_no);

    TestBoardModel getTestBoard(@Param("b_id") int b_id);

    Integer update_order_no(@Param("group_id") int group_id, @Param("order_no") int order_no);

    Integer order_no_max(@Param("group_id") int group_id);

    Integer check_parent_reply_id(@Param("parent_reply_id") int parent_reply_id);

    Integer get_max_order_no(@Param("parent_reply_id") int parent_reply_id);
}
