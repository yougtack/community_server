package com.community.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SecondCommentModel {
    private int c_id;
    private int b_id;
    private int recomment_id;
    private String c_content;
    private Long c_date;
    private String userId;
    private byte[] profile;
}
