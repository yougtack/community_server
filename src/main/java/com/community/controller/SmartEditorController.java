package com.community.controller;

import com.community.config.FileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.Calendar;

@Controller(value = "/smartEditor")
public class SmartEditorController {
    @RequestMapping(value = "/fileUpload", method = RequestMethod.POST)
    public String fileUpload(Model model, MultipartRequest multipartRequest, HttpServletRequest request) throws IOException {
        System.out.println("Plz");
        MultipartFile imgfile = multipartRequest.getFile("Filedata");
        Calendar cal = Calendar.getInstance();
        String fileName = imgfile.getOriginalFilename();
        String fileType = fileName.substring(fileName.lastIndexOf("."), fileName.length());
        String replaceName = cal.getTimeInMillis() + fileType;

        String path = request.getSession().getServletContext().getRealPath("/")+ File.separator+"resources/upload";
        FileUpload.fileUpload(imgfile, path, replaceName);
        model.addAttribute("path", path);
        model.addAttribute("filename", replaceName);
        return "file_upload";
    }
}
