package com.community.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoardModel {
    private Integer b_id;
    private String b_type;
    private String b_title;
    private String b_date;
    private int b_count;
    private String userId;
    private byte[] profile;

    private List<CommentModel> comments;
}
