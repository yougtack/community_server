package com.community.service.serviceimpl;

import com.community.dao.MemberDao;
import com.community.model.CheckUserModel;
import com.community.model.MemberModel;
import com.community.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberDao dao;

    @Override
    public Integer signUp(MemberModel memberModel){
        return dao.signUp(memberModel.getUserId(), memberModel.getUserPw());
    }

    @Override
    public Integer signUpProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId) throws IOException{
        int result = 0;
        File file = new File("./src/main/webapp/static/default.png");
        FileInputStream in = new FileInputStream(file);
        ByteArrayOutputStream bout = new ByteArrayOutputStream();

        byte[] by = new byte[(int)file.length()];
        int len = 0;

        while((len=in.read(by)) != -1)
            bout.write(by, 0, len);

        byte[] imgbuf = bout.toByteArray();
        bout.close();
        in.close();

        byte[] profile;

        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("profile");
        if(!multipartFiles.isEmpty()) {
            for (MultipartFile filePart : multipartFiles) {
                if(filePart.getOriginalFilename().equals("")) {
                    profile = imgbuf;
                }else{
                    profile = filePart.getBytes();
                }
                result = dao.signUpProfile(userId, profile);
            }
        }
        return result;
    }

    @Override
    public MemberModel login(MemberModel member){
        return dao.login(member.getUserId(), member.getUserPw());
    }

    @Override
    public List<MemberModel> getMemberList(){
        return dao.getMemberList();
    }

    @Override
    public Integer kickMember(CheckUserModel checkUserModel){
        return dao.kickMember(checkUserModel.getUserId());

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
}
