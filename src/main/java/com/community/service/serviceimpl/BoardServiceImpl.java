package com.community.service.serviceimpl;

import com.community.dao.BoardDao;
import com.community.model.BoardModel;
import com.community.model.DeleteModel;
import com.community.model.ViewModel;
import com.community.service.BoardService;
import com.community.util.LoginUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardDao dao;

    @Override
    public List<BoardModel> getBoardList(){
        return dao.getBoardList();
    }

    @Override
    public Integer insert(ViewModel model, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        int result = 0;
        if(loginUserId != null){
            if(loginUserId.equals(model.getUserId())){
                result = dao.insert(model.getB_type(), model.getB_title(), model.getB_content(), model.getUserId());
            }else{
                response.setStatus(HttpStatus.FORBIDDEN.value());
            }
        }else{
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        return result;
    }

    @Override
    public Integer update(ViewModel model, int b_id, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        int result = 0;
        if(loginUserId != null){
            if(loginUserId.equals(model.getUserId())){
                result = dao.update(model.getB_type(), model.getB_title(), model.getB_content(), b_id);
            }else{
                response.setStatus(HttpStatus.FORBIDDEN.value());
            }
        }else{
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        return result;
    }

    @Override
    public Integer delete(int b_id, DeleteModel model, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        int result = 0;

        if(loginUserId != null){
            if(loginUserId.equals(model.getUserId())){
                result = dao.delete(b_id);
            }else{
                response.setStatus(HttpStatus.FORBIDDEN.value());
            }
        }else{
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        return result;
    }

    @Override
    public ViewModel getView(int b_id){
        return dao.getView(b_id);
    }

    @Override
    public Integer count(int b_id){
        return dao.count(b_id);
    }


}
