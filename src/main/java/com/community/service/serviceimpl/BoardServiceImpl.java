package com.community.service.serviceimpl;

import com.community.dao.BoardDao;
import com.community.model.*;
import com.community.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardDao dao;

    @Autowired
    BoardService boardService;

    @Override
    public List<BoardModel> getBoardList() {
        return dao.getBoardList();
    }

    @Override
    public List<BoardModel> getMyBoardList(String userId) {
        return dao.getMyBoardList(userId);
    }

    @Override
    public List<BoardModel> getMyCommentBoards(String userId) {
        return dao.getMyCommentBoards(userId);
    }

    @Override
    public Integer insert(ViewModel viewModel) {
        return dao.insert(viewModel.getB_type(), viewModel.getB_title(), viewModel.getB_content(), viewModel.getUserId());
    }

    @Transactional
    @Override
    public Integer replyBoardInsert(ViewModel viewModel) {
        if(viewModel.getDepth() == 0){
            viewModel.setOrder_no(dao.order_no_max(viewModel.getGroup_id()));
        }else{
            //parent_reply_id에 해당하는 값이 있을때
            if(dao.check_parent_reply_id(viewModel.getParent_reply_id()) != null){
                 viewModel.setOrder_no(dao.get_max_order_no(viewModel.getParent_reply_id()));
            }
            dao.update_order_no(viewModel.getGroup_id(), viewModel.getOrder_no());
        }
        return dao.replyBoardInsert(viewModel.getB_type(), viewModel.getB_title(), viewModel.getB_content(), viewModel.getUserId(),
                viewModel.getGroup_id(), viewModel.getParent_reply_id(),  viewModel.getDepth(), viewModel.getOrder_no());
    }

    @Override
    public Integer update(ViewModel model, int b_id) {
        return dao.update(model.getB_type(), model.getB_title(), model.getB_content(), b_id);
    }

    @Override
    public Integer delete(int b_id) {
        return dao.delete(b_id);
    }

    @Transactional
    @Override
    public ViewModel getView(int b_id) {
        dao.count(b_id);
        return dao.getView(b_id);
    }


    @Override
    public List<BoardModel> search(String word) {
        return dao.search(word);
    }

    @Override
    public List<BoardModel> getRank() {
        return dao.getRank();
    }

    @Override
    public Integer uploadImage(MultipartHttpServletRequest multipartHttpServletRequest, int b_id, HttpServletRequest request) throws IOException {
        int result = 0;
        List<MultipartFile> multipartFiles = multipartHttpServletRequest.getFiles("Files");
        if (!multipartFiles.isEmpty()) {
            UUID uuid = UUID.randomUUID();
            for (MultipartFile filePart : multipartFiles) {

                String root_path = request.getSession().getServletContext().getRealPath("/");
                String attach_path = "static/images/";
                String filename = uuid+"_"+filePart.getOriginalFilename();

                File saveFile = new File(root_path+attach_path+filename);
                filePart.transferTo(saveFile);

                result =  dao.uploadImage(b_id, uuid+"_"+filePart.getOriginalFilename(), "/static/images/"+uuid+"_"+filePart.getOriginalFilename());
            }
        }
    return result;
    }


    @Override
    public Integer updateImage(MultipartHttpServletRequest multipartHttpServletRequest, int i_id, HttpServletRequest request) throws IOException {
        int result = 0;

        ImageModel imageModel = dao.getImageInfo(i_id);
        String root_path = request.getSession().getServletContext().getRealPath("/");
        String attach_path = "static/images/";
        File file = new File(root_path+attach_path+imageModel.getFile_name());
        file.delete();

        List<MultipartFile> multipartFiles = multipartHttpServletRequest.getFiles("Files");
        if (!multipartFiles.isEmpty()) {
            UUID uuid = UUID.randomUUID();
            for (MultipartFile filePart : multipartFiles) {
                String filename = uuid+"_"+filePart.getOriginalFilename();

                File saveFile = new File(root_path+attach_path+filename);
                filePart.transferTo(saveFile);

                result =  dao.updateImage(i_id, uuid+"_"+filePart.getOriginalFilename(), "/static/images/"+uuid+"_"+filePart.getOriginalFilename());
            }
        }
        return result ;
    }

    @Override
    public List<ImageModel> getImages(int b_id) {
        return dao.getImages(b_id);
    }

    @Override
    public ImageModel getViewImage(int i_id) {
        return dao.getViewImage(i_id);
    }

    @Override
    public Integer deleteImage(ImageModel imageModel, HttpServletRequest request) {

        String root_path = request.getSession().getServletContext().getRealPath("/");
        String attach_path = "static/images/";
        File file = new File(root_path+attach_path+imageModel.getFile_name());
        file.delete();
        return dao.deleteImage(imageModel.getFile_name());
    }
}
