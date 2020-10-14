package com.community.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class BoardComment {
    private Integer b_id;
    private int b_recomment_id;
    private String b_type;
    private String b_title;
    private String b_content;
    private Long b_date;
    private int b_count;
    private String userId;

    private int commentCount;
}
