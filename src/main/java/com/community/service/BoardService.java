package com.community.service;

import com.community.model.BoardModel;
import com.community.model.DeleteModel;
import com.community.model.ImageModel;
import com.community.model.ViewModel;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface BoardService {
    List<BoardModel> getBoardList();

    Integer insert(ViewModel model, HttpServletResponse response, HttpServletRequest request);
    Integer update(ViewModel model, int b_id, HttpServletResponse response, HttpServletRequest request);
    Integer delete(int b_id, DeleteModel model, HttpServletResponse response, HttpServletRequest request);

    ViewModel getView(int b_id);

    Integer count(int b_id);

    List<BoardModel> search(String word);

    Integer image(String image);
    List<ImageModel> getImage();
}
