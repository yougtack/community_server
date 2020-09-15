package com.community.service.serviceimpl;

import com.community.dao.BoardDao;
import com.community.model.BoardModel;
import com.community.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    BoardDao dao;

    @Override
    public List<BoardModel> getBoardList(){
        return dao.getBoardList();
    }
}
