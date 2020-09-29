package com.community.service.serviceimpl;

import com.community.dao.BoardDao;
import com.community.model.*;
import com.community.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.IOException;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardDao dao;

    @Autowired
    BoardService boardService;

    @Override
    public List<BoardModel> getBoardList(){
        return dao.getBoardList();
    }

    @Override
    public Integer insert(ViewModel viewModel){
        return dao.insert(viewModel.getB_type(), viewModel.getB_title(), viewModel.getB_content(), viewModel.getUserId());
    }

    @Override
    public Integer update(ViewModel model, int b_id){
        return dao.update(model.getB_type(), model.getB_title(), model.getB_content(), b_id);
    }

    @Override
    public Integer delete(int b_id){
        return dao.delete(b_id);
    }

    @Override
    public Integer count(int b_id){
        return dao.count(b_id);
    }

    @Override
    public ViewModel getView(int b_id){
        return dao.getView(b_id);
    }


    @Override
    public List<BoardModel> search(String word){
        return dao.search(word);
    }

    @Override
    public List<BoardModel> getRank(){
        return dao.getRank();
    }

    @Override
    public Integer imageUpload(MultipartHttpServletRequest multipartHttpServletRequest) throws IOException {
        int result = 0;
        int b_id = boardService.getB_id();
        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("Files");
        if(!multipartFiles.isEmpty()){
            for(MultipartFile filePart : multipartFiles){
                if(filePart.getOriginalFilename().equals("")){
                    return 0;
                }
                result = dao.imageUpload(filePart.getBytes(), filePart.getOriginalFilename(), b_id);
            }
        }
        return result;
    }

    @Override
    public Integer imageUpdate(MultipartHttpServletRequest multipartHttpServletRequest, int b_id) throws IOException{
        int result = 0;
        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("Files");
        if(!multipartFiles.isEmpty()) {
            for (MultipartFile filePart : multipartFiles) {
                if (filePart.getOriginalFilename().equals("")) {
                    return 0;
                }
                result = dao.imageUpdate(filePart.getBytes(), filePart.getOriginalFilename(), b_id);
            }
        }
        return result;
    }
    @Override
    public List<ImageModel> getImage(int b_id){
        return dao.getImage(b_id);
    }

    @Override
    public ImageModel getViewImage(int i_id){
        return dao.getViewImage(i_id);
    }

    @Override
    public Integer deleteImage(int i_id){
        return dao.deleteImage(i_id);
    }

    @Override
    public int getB_id(){
        return dao.getB_id();
    }

}
