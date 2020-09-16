package com.community.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class ImageModel {
    private byte[] image;
    private String fileName;
}
