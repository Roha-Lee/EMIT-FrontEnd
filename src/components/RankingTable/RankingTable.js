
import React, {useState, useRef, useEffect} from 'react';
import { Table, Tag, Space } from 'antd';
import {getRankingData, msToHmsFormat} from '../../utils/utils'

import {
    RankingContainer, 
    BlankComment, 
    RankCircle, 
    RankCircleContainer, 
    FrontFace, 
    FrontContents, 
    BackFace, 
    MyRankContainer, 
    MyRankText,
    TotalPersonText,
    MyPercentText, 
    CircleTitle, 
    MedalImage, 
    StyledTable,
    StyledTd,
    StyledTh,
    StyledTr,
} from "./RankingTable.styled"

import goldMedal from "./assets/gold-medal.png"
import silverMedal from "./assets/silver-medal.png"
import bronzeMedal from "./assets/bronze-medal.png"
import {connect} from "react-redux";
// function RankingTable ({currentUser}) {
let currentUser = "ROHAGRUROHAGRU"
function RankingTable () {
    const [userRanking, setUserRanking] = useState([]);
    const [myRanking, setMyRanking] = useState(0);
    const [isFront, setIsFront] = useState(true);
    
    useEffect(()=> {
        // getRankingData()
        // .then((res) => {
            
        //     if(res.data.message === 'SUCCESS'){
        //         // console.log(res.data.rank);
        //         // console.log(res.data.result);
        //         setMyRanking(parseInt(res.data.rank));
        //         setUserRanking(
        //             res.data.result.map((item, index) => {
        //                 return {
        //                     rank: index + 1,
        //                     nickname: item.nickname,
        //                     totalTime: msToHmsFormat(item.totalTime),
        //                 }        
        //         }))
        //     }
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
        // 테스트용 목데이터
        setMyRanking(2);
        setUserRanking(
            [
                {
                    rank:1,
                    nickname: "roha", 
                    totalTime: msToHmsFormat(1000000)

                },
                {
                    rank:2,
                    nickname: "ROHAGRUROHAGRU", 
                    totalTime: msToHmsFormat(100000)

                },
                {
                    rank:3,
                    nickname: "로하그루로하그", 
                    totalTime: msToHmsFormat(10000)

                },
                {
                    rank:4,
                    nickname: "로하그루로하그루로하", 
                    totalTime: msToHmsFormat(1000)

                },
                {
                    rank:5,
                    nickname: "rohagrurohagru", 
                    totalTime: msToHmsFormat(900)

                }, 
                {
                    rank:6,
                    nickname: "roha5grurohagru", 
                    totalTime: msToHmsFormat(800)

                }, 
                {
                    rank:7,
                    nickname: "roha4grurohagru", 
                    totalTime: msToHmsFormat(700)

                }, 
                {
                    rank:8,
                    nickname: "roha3grurohagru", 
                    totalTime: msToHmsFormat(600)

                },
                {
                    rank:9,
                    nickname: "roha2grurohagru", 
                    totalTime: msToHmsFormat(500)

                },
                {
                    rank:10,
                    nickname: "roha1grurohagru", 
                    totalTime: msToHmsFormat(450)

                },
                {
                    rank:10,
                    nickname: "roha1grurohagru", 
                    totalTime: msToHmsFormat(450)

                },
                {
                    rank:10,
                    nickname: "roha1grurohagru", 
                    totalTime: msToHmsFormat(450)

                },
                {
                    rank:10,
                    nickname: "roha1grurohagru", 
                    totalTime: msToHmsFormat(450)

                },
                {
                    rank:10,
                    nickname: "roha1grurohagru", 
                    totalTime: msToHmsFormat(450)

                },
                {
                    rank:10,
                    nickname: "roha1grurohagru", 
                    totalTime: msToHmsFormat(450)

                },
                {
                    rank:10,
                    nickname: "roha1grurohagru", 
                    totalTime: msToHmsFormat(450)

                },
            ]
        )
    }, [])
    const addMedalImage = (myRanking, size, type) => {
        console.log('myRanking', myRanking);
        if(myRanking === 1){
            return <MedalImage type={type} src={goldMedal} width={size} height={size} alt="goldMedal"/>;
        }
        else if(myRanking === 2){
            return <MedalImage type={type} src={silverMedal} width={size} height={size} alt="silverMedal"/>;
        }
        else if(myRanking === 3){
            return <MedalImage type={type} src={bronzeMedal} width={size} height={size} alt="bronzeMedal"/>;
        }
        else{
            return null;
        }
    }
    const rankingCirclePart = (
    <RankCircleContainer>
        <RankCircle className="rank-circle">
            <FrontFace>
                <FrontContents>
                    <CircleTitle type="front">{currentUser.length > 7 ? currentUser.substring(0, 7) + "⋯" : currentUser}</CircleTitle>
                    <MyRankContainer>
                        {addMedalImage(myRanking, 64, 'rankCircle')}
                        <MyRankText>{myRanking}</MyRankText>
                        <TotalPersonText>/{userRanking.length}</TotalPersonText>
                    </MyRankContainer>
                </FrontContents>
            </FrontFace>
            <BackFace>
                <CircleTitle type="back">상위</CircleTitle>
                <MyPercentText>{Math.floor(myRanking / userRanking.length * 100)}</MyPercentText>   
                
            </BackFace>
        </RankCircle>
    </RankCircleContainer>);

    const rankingTablePart = (
        <div style={{
            width: "100%",
            height: "65vh", 
            overflow: "auto"}}>


        <StyledTable>
            <thead>
                <StyledTr>
                <StyledTh>순위</StyledTh>
                <StyledTh>닉네임</StyledTh>
                <StyledTh>학습시간(HH:MM:SS)</StyledTh>
                </StyledTr>
            </thead>
            <tbody>
                {userRanking.map(item => {
                    return (<StyledTr >
                        <StyledTd data-label="순위">{item.rank < 4 ? addMedalImage(item.rank, 32, 'rankTable') : item.rank}</StyledTd>
                        <StyledTd data-label="닉네임">
                            {item.nickname}
                        </StyledTd>
                        <StyledTd data-label="학습시간">
                            {item.totalTime}
                        </StyledTd>
                    </StyledTr>);
                })}
            </tbody>
        </StyledTable>
        </div>
    );

    return (
        <RankingContainer>
            {myRanking > 0 ?
                rankingCirclePart:
                null
            }
            {myRanking > 0 ? 
                rankingTablePart
                // <Table columns={columns} dataSource={userRanking} /> 
                : 
                <BlankComment>오늘 학습 기록이 없어<br/> 순위를 확인할 수 없습니다.</BlankComment>
            }
        </ RankingContainer>
    );

}

function mapStateToProps(state){
    return{
        currentUser : state.currentUser,
    };
  }

export default connect(mapStateToProps) (RankingTable);