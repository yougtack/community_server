package com.community.controller;


import com.community.model.CommentModel;
import com.community.model.CheckUserModel;
import com.community.model.SecondCommentModel;
import com.community.model.ThirdModel;
import com.community.service.CommentService;
import com.community.util.CheckUtil;
import com.community.util.LoginUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping(value = "/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

//    //댓글 보기
//    @CrossOrigin("*")
//    @GetMapping(value = "/{b_id}")
//    public List<CommentModel> getComment(@PathVariable int b_id){
//        return commentService.getComment(b_id);
//    }

    //댓글 입력
    @CrossOrigin("*")
    @PostMapping
    public Integer insert(@RequestBody CommentModel commentModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.loginCheck(loginUserId, commentModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return commentService.insert(commentModel);
    }

    //2번째 댓글 입력
    @CrossOrigin("*")
    @PostMapping(value = "/second")
    public Integer secondInsert(@RequestBody SecondCommentModel secondCommentModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.loginCheck(loginUserId, secondCommentModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return commentService.secondInsert(secondCommentModel);
    }

    //3번째 댓글 입력
    @CrossOrigin("*")
    @PostMapping(value = "/second")
    public Integer thirdInsert(@RequestBody ThirdModel thirdModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.loginCheck(loginUserId, thirdModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return commentService.thirdInsert(thirdModel);
    }

    //댓글 수정
    @CrossOrigin("*")
    @PutMapping
    public Integer update(@RequestBody CommentModel commentModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.loginCheck(loginUserId, commentModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return commentService.update(commentModel);
    }

    //댓글 삭제
    @CrossOrigin("*")
    @DeleteMapping(value = "/{c_id}")
    public Integer delete(@PathVariable int c_id, @RequestBody CheckUserModel checkUserModel, HttpServletResponse response, HttpServletRequest request){
        String loginUserId = LoginUtil.getCheckLogin(request);
        if(CheckUtil.loginCheck(loginUserId, checkUserModel.getUserId(), response, request) >= 1){
            return 0;
        }
        return commentService.delete(c_id);
    }
}
