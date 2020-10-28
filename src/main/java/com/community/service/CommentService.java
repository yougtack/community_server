package com.community.service;

import com.community.model.CommentModel;

public interface CommentService {
    Integer insert(CommentModel commentModel);

    Integer replyInsert(CommentModel CommentModel);

    Integer update(CommentModel commentModel);

    Integer delete(int c_id);
}
