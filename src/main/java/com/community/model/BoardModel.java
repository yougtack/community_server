package com.community.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardModel {
    private String b_id;
    private String b_title;
    private String b_content;
    private String b_date;
    private String userId;
}
