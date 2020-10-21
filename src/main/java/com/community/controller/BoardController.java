package com.community.controller;

import com.community.model.*;
import com.community.service.BoardService;
import com.community.util.CheckUtil;
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
        if(CheckUtil.loginCheck(viewModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return  boardService.insert(viewModel);
    }

    //게시글 답글 작성 하기
    @PostMapping(value = "/community/second")
    public Integer secondInsert(@RequestBody ViewModel viewModel, HttpServletResponse response, HttpServletRequest request){
        if(CheckUtil.loginCheck(viewModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return  boardService.secondInsert(viewModel);
    }

    //게시글 수정하기
    @PutMapping(value = "/community/{b_id}")
    public Integer update(@RequestBody ViewModel viewModel, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request){
        if(CheckUtil.loginCheck(viewModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return  boardService.update(viewModel, b_id);
    }

    //게시글 삭제하기
    @DeleteMapping(value = "/community/{b_id}")
    public Integer delete(@PathVariable int b_id, @RequestBody CheckUserModel checkUserModel, HttpServletResponse response, HttpServletRequest request){
        if(CheckUtil.loginCheck(checkUserModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return boardService.delete(b_id);
    }

    //게시글 상세보기
    @GetMapping(value = "/view/{b_id}")
    public ViewModel view(@PathVariable int b_id){
        boardService.count(b_id);
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
    @PostMapping("/upload")
    @ResponseBody
    public Integer upload(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletResponse response, HttpServletRequest request) throws IOException {
        if(CheckUtil.imageCheck(response, request) >= 1){
            return 0;
        }
        return boardService.imageUpload(multipartHttpServletRequest);
    }

    //게시글 수정시 사진 업로드
    @PostMapping("/upload/{b_id}")
    @ResponseBody
    public Integer insertUpload(MultipartHttpServletRequest multipartHttpServletRequest, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request) throws IOException {
        if(CheckUtil.imageCheck(response, request) >= 1){
            return 0;
        }
        return boardService.imageInsert(multipartHttpServletRequest, b_id);
    }

    //상세번호로 사가져오기 (바이너리 상태)
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

    @DeleteMapping(value = "/{i_id}")
    public Integer deleteImage(@PathVariable("i_id") int i_id, HttpServletResponse response, HttpServletRequest request){
        if(CheckUtil.imageCheck(response, request) >= 1){
            return 0;
        }
        return boardService.deleteImage(i_id);
    }

    @PostMapping(value = "/test")
    public Integer file_upload(MultipartHttpServletRequest multipartHttpServletRequest, HttpServletResponse response, HttpServletRequest request) {
        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("editor");
        for(MultipartFile filePart : multipartFiles){
            System.out.println(filePart.getOriginalFilename());
            System.out.println(filePart.getName());
            System.out.println("-----------------");
        }

//        try { //파일정보
        // String sFileInfo = "";
        // 파일명을 받는다 - 일반 원본파일명
        // String filename = request.getHeader("file-name");
        // 파일 확장자
        // String filename_ext = filename.substring(filename.lastIndexOf(".")+1);
        // 확장자를소문자로 변경 filename_ext = filename_ext.toLowerCase();
        // 이미지 검증 배열변수 String[] allow_file = {"jpg","png","bmp","gif"};
        // 돌리면서 확장자가 이미지인지
        // int cnt = 0;
        // for(int i=0; i<allow_file.length; i++) {
        //      if(filename_ext.equals(allow_file[i])){ cnt++; }
        // } //이미지가 아님
        // if(cnt == 0) {
        // PrintWriter print = response.getWriter();
        //      print.print("NOTALLOW_"+filename);
        //      print.flush(); print.close();
        //  } else {
        // 이미지이므로 신규 파일로 디렉토리 설정 및 업로드
        // 파일 기본경로
        // String dftFilePath = request.getSession().getServletContext().getRealPath("/");
        // 파일 기본경로 _ 상세경로
        // String filePath = dftFilePath + "resources" + File.separator + "editor" + File.separator +"multiupload" + File.separator;
        // File file = new File(filePath);
        // if(!file.exists()) { file.mkdirs(); }
        // String realFileNm = "";
        // SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        // String today= formatter.format(new java.util.Date());
        // realFileNm = today+UUID.randomUUID().toString() + filename.substring(filename.lastIndexOf("."));
        // String rlFileNm = filePath + realFileNm;
        // /////////////// 서버에 파일쓰기 /////////////////
        // InputStream is = request.getInputStream();
        // OutputStream os=new FileOutputStream(rlFileNm);
        // int numRead; byte b[] = new byte[Integer.parseInt(request.getHeader("file-size"))];
        // while((numRead = is.read(b,0,b.length)) != -1){
        // os.write(b,0,numRead);
        // } if(is != null) { is.close(); }
        // os.flush();
        // os.close();
        // /////////////// 서버에 파일쓰기 /////////////////
        // 정보 출력
        // sFileInfo += "&bNewLine=true";
        // img 태그의 title 속성을 원본파일명으로 적용시켜주기 위함
        // sFileInfo += "&sFileName="+ filename;; sFileInfo += "&sFileURL="+"/resources/editor/multiupload/"+realFileNm; PrintWriter print = response.getWriter();
        // print.print(sFileInfo);
        // print.flush();
        // print.close(); } }
        // catch (Exception e) {
        // e.printStackTrace();
        // }
        return 0;
    }
}