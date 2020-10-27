package com.community.service;

import com.community.model.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.List;

public interface BoardService {
    List<BoardModel> getBoardList();

    List<BoardModel> getMyBoardList(String userId);

    List<BoardModel> getMyCommentBoards(String userId);

    Integer insert(ViewModel viewModel);
    Integer secondInsert(ViewModel viewModel);

    Integer update(ViewModel model, int b_id);
    Integer delete(int b_id);

    Integer count(int b_id);
    ViewModel getView(int b_id);

    List<BoardModel> search(String word);
    List<BoardModel> getRank();

    Integer imageUpload(MultipartHttpServletRequest multipartHttpServletRequest) throws IOException;
    Integer imageInsert(MultipartHttpServletRequest multipartHttpServletRequest, int b_id) throws IOException;


    List<ImageModel> getImage(int b_id);
    ImageModel getViewImage(int i_id);

    Integer deleteImage(int i_id);

    int getB_id();
}
