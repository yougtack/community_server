package com.community.service.serviceimpl;

import com.community.dao.MemberDao;
import com.community.model.LoginModel;
import com.community.model.MemberListModel;
import com.community.model.MemberModel;
import com.community.service.MemberService;
import com.community.util.FileUtil;
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
    public Integer signUpProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId) throws IOException{
        String file_path = null;
        String file_name = null;

        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("profile");
        if(!multipartFiles.isEmpty()) {
            for (MultipartFile filePart : multipartFiles) {
                file_name =  FileUtil.fileInsert(filePart, 2);
                file_path = "/member_images/"+ file_name;
            }
        }else{
            file_name = "profile_default_png";
            file_path = "/member_images/default.png";
        }
        return dao.signUpProfile(userId, file_path, file_name);
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
    public Integer kickMember(MemberModel memberModel, HttpServletRequest request){
        memberModel = dao.getUserFileImage(memberModel.getUserId());
        String root_path = request.getSession().getServletContext().getRealPath("/");
        String attach_path = "member_images/";
        File file = new File(root_path+attach_path+memberModel.getFile_name());
        file.delete();

        return dao.kickMember(memberModel.getUserId());
    }

    @Override
    public Integer updateProfile(MultipartHttpServletRequest multipartHttpServletRequest, String userId) throws IOException{
        String file_path = null;
        String file_name = null;

        MemberModel memberModel = dao.getUserFileImage(userId);
        FileUtil.fileDelete(memberModel.getFile_name(), 2);


        List<MultipartFile>multipartFiles = multipartHttpServletRequest.getFiles("profile");
        if(!multipartFiles.isEmpty()) {
            for (MultipartFile filePart : multipartFiles) {
                file_name =  FileUtil.fileInsert(filePart, 2);
                file_path = "/member_images/"+ file_name;
            }
        }else{
            file_name = "profile_default.png";
            file_path = "/member_images/default.png";
        }
        return dao.signUpProfile(userId, file_path, file_name);
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
