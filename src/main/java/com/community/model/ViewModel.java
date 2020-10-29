package com.community.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class ViewModel {
    private Integer b_id;
    private String b_type;
    private String b_title;
    private String b_content;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date b_date;
    private int b_count;
    private String userId;
    private int group_id;
    private int parent_reply_id;
    private int depth;
    private int order_no;
    private String file_path;

    private List<CommentModel> comments;
}
