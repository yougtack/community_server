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
import java.util.UUID;

import static org.apache.commons.io.FilenameUtils.getExtension;

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

    @Override
    public Integer replyBoardInsert(ViewModel viewModel) {
        if(viewModel.getDepth() == 0){
            viewModel.setOrder_no(dao.order_no_max(viewModel.getGroup_id()));
        }else{
            //parent_reply_id에 해당하는 값이 없을때
            if(dao.check_parent_reply_id(viewModel.getParent_reply_id()) != null){ //parent_reply_id에 해당하는 값이 있을때
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

    @Override
    public Integer count(int b_id) {
        return dao.count(b_id);
    }

    @Override
    public ViewModel getView(int b_id) {
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
    public Integer imageUpload(MultipartHttpServletRequest multipartHttpServletRequest) throws IOException {
        int result = 0;
        int b_id = boardService.getB_id();
        List<MultipartFile> multipartFiles = multipartHttpServletRequest.getFiles("Files");
        if (!multipartFiles.isEmpty()) {
            for (MultipartFile filePart : multipartFiles) {
                result = dao.imageUpload(filePart.getBytes(), filePart.getOriginalFilename(), b_id);
            }
        } else {
            return 0;
        }
        return result;
    }

    @Override
    public Integer imageInsert(MultipartHttpServletRequest multipartHttpServletRequest, int b_id) throws IOException {
        int result = 0;
        List<MultipartFile> multipartFiles = multipartHttpServletRequest.getFiles("Files");
        if (!multipartFiles.isEmpty()) {
            for (MultipartFile filePart : multipartFiles) {
                String genId = UUID.randomUUID().toString();
                String saveFileName = genId + "." + getExtension(filePart.getOriginalFilename());
                if (filePart.getOriginalFilename().equals("")) {
                    return 0;
                }
                result = dao.imageInsert(filePart.getBytes(), filePart.getOriginalFilename(), saveFileName, b_id);
            }
        }
        return result;
    }

    @Override
    public List<ImageModel> getImage(int b_id) {
        return dao.getImage(b_id);
    }

    @Override
    public ImageModel getViewImage(int i_id) {
        return dao.getViewImage(i_id);
    }

    @Override
    public Integer deleteImage(int i_id) {
        return dao.deleteImage(i_id);
    }

    @Override
    public int getB_id() {
        return dao.getB_id();
    }
}
