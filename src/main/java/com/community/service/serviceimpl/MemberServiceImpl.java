package com.community.service.serviceimpl;

import com.community.dao.MemberDao;
import com.community.model.LoginModel;
import com.community.model.MemberModel;
import com.community.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberDao dao;

    @Override
    public Integer signUp(MemberModel memberModel, String encode) {
        return dao.signUp(encode, memberModel.getUserId(), memberModel.getUserPw());
    }

//    @Override
//    public Integer signUpProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId) throws IOException{
//        int result = 0;
//        File file = new File("./src/main/webapp/static/default.png");
//        FileInputStream in = new FileInputStream(file);
//        ByteArrayOutputStream bout = new ByteArrayOutputStream();
//
//        byte[] by = new byte[(int)file.length()];
//        int len = 0;
//
//        while((len=in.read(by)) != -1) {
//            bout.write(by, 0, len);
//        }
//
//        byte[] imgbuf = bout.toByteArray();
//        bout.close();
//        in.close();
//
//        byte[] profile = new byte[0];
//
//        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("profile");
//        if(!multipartFiles.isEmpty()) {
//            for (MultipartFile filePart : multipartFiles) {
//                profile = filePart.getBytes();
//            }
//        }else{
//            profile = imgbuf;
//        }
//        return dao.signUpProfile(userId, profile);
//    }


    @Override
    public Integer signUpProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId, HttpServletRequest request) throws IOException{
        String file_path = null;

        UUID uuid = UUID.randomUUID();
        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("profile");
        if(multipartFiles != null) {
            System.out.println("in if!");
            for (MultipartFile filePart : multipartFiles) {
                String root_path = request.getSession().getServletContext().getRealPath("/");
                String attach_path = "member_images/";
                String filename = uuid+"_"+filePart.getOriginalFilename();

                File saveFile = new File(root_path+attach_path+filename);
                filePart.transferTo(saveFile);

                file_path = "localhost:8080/static/images/"+filename;
            }
        }else{
            System.out.println("in else!");
            file_path = "localhost:8080/member_images/default.png";
        }
        return dao.signUpProfile(userId, file_path);
    }
    @Override
    public LoginModel login(MemberModel member){
        return dao.login(member.getUserId(), member.getUserPw());
    }

    @Override
    public List<MemberModel> getMemberList(){
        return dao.getMemberList();
    }

    @Override
    public Integer kickMember(MemberModel memberModel){
        return dao.kickMember(memberModel.getUserId());

    }

    @Override
    public Integer updateProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId) throws IOException{
        int result = 0;

        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("profile");
        if(!multipartFiles.isEmpty()) {
            for (MultipartFile filePart : multipartFiles) {
                if (filePart.getOriginalFilename().equals("")) {
                    return result;
                }else{
                    result = dao.updateProfile(userId, filePart.getBytes());
                }
            }
        }
        return result;
    }

    @Override
    public Integer updateUser(MemberModel memberModel){
        return dao.updateUser(memberModel.getUserId(), memberModel.getUserPw());
    }

    @Override
    public LoginModel getUserInfo(MemberModel memberModel){
        return dao.getUserInfo(memberModel.getEncode());
    }
}
