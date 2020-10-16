package com.community.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentModel {
    private Integer c_id;
    private Integer b_id;
    private Integer recomment_id;
    private String c_content;
    private Long c_date;
    private String userId;
    private int updateCheck;
    private byte[] profile;
}
