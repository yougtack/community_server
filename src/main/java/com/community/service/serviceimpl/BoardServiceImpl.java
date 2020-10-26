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
    public Integer secondInsert(ViewModel viewModel) {
        return dao.secondInsert(viewModel.getB_recomment_id(), viewModel.getB_type(), viewModel.getB_title(), viewModel.getB_content(), viewModel.getUserId());
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

    @Override
    public Integer Test(TestModel testModel) {
        return dao.Test(testModel.getB_id(), testModel.getUserId(), testModel.getC_content());
    }

    @Override
    public Integer Test_second(TestModel testModel) {
        if (testModel.getDepth() == 0) {
            testModel.setOrder_no(dao.getDepth(testModel.getDepth(), testModel.getGroup_id()));
        }
        else if(testModel.getDepth() == 1){
            dao.update_order(testModel.getGroup_id(),testModel.getOrder_no()); //group_id = 1, order_no = 3
            testModel.setOrder_no(dao.getDepth(testModel.getDepth(), testModel.getGroup_id()));
            if(testModel.getOrder_no() == dao.max_order_no(testModel.getGroup_id())){
                testModel.setOrder_no(testModel.getOrder_no()+1);
            }
        }
        else{
            System.out.println("sad:"+dao.getDepth_max(testModel.getDepth(), testModel.getParent_reply_id(), testModel.getGroup_id()));
            dao.update_order(testModel.getGroup_id(),dao.getDepth_max(testModel.getDepth(), testModel.getParent_reply_id(), testModel.getGroup_id()));
            testModel.setOrder_no(dao.checkComment(testModel.getGroup_id(), testModel.getOrder_no()).getOrder_no());
        }
        return dao.Test_second(testModel.getB_id(), testModel.getUserId(), testModel.getC_content(),
                testModel.getGroup_id(), testModel.getParent_reply_id(), testModel.getDepth(), testModel.getOrder_no());
    }
//        }else{//여기 들어옴
//            //if(dao.checkComment = 값있음)
//            //dao.update_order(45, dao.getDepth(dao.checkComment(2)))
//            //dao.update_order(5)
//            if (dao.checkComment(testModel.getGroup_id(), testModel.getOrder_no()) != null) {
//                dao.update_order(testModel.getGroup_id(), dao.getDepth(dao.checkComment(testModel.getGroup_id(), testModel.getOrder_no()).getDepth(), testModel.getGroup_id()));
//                testModel.setOrder_no(dao.getDepth_min(dao.checkComment(testModel.getGroup_id(), testModel.getOrder_no()-1).getDepth(), testModel.getGroup_id()));
//            }
//            return dao.Test_second(testModel.getB_id(), testModel.getUserId(), testModel.getC_content(),
//                    testModel.getGroup_id(), testModel.getParent_reply_id(), testModel.getDepth(), testModel.getOrder_no());
//        }

        @Override
    public TestBoardModel getTestBoard(int b_id){
           return dao.getTestBoard(b_id);
    }
}
