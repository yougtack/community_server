package com.community.service.serviceimpl;

import com.community.dao.MemberDao;
import com.community.model.ImageModel;
import com.community.model.LoginModel;
import com.community.model.MemberListModel;
import com.community.model.MemberModel;
import com.community.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
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

    @Override
    public Integer signUpProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId, HttpServletRequest request) throws IOException{
        String file_path = null;
        String filename = null;
        UUID uuid = UUID.randomUUID();
        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("profile");
        if(!multipartFiles.isEmpty()) {
            for (MultipartFile filePart : multipartFiles) {
                String root_path = request.getSession().getServletContext().getRealPath("/");
                String attach_path = "member_images/";
                filename = uuid+"_"+filePart.getOriginalFilename();

                File saveFile = new File(root_path+attach_path+filename);
                filePart.transferTo(saveFile);

                file_path = "/member_images/"+filename;
            }
        }else{
            file_path = "/member_images/default.png";
            filename = uuid+"_default_png";
        }
        return dao.signUpProfile(userId, file_path, filename);
    }
    @Override
    public LoginModel login(MemberModel member){
        return dao.login(member.getUserId(), member.getUserPw());
    }

    @Override
    public List<MemberListModel> getMemberList(){
        return dao.getMemberList();
    }

    @Override
    public Integer kickMember(MemberModel memberModel){
        return dao.kickMember(memberModel.getUserId());

    }

    @Override
    public Integer updateProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId, HttpServletRequest request) throws IOException{
        String file_path = null;
        String filename = null;
        UUID uuid = UUID.randomUUID();

        MemberModel memberModel = dao.getUserFileImage(userId);
        String root_path = request.getSession().getServletContext().getRealPath("/");
        String attach_path = "member_images/";
        File file = new File(root_path+attach_path+memberModel.getFile_name());
        file.delete();


        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("profile");
        if(!multipartFiles.isEmpty()) {
            for (MultipartFile filePart : multipartFiles) {
                filename = uuid+"_"+filePart.getOriginalFilename();
                file_path = "/member_images/"+filename;

                File saveFile = new File(root_path+attach_path+filename);
                filePart.transferTo(saveFile);

            }
        }else{
            file_path = "/member_images/default.png";
            filename = uuid+"_default_png";
        }
        return dao.signUpProfile(userId, file_path, filename);
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
