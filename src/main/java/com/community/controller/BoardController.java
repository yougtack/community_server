package com.community.controller;

import com.community.model.BoardModel;
import com.community.model.DeleteModel;
import com.community.model.ImageModel;
import com.community.model.ViewModel;
import com.community.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping(value = "/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @GetMapping(value = "/boardList")
    public List<BoardModel> boardList(){
        return boardService.getBoardList();
    }

    @CrossOrigin("*")
    @PostMapping(value = "/community")
    public Integer insert(@RequestBody ViewModel model, HttpServletResponse response, HttpServletRequest request){
        return boardService.insert(model, response, request);
    }

    @PutMapping(value = "/community/{b_id}")
    public Integer update(@RequestBody ViewModel model, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request){
        return boardService.update(model, b_id, response, request);
    }

    @DeleteMapping(value = "/community/{b_id}")
    public Integer delete(@PathVariable int b_id, @RequestBody DeleteModel model, HttpServletResponse response, HttpServletRequest request){
        return boardService.delete(b_id, model, response, request);
    }

    @GetMapping(value = "/view/{b_id}")
    public ViewModel view(@PathVariable int b_id){
        boardService.count(b_id);
        return boardService.getView(b_id);
    }

    @GetMapping(value = "/search")
    public List<BoardModel> search(@RequestParam("word") String word){
        return boardService.search(word);
    }

    @PostMapping("/test")
    @ResponseBody
    public String upload(MultipartHttpServletRequest multipartHttpServletRequest) throws Exception {
        ImageModel image = new ImageModel();
        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("fileN[]");
        if(!multipartFiles.isEmpty()){
            for(MultipartFile filePart : multipartFiles){
                image.setFileName(filePart.getOriginalFilename());
                image.setImage(filePart.getBytes());
                boardService.image(image);
            }
        }

        return "ok";
    }

    @GetMapping(value = "/getTest", produces = MediaType.IMAGE_JPEG_VALUE)
    public List<ImageModel> get(){
        return boardService.getImage();
    }
}