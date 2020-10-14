package com.community.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class CommentModel {
    private Integer c_id;
    private Integer b_id;
    private String c_content;
    private Long c_date;
    private String userId;
    private byte[] profile;

    private List<SecondCommentModel> secondComment;
}
