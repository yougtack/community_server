package com.community.dao;

import com.community.model.BoardModel;
import com.community.model.CommentModel;
import com.community.model.ImageModel;
import com.community.model.ViewModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BoardDao {

    List<BoardModel> getBoardList();

    List<BoardModel> getMyBoardList(@Param("userId") String userId);

    int insert(@Param("b_type") String b_type, @Param("b_title") String b_title, @Param("b_content") String b_content, @Param("user_id") String user_id);
    int update(@Param("b_type") String b_type, @Param("b_title") String b_title, @Param("b_content") String b_content, @Param("b_id") int b_id);
    int delete(@Param("b_id") int b_id);



    Integer count(@Param("b_id") int b_id);
    ViewModel getView(@Param("b_id") int b_id);

    List<BoardModel> search(@Param("word") String word);
    List<BoardModel> getRank();

    Integer imageUpload(@Param("image") byte[] image, @Param("fileName") String fileName, @Param("b_id") int b_id);
    Integer imageUpdate(@Param("image") byte[] image, @Param("fileName") String fileName, @Param("b_id") int b_id);

    List<ImageModel> getImage(@Param("b_id") int b_id);

    ImageModel getViewImage(@Param("i_id") int i_id);

    Integer deleteImage(@Param("i_id") int i_id);
    int getB_id();

}
