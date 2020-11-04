package com.community.service;

import com.community.model.*;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.io.IOException;
import java.util.List;

public interface BoardService {
    List<BoardModel> getBoardList();

    List<BoardModel> getMyBoardList(String userId);

    List<BoardModel> getMyCommentBoards(String userId);

    Integer insert(ViewModel viewModel);
    Integer replyBoardInsert(ViewModel viewModel);

    Integer update(ViewModel model, int b_id);
    Integer delete(int b_id, HttpServletRequest request);

    ViewModel getView(int b_id);

    List<BoardModel> search(String word);
    List<BoardModel> getRank();

    String uploadImage(Model model, MultipartHttpServletRequest multipartHttpServletRequest, HttpServletRequest request) throws IOException;

    Integer updateImage(MultipartHttpServletRequest multipartHttpServletRequest, int i_id, HttpServletRequest request) throws IOException;


    List<ImageModel> getImages(int b_id);
    ImageModel getViewImage(int i_id);

    Integer deleteImage(ImageModel imageModel, HttpServletRequest request);

    String getImagePath(int b_id) throws IOException;
}
