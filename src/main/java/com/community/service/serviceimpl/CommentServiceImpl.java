package com.community.service.serviceimpl;

import com.community.dao.CommentDao;
import com.community.model.CommentModel;
import com.community.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentDao dao;

    @Override
    public Integer insert(CommentModel commentModel){
        return dao.insert(commentModel.getB_id(), commentModel.getUserId(), commentModel.getC_content());
    }

    @Transactional
    @Override
    public Integer replyInsert(CommentModel commentModel) {
        //dao.update_order_no: group_id에 맞고 현재 order_no 보다 높은 order_no를 1씩 증가 시켜준다.
        //dao.order_no_max: group_id에 맞는 MAX(order_no)값을 준다.

        if(commentModel.getDepth() == 0){
            commentModel.setOrder_no(dao.order_no_max(commentModel.getGroup_id()));
        }else{
            //parent_reply_id에 해당하는 값이 없을때
            if(dao.check_parent_reply_id(commentModel.getParent_reply_id()) != null){ //parent_reply_id에 해당하는 값이 있을때
                commentModel.setOrder_no(dao.get_max_order_no(commentModel.getParent_reply_id()));
            }
            dao.update_order_no(commentModel.getGroup_id(), commentModel.getOrder_no());
        }
        return dao.replyInsert(commentModel.getB_id(), commentModel.getUserId(), commentModel.getC_content(),
                commentModel.getGroup_id(), commentModel.getParent_reply_id(), commentModel.getDepth(), commentModel.getOrder_no());
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
