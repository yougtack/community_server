package com.community.service;

import com.community.model.CommentModel;
import com.community.model.CheckUserModel;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface CommentService {
    List<CommentModel> getComment(int b_id);

    Integer update(CommentModel model, HttpServletResponse response, HttpServletRequest request);

    Integer insert(CommentModel model, HttpServletResponse response, HttpServletRequest request);

    Integer delete(int c_id, CheckUserModel model, HttpServletResponse response, HttpServletRequest request);
}
