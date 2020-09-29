package com.community.service.serviceimpl;

import com.community.dao.MemberDao;
import com.community.model.CheckUserModel;
import com.community.model.MemberModel;
import com.community.model.TestModel;
import com.community.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberDao dao;

    @Override
    public Integer signUp(MemberModel member, HttpServletResponse response) {
        int result = 0;
        try{
           result =  dao.signUp(member.getUserId(), member.getUserPw());
        }catch(Exception e){
            response.setStatus(HttpStatus.FORBIDDEN.value());
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
    public TestModel getUserInfo(TestModel testModel){
        return dao.getUserInfo(testModel.getUserId());
    }

    @Override
    public Integer kickMember(CheckUserModel checkUserModel){
        return dao.kickMember(checkUserModel.getUserId());

    }
}
