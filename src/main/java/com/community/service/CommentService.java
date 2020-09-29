package com.community.service;

import com.community.model.CommentModel;
import java.util.List;

public interface CommentService {
    List<CommentModel> getComment(int b_id);

    Integer insert(CommentModel commentModel);

    Integer update(CommentModel commentModel);

    Integer delete(int c_id);
}
