package com.community.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ImageModel {
    private Integer i_id;
    private Integer b_id;
    private byte[] image;
    private String fileName;
    private String userId;
}
