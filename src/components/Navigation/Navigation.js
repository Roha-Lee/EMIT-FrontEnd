
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {HeadNavigate, NavigationBlank, NavigationContents, Logo, Selected, LoginContainer, StyledLink, StyledLinkHome} from './Navigation.styled'
import { useNavigate } from 'react-router';
import { changeLogin } from "../../store";
import { connect } from "react-redux";
import {signOut, timeStamp, patchStudyTime} from "../../utils/utils"


function Navigation ({isLogin , setIsLogin,currentStudyTimeId , setCurrentStudyTimeId, timerOn}) {
    let navigate = useNavigate();

    async function handleSignIn(){
        if(isLogin === true){
            //TODO : 로그아웃시 서버와 통신 필요 ex. 토큰 삭제 및 타이머 정지하여 데이터 기록
            // setIsLogin(!isLogin); //TO Check
            const result = await patchStudyTime(currentStudyTimeId,timeStamp());
            setCurrentStudyTimeId(null);
            console.log(result);
            const signOutResponse = await signOut();

            if(signOutResponse.data.message === 'success'){
                window.sessionStorage.removeItem("accessToken");
                setIsLogin(!isLogin);
                navigate("/");
            }else{
                alert("서버오류");
            }

        }else{
            navigate("/Login");
        }
    }

    function handleSignUp(){
        if(isLogin === true){
            alert("로그아웃을 해주세요.");
        }else{
            navigate("/Signup");
        }
    }

    function handleStatistics(){
        if(isLogin === true){
            navigate("/Statistics");
        }else{
            alert("로그인을 해주세요.");
        }
    }


    return (
        <HeadNavigate>
            <NavigationBlank/>
            <NavigationContents>
                <div><StyledLinkHome to="/"><strong>M.AI.T</strong></StyledLinkHome></div>
                <LoginContainer>
                    <div><StyledLink onClick={handleSignUp}>회원가입</StyledLink></div>
                    <div><StyledLink onClick={handleSignIn}>{isLogin === true ? "로그아웃" : "로그인"}</StyledLink></div>
                    <div><StyledLink onClick={handleStatistics}>통계</StyledLink></div>
                </LoginContainer>
            </NavigationContents>
            <NavigationBlank/>
        </HeadNavigate>
    );

}

function mapStateToProps(state){
    return{
        isLogin : state.isLogin,
        currentStudyTimeId : state.currentStudyTimeId,
        timerOn : state.timerOn,
    };
}

function mapDispatchToProps(dispatch){
    return{
        setIsLogin : isLogin => dispatch(changeLogin(isLogin)),
        setCurrentStudyTimeId : id => dispatch(changeCurrentStudyTimeId(id))
    };
}


export default connect(mapStateToProps,mapDispatchToProps) (Navigation);