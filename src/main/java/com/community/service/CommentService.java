package com.community.service;

import com.community.model.CommentModel;
import com.community.model.SecondCommentModel;

public interface CommentService {
//    List<CommentModel> getComment(int b_id);

    Integer insert(CommentModel commentModel);
    Integer secondInsert(SecondCommentModel secondCommentModel);

    Integer update(CommentModel commentModel);
    Integer secondUpdate(SecondCommentModel secondCommentModel);

    Integer delete(int c_id);
    Integer secondDelete(int second_id);

}
