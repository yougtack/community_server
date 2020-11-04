package com.community.controller;

import com.community.model.*;
import com.community.service.BoardService;
import com.community.util.CheckUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@RestController
@RequestMapping(value = "/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    //게시글 전부 가져오기
    @GetMapping(value = "/boardList")
    public List<BoardModel> boardList(){
        return boardService.getBoardList();

    }

    //내가쓴 글
    @GetMapping(value = "/myBoardList/{userId}")
    public List<BoardModel> myBoardList(@PathVariable String userId){
        return boardService.getMyBoardList(userId);
    }


    //내가 댓글쓴 게시글
    @GetMapping(value = "/myCommentBoards/{userId}")
    public List<BoardModel> myCommentBoards(@PathVariable String userId){
        return boardService.getMyCommentBoards(userId);
    }
    //게시글 작성 하기
    @PostMapping(value = "/community")
    public Integer insert(@RequestBody ViewModel viewModel, HttpServletResponse response, HttpServletRequest request){
        String status = CheckUtil.loginCheck(viewModel.getUserId(), response, request);
        if(status.equals("http status 401") || status.equals("http status 403")){
            return 0;
        }else{
            viewModel.setUserId(status);
        }
        return  boardService.insert(viewModel);
    }

    //게시글 답글 작성 하기
    @PostMapping(value = "/community/second")
    public Integer replyBoardInsert(@RequestBody ViewModel viewModel, HttpServletResponse response, HttpServletRequest request){
        String status = CheckUtil.loginCheck(viewModel.getUserId(), response, request);
        if(status.equals("http status 401") || status.equals("http status 403")){
            return 0;
        }else{
            viewModel.setUserId(status);
        }
        return  boardService.replyBoardInsert(viewModel);
    }

    //게시글 수정하기
    @PutMapping(value = "/community/{b_id}")
    public Integer update(@RequestBody ViewModel viewModel, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request){
        String status = CheckUtil.loginCheck(viewModel.getUserId(), response, request);
        if(status.equals("http status 401") || status.equals("http status 403")){
            return 0;
        }else{
            viewModel.setUserId(status);
        }
        return  boardService.update(viewModel, b_id);
    }

    //게시글 삭제하기
    @DeleteMapping(value = "/community/{b_id}")
    public Integer delete(@PathVariable int b_id, @RequestBody BoardModel boardModel, HttpServletResponse response, HttpServletRequest request){
        String status = CheckUtil.loginCheck(boardModel.getUserId(), response, request);
        if(status.equals("http status 401") || status.equals("http status 403")){
            return 0;
        }else{
            boardModel.setUserId(status);
        }
        return boardService.delete(b_id);
    }

    //게시글 상세보기
    @GetMapping(value = "/view/{b_id}")
    public ViewModel view(@PathVariable int b_id){
        return boardService.getView(b_id);
    }

    //검색단어로 게시글 리스트 가져오기
    @GetMapping(value = "/search/{word}")
    public List<BoardModel> search(@PathVariable("word") String word){
        return boardService.search(word);
    }

    //조회수가 가장많은 것을 기준으로 출력하기
    @GetMapping(value = "/rank")
    public List<BoardModel> rank(){
        return boardService.getRank();
    }

    //사진 업로드
    @PostMapping("/image")
    @ResponseBody
    public String upload(Model model, MultipartHttpServletRequest multipartHttpServletRequest, HttpServletResponse response, HttpServletRequest request) throws IOException {
        if(CheckUtil.imageCheck(response, request) >= 1){
            return "0";
        }
        return boardService.uploadImage(model, multipartHttpServletRequest, request);
    }

    //게시글 수정시 사진 업로드
    @PutMapping("/image/{i_id}")
    @ResponseBody
    public Integer updateImage(MultipartHttpServletRequest multipartHttpServletRequest, @PathVariable int i_id, HttpServletResponse response, HttpServletRequest request) throws IOException {
        if(CheckUtil.imageCheck(response, request) >= 1){
            return 0;
        }
        return boardService.updateImage(multipartHttpServletRequest, i_id, request);
    }

    //사진가져오기
    @GetMapping(value = "/image/{b_id}")
    public List<ImageModel> get(@PathVariable int b_id){
        return boardService.getImages(b_id);
    }

    @GetMapping("/download/{i_id}")
    public ResponseEntity<Resource> download(@PathVariable int i_id) throws IOException {
        ImageModel imageModel = boardService.getViewImage(i_id);
        Path path = Paths.get("./src/main/webapp/static/images/"+imageModel.getFile_name());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + path.getFileName().toString());

        Resource resource = new InputStreamResource(Files.newInputStream(path));
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/image")
    public Integer deleteImage(@RequestBody ImageModel imageModel, HttpServletResponse response, HttpServletRequest request){
        if(CheckUtil.imageCheck(response, request) >= 1){
            return 0;
        }
        return boardService.deleteImage(imageModel, request);
    }
}