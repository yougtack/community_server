package com.community.controller;

import com.community.model.BoardModel;
import com.community.model.CheckUserModel;
import com.community.model.ImageModel;
import com.community.model.ViewModel;
import com.community.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @CrossOrigin("*")
    @GetMapping(value = "/boardList")
    public List<BoardModel> boardList(){
        return boardService.getBoardList();
    }

    @CrossOrigin("*")
    @PostMapping(value = "/community")
    public Integer insert(@RequestBody ViewModel model, HttpServletResponse response, HttpServletRequest request){
        return boardService.insert(model, response, request);
    }

    @CrossOrigin("*")
    @PutMapping(value = "/community/{b_id}")
    public Integer update(@RequestBody ViewModel viewModel, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request){
        return boardService.update(viewModel, b_id, response, request);
    }

    @CrossOrigin("*")
    @DeleteMapping(value = "/community/{b_id}")
    public Integer delete(@PathVariable int b_id, @RequestBody CheckUserModel model, HttpServletResponse response, HttpServletRequest request){
        return boardService.delete(b_id, model, response, request);
    }

    @CrossOrigin("*")
    @GetMapping(value = "/view/{b_id}")
    public ViewModel view(@PathVariable int b_id){
        boardService.count(b_id);
        return boardService.getView(b_id);
    }

    @CrossOrigin("*")
    @GetMapping(value = "/search")
    public List<BoardModel> search(@RequestParam("word") String word){
        return boardService.search(word);
    }

    @CrossOrigin("*")
    @PostMapping("/upload/{b_id}")
    @ResponseBody
    public Integer upload(MultipartHttpServletRequest multipartHttpServletRequest, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request) throws Exception {
        int result = 0;
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

    @CrossOrigin("*")
    @GetMapping(value = "/getImage/{b_id}")
    public List<ImageModel> get(@PathVariable int b_id){
        return boardService.getImage(b_id);
    }
}
