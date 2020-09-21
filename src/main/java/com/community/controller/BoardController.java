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
import java.io.IOException;
import java.net.URLEncoder;
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
                break;
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

    //상세번호로 사가져오기 (바이너리 상태)
    @CrossOrigin("*")
    @GetMapping(value = "/getImage/{b_id}")
    public List<ImageModel> get(@PathVariable int b_id){
        return boardService.getImage(b_id);
    }

//    //상세번호로 사가져오기 (사진 상태)
//    @CrossOrigin("*")
//    @GetMapping(value = "/getImage/{b_id}",  produces = MediaType.IMAGE_JPEG_VALUE)
//    public String get(@PathVariable int b_id, HttpServletResponse response) throws IOException{
//        ImageModel imageModel = boardService.getImage(b_id);
//
//        String result = imageModel.getFileName();
//
//        result = URLEncoder.encode(result, "UTF-8");
//        result = result.replaceAll("\\+", "%20");
//
//        byte[] input = imageModel.getImage();
//        try{
//            response.setHeader("Content-Disposition", "inline; fileName=\"" + result + "\";");
//            response.getOutputStream().write(input);
//            response.getOutputStream().flush();
//            response.getOutputStream().close();
//
//        }catch(Exception e){
//            e.printStackTrace();
//        }
//        return "가져왓음";
//    }

    //다운로드
    @CrossOrigin("*")
    @GetMapping(value = "/download/{i_id}")
    public String download(@PathVariable int i_id, HttpServletResponse response) throws IOException {
        ImageModel imageModel = boardService.getViewImage(i_id);
        String result = imageModel.getFileName();

        result = URLEncoder.encode(result, "UTF-8");
        result = result.replaceAll("\\+", "%20");

        byte[] input = imageModel.getImage();
        try{
            response.setContentType("application/octet-stream");
            response.setContentLength(input.length);
            response.setHeader("Content-Disposition", "attachment; fileName=\"" + result + "\";");
            response.setHeader("Content-Transfer-Encoding", "binary");
            response.getOutputStream().write(input);
            response.getOutputStream().flush();
            response.getOutputStream().close();

        }catch(Exception e){
            e.printStackTrace();
        }
        return "야호!";
    }
}