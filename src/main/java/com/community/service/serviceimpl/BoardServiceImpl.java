package com.community.service.serviceimpl;

import com.community.dao.BoardDao;
import com.community.model.*;
import com.community.service.BoardService;
import com.community.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {
    static final String patten_1 = "<img id=\"mybtn\" width=\"200px;\" height=\"200px;\" class=\"image\" src=\"/static/images/";
    static final String patten_2 = "<img id=\"mybtn\" width=\"200px;\" height=\"200px;\" class=\"image\"";

    @Autowired
    BoardDao dao;

    @Autowired
    BoardService boardService;

    @Override
    public List<BoardModel> getBoardList() {
        return dao.getBoardList(patten_1);
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
        int result = 0;

        int count1 = dao.imageCount(b_id, patten_2); //업데이트 전 사진 수 구하기
        String[] images_1 = new String[count1];

        for(int i = 0; i<count1; i++) { //구한 사진 수만큼 반복 하면서 images_1에 사진 이름(주소) 넣기
            images_1[i] = dao.getImagePath(b_id, patten_1, patten_2, i + 1);
        }

        result = dao.update(model.getB_type(), model.getB_title(), model.getB_content(), b_id); //실제 업데이트 하는 곳

        int count2 = dao.imageCount(b_id, patten_2); //업데이트 후 사진 수 구하기
        String[] images_2 = new String[count2];

        for(int i = 0; i<count2; i++) { //구한 사진 수 만큼 반복 하면서 images_2에 사진 이름(주소) 넣기
            images_2[i] = dao.getImagePath(b_id, patten_1, patten_2, i + 1);
        }

        //업데이트 전 이랑 업데이트 후 랑 비교해서 중복될 때가 없으면 삭제 하기로함
        int count_check = 0;
        for(int i=0;i<count1; i++){
            for(int j=0; j<count2; j++){
                if(images_1[i].equals(images_2[j])){
                    count_check += 1;
                }
            }
            if(count_check == 0){
                FileUtil.fileDelete(images_1[i]); //사진 삭제
            }
            count_check=0;
        }
        return result;
    }

    @Transactional
    @Override
    public Integer delete(int b_id, HttpServletRequest request) {
        int count = dao.imageCount(b_id, patten_2);
        for(int i = 0; i<count; i++){
            String file_name = dao.getImagePath(b_id, patten_1, patten_2, i+1);

            FileUtil.fileDelete(file_name);
        }
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
    public String uploadImage(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletRequest request) throws IOException {
        ArrayList<String> path = new ArrayList<>();
        List<MultipartFile> multipartFiles = multipartHttpServletRequest.getFiles("Files");
        if (!multipartFiles.isEmpty()) {
            for (MultipartFile filePart : multipartFiles) {
                path.add("/static/images/"+FileUtil.fileInsert(filePart));
            }
        }
    return FileUtil.transToJson(path);
    }

    @Override
    public String getImagePath(int b_id) throws IOException{
        ArrayList<String> path = new ArrayList<>();
        int count = dao.imageCount(b_id, patten_2);
        for(int i = 0; i<count; i++) {
            path.add("/static/images/"+dao.getImagePath(b_id, patten_1, patten_2, i + 1));
        }
    return FileUtil.transToJson(path);
    }
}
