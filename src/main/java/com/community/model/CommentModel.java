package com.community.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CommentModel {
    private int c_id;
    private int b_id;
    private String userId;
    private String c_content;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date c_date;
    private String file_path;
    private int group_id;
    private int parent_reply_id;
    private int depth;
    private int order_no;
    private int updateCheck;
}

