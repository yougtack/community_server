package com.community.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommentModel {
    private Integer c_id;
    private Integer b_id;
    private String c_content;
    private String c_date;
    private String userId;

    private List<SecondCommentModel> secondComment;
}
