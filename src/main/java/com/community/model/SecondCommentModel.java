package com.community.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SecondCommentModel {
    private int second_id;
    private int c_id;
    private String c_content;
    private String c_date;
    private String userId;

    private List<ThirdModel> thirdComment;
}
