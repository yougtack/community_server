package com.community.controller;

import com.community.model.BoardModel;
import com.community.model.CheckUserModel;
import com.community.model.ImageModel;
import com.community.model.ViewModel;
import com.community.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
    @CrossOrigin("*")
    @GetMapping(value = "/boardList")
    public List<BoardModel> boardList(){
        return boardService.getBoardList();
    }

    //게시글 작성 하기
    @CrossOrigin("*")
    @PostMapping(value = "/community")
    public Integer insert(@RequestBody ViewModel model, HttpServletResponse response, HttpServletRequest request){
        return boardService.insert(model, response, request);
    }

    //게시글 수정하기
    @CrossOrigin("*")
    @PutMapping(value = "/community/{b_id}")
    public Integer update(@RequestBody ViewModel viewModel, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request){
        return boardService.update(viewModel, b_id, response, request);
    }

    //게시글 삭제하기
    @CrossOrigin("*")
    @DeleteMapping(value = "/community/{b_id}")
    public Integer delete(@PathVariable int b_id, @RequestBody CheckUserModel model, HttpServletResponse response, HttpServletRequest request){
        return boardService.delete(b_id, model, response, request);
    }

    //게시글 상세보기
    @CrossOrigin("*")
    @GetMapping(value = "/view/{b_id}")
    public ViewModel view(@PathVariable int b_id){
        boardService.count(b_id);
        return boardService.getView(b_id);
    }

    //검색단어로 게시글 리스트 가져오기
    @CrossOrigin("*")
    @GetMapping(value = "/search")
    public List<BoardModel> search(@RequestParam("word") String word){
        return boardService.search(word);
    }

    //사진 업로드
    @CrossOrigin("*")
    @PostMapping("/upload")
    @ResponseBody
    public Integer upload(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletResponse response, HttpServletRequest request) throws Exception {
        int result = 0;
        int b_id = boardService.getB_id();
        ImageModel image = new ImageModel();
        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("fileN[]");
        if(!multipartFiles.isEmpty()){
            for(MultipartFile filePart : multipartFiles){
                image.setFileName(filePart.getOriginalFilename());
                image.setImage(filePart.getBytes());
                result = boardService.imageUpload(image, b_id, response, request);
            }
        }
        return result;
    }

    //게시글 수정시 사진 업로드
    @CrossOrigin("*")
    @PostMapping("/upload/{b_id}")
    @ResponseBody
    public Integer updateUpload(MultipartHttpServletRequest multipartHttpServletRequest, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request) throws Exception {
        int result = 0;
        ImageModel image = new ImageModel();
        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("fileN[]");
        if(!multipartFiles.isEmpty()){
            for(MultipartFile filePart : multipartFiles){
                image.setFileName(filePart.getOriginalFilename());
                image.setImage(filePart.getBytes());
                result = boardService.imageUpdate(image, b_id, response, request);
            }
        }
        return result;
    }

    //상세번호로 사가져오기
    @CrossOrigin("*")
    @GetMapping(value = "/getImage/{b_id}")
    public List<ImageModel> get(@PathVariable int b_id){
        return boardService.getImage(b_id);
    }

    //아랫쪽 짐(download)
    @GetMapping("download/{i_id}")
    public ResponseEntity<InputStreamResource> download(@PathVariable int i_id, HttpServletRequest request) throws IOException {
        request.setCharacterEncoding("UTF-8");
        ImageModel imageModel = boardService.getViewImage(i_id);
        String tmp = new String(imageModel.getImage());
        System.out.println(tmp);

        Path path = Paths.get("/Users/kim-youngtack/desktop/google.png");


        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + path.getFileName().toString());

        InputStreamResource resource = new InputStreamResource(Files.newInputStream(path));
        return new ResponseEntity<>(resource, headers, HttpStatus.OK);
    }
}