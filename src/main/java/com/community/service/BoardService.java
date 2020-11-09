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
    Integer replyBoardInsert(ViewModel viewModel);

    Integer update(ViewModel model, int b_id);
    Integer delete(int b_id);

    ViewModel getView(int b_id);

    List<BoardModel> search(String word);
    List<BoardModel> getRank();

    String uploadImage(MultipartHttpServletRequest multipartHttpServletRequest) throws IOException;

    String getImagePath(int b_id) throws IOException;
}
