package com.community.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestModel {
    private int c_id;
    private int b_id;
    private String userId;
    private String c_content;
    private int group_id;
    private int parent_reply_id;
    private int depth;
    private int order_no;
}
