package com.community.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BoardModel {
    private Integer b_id;
    private String b_type;
    private String b_title;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date b_date;
    private int b_count;
    private String userId;
    private int group_id;
    private int parent_reply_id;
    private int depth;
    private int order_no;
    private int updateCheck;
    private int commentCount;
}
