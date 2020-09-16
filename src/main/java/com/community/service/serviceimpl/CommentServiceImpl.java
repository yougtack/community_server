package com.community.service.serviceimpl;

import com.community.dao.CommentDao;
import com.community.model.CommentModel;
import com.community.model.DeleteModel;
import com.community.model.ViewModel;
import com.community.service.CommentService;
import com.community.util.LoginUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentDao dao;

    @Override
    public List<CommentModel> getComment(int b_id){
        return dao.getComment(b_id);
    }

    @Override
    public Integer update(CommentModel model, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        int result = 0;

        if(loginUserId != null){
            if(loginUserId.equals(model.getUserId())){
                result =  dao.update(model.getC_id(), model.getC_content());
            }else{
                response.setStatus(HttpStatus.FORBIDDEN.value());
            }
        }else{
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        return result;
    }

    @Override
    public Integer insert(CommentModel model, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        int result = 0;

        if(loginUserId != null){
            if(loginUserId.equals(model.getUserId())){
                result =  dao.insert(model.getB_id(), model.getC_content(), model.getUserId());
            }else{
                response.setStatus(HttpStatus.FORBIDDEN.value());
            }
        }else{
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        return result;
    }

    @Override
    public Integer delete(int c_id, DeleteModel model, HttpServletResponse response, HttpServletRequest request) {
        String loginUserId = LoginUtil.getCheckLogin(request);
        int result = 0;

        System.out.println(loginUserId);
        System.out.println(model.getUserId());
        if(loginUserId != null){
            if(loginUserId.equals(model.getUserId())){
                result = dao.delete(c_id);
            }else{
                response.setStatus(HttpStatus.FORBIDDEN.value());
            }
        }else{
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        return result;
    }
}
