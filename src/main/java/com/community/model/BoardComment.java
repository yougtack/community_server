package com.community.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BoardComment {
    private Integer b_id;
    private int b_recomment_id;
    private String b_type;
    private String b_title;
    private String b_content;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date b_date;
    private int b_count;
    private String userId;

    private int commentCount;
}
