package com.community.service.serviceimpl;

import com.community.dao.BoardDao;
import com.community.model.BoardModel;
import com.community.model.CheckUserModel;
import com.community.model.ImageModel;
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
    public Integer insert(ViewModel viewModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        int result = 0;
        if(loginUserId != null){
            if(loginUserId.equals(viewModel.getUserId()) || LoginUtil.isApp(request)){ // <- 이런식으로 바꿔야함
                result = dao.insert(viewModel.getB_type(), viewModel.getB_title(), viewModel.getB_content(), viewModel.getUserId());
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
    public Integer delete(int b_id, CheckUserModel model, HttpServletResponse response, HttpServletRequest request){
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

    @Override
    public List<BoardModel> search(String word){
        return dao.search(word);
    }

    @Override
    public Integer imageUpload(ImageModel image, int b_id, HttpServletResponse response, HttpServletRequest request){
        if(image.getFileName().equals("")){
            return 0;
        }
        String loginUserId = LoginUtil.getCheckLogin(request);
        int result = 0;
        if(loginUserId != null){
                result = dao.imageUpload(image.getImage(), image.getFileName(), b_id);
        }else{
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        return result;
    }

    @Override
    public Integer imageUpdate(ImageModel image, int b_id, HttpServletResponse response, HttpServletRequest request){
        if(image.getFileName().equals("")){
            return 0;
        }
        String loginUserId = LoginUtil.getCheckLogin(request);
        int result = 0;
        if(loginUserId != null){
            result = dao.imageUpdate(image.getImage(), image.getFileName(), b_id);
        }else{
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
        return result;
    }
    @Override
    public List<ImageModel> getImage(int b_id){
        return dao.getImage(b_id);
    }

    @Override
    public int getB_id(){
        return dao.getB_id();
    }
}
