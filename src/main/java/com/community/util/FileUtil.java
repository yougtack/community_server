package com.community.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;

public class FileUtil {
    final static HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    final static String root_path = request.getSession().getServletContext().getRealPath("/");
    final static String attach_path = "static/images/";

    public static String fileInsert(MultipartFile filePart) throws IOException{
        UUID uuid = UUID.randomUUID();
        String exc = filePart.getOriginalFilename().substring(filePart.getOriginalFilename().lastIndexOf(".")+1);

        File saveFile = new File(root_path+attach_path+uuid+"."+exc);
        filePart.transferTo(saveFile);

        return uuid+"."+exc;
    }

    public static void fileDelete(String file_name) {
        File file = new File(root_path + attach_path + file_name);
        file.delete();
    }

    public static String transToJson(ArrayList<String> path) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        String jsonStr = mapper.writeValueAsString(path);

        return jsonStr;
    }
}
