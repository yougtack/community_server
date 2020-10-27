package com.community.service;

import com.community.model.CommentModel;

public interface CommentService {
//    List<CommentModel> getComment(int b_id);

    Integer insert(CommentModel commentModel);

    Integer replyInsert(CommentModel CommentModel);

    Integer update(CommentModel commentModel);

    Integer delete(int c_id);
}
