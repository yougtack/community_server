package com.community.dao;

import com.community.model.BoardModel;

import java.util.List;

public interface BoardDao {
    List<BoardModel> getBoardList();
}
