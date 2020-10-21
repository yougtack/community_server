package com.community.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CommentModel {
    private Integer c_id;
    private Integer b_id;
    private Integer recomment_id;
    private String c_content;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date c_date;
    private String userId;
    private int updateCheck;
    private byte[] profile;
}
