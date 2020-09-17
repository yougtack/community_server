package com.community.controller;


import com.community.model.CommentModel;
import com.community.model.CheckUserModel;
import com.community.service.CommentService;
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

    @GetMapping(value = "/{b_id}")
    public List<CommentModel> getComment(@PathVariable int b_id){
        return commentService.getComment(b_id);
    }

    @PostMapping
    public Integer insert(@RequestBody CommentModel model, HttpServletResponse response, HttpServletRequest request){
        return commentService.insert(model ,response, request);
    }

    @PutMapping
    public Integer update(@RequestBody CommentModel model, HttpServletResponse response, HttpServletRequest request){
        return commentService.update(model ,response, request);
    }

    @DeleteMapping(value = "/{c_id}")
    public Integer delete(@PathVariable int c_id, @RequestBody CheckUserModel model, HttpServletResponse response, HttpServletRequest request){
        return commentService.delete(c_id, model, response, request);
    }
}
