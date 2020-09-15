package com.community.controller;

import com.community.model.BoardModel;
import com.community.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @CrossOrigin("*")
    @GetMapping(value = "/community")
    public List<BoardModel> boardList(){
        return boardService.getBoardList();
    }
}
