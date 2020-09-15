package com.community.controller;

import com.community.model.BoardModel;
import com.community.model.DeleteModel;
import com.community.model.ViewModel;
import com.community.service.BoardService;
import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(value = "/community/{b_id}")
    public Integer update(@RequestBody ViewModel model, @PathVariable int b_id, HttpServletResponse response, HttpServletRequest request){
        return boardService.update(model, b_id, response, request);
    }

    @DeleteMapping(value = "/community/{b_id}")
    public Integer delete(@PathVariable int b_id, @RequestBody DeleteModel model, HttpServletResponse response, HttpServletRequest request){
        return boardService.delete(b_id, model, response, request);
    }

    @GetMapping(value = "/view/{b_id}")
    public ViewModel view(@PathVariable int b_id){
        return boardService.getView(b_id);
    }
}
