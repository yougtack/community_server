package com.community.service.serviceimpl;

import com.community.dao.CommentDao;
import com.community.model.CommentModel;
import com.community.model.SecondCommentModel;
import com.community.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentDao dao;

    @Override
    public Integer insert(CommentModel commentModel){
        return dao.insert(commentModel.getB_id(), commentModel.getC_content(), commentModel.getUserId());
    }

    @Override
    public Integer secondInsert(SecondCommentModel secondCommentModel){
        return dao.secondInsert(secondCommentModel.getB_id(), secondCommentModel.getRecomment_id(), secondCommentModel.getC_content(), secondCommentModel.getUserId());
    }

    @Override
    public Integer update(CommentModel commentModel){
        return dao.update(commentModel.getC_id(), commentModel.getC_content());
    }

    @Override
    public Integer delete(int c_id) {
        return  dao.delete(c_id);
    }
}
