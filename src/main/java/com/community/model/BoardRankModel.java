package com.community.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardRankModel {
    private Integer b_id;
    private String b_type;
    private String b_title;
    private Long b_date;
    private int b_count;
    private String userId;
}
