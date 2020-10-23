package com.community.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestModel {
    private int reply_id;
    private int article_id;
    private String member_id;
    private String description;
    private int group_id;
    private int parent_reply_id;
    private int depth;
    private int order_no;
}
