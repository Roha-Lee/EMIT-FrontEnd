import React, { useEffect, useState } from 'react';
import { timeStamp, postStudyTime, patchStudyTime } from '../../utils/utils';
// import style from './Timer.module.css'
import {SubjectTitle, TimerContainer, Timer_set, TimerButton,NoSubjectMessage} from './Timer.styled'
import 'animate.css'
import {connect} from "react-redux";
import {changeCurrentStudyTimeId, changeTimerOn} from "../../store";
import { notification} from 'antd';
import { useNavigate } from 'react-router';
let startTimeFormatted, endTimeFormatted, startTime, offset, interval;
let currentStudyTimeId = null;

function Timer({
  subjects, 
  setSubjects,
  currentSubject, 
  setCurrentSubject, 
  timerOn, 
  setTimerOn, 
  currentTime, 
  setCurrentTime,
  faceDetected,
  useAi,
  userTimerOn, 
  setUserTimerOn,
  isEditMode,
  setIsEditMode,
  isLogin,
  setCurrentStudyTimeId,
  setGlobalTimerOn,
}) {
  let navigate = useNavigate();
  const loginComment = () =>{
    notification.open({
      message : "로그인을 해주세요.",
    });
  }
  useEffect(async () => {
    if(timerOn){
      try {
        startTimeFormatted = timeStamp();
        startTime = Date.now();
        offset = currentTime;
        interval = setInterval(() => {
          setCurrentTime(offset + Date.now() - startTime);
        }, 73)
        const currentSubjectId = subjects.find(elem => elem.name === currentSubject).subjectId;  
        const result = await postStudyTime(currentSubjectId, startTimeFormatted);
        if(result.data.message === 'SUCCESS'){
          currentStudyTimeId = result.data.id;
          setCurrentStudyTimeId(currentStudyTimeId);
        }
      } catch(error) {
        console.log(error);
      }
      
    }
    else {
      endTimeFormatted = timeStamp();
      clearInterval(interval);
      if(currentSubject !== null){
        const updatedSubject = [...subjects];
        const subjectIdx = subjects.findIndex(subject => subject.name === currentSubject)
        updatedSubject[subjectIdx].totalTime = currentTime;
        setSubjects(updatedSubject);
      }
      if (!!currentStudyTimeId){
        const result = await patchStudyTime(currentStudyTimeId, endTimeFormatted);
        console.log(result);
        currentStudyTimeId = null;  
      }
      // sendStudyInterval(startTimeFormatted, endTimeFormatted, currentSubjectId);  
      // onChangeStudyLog(indexToName(subjects, currentSubjectId), currentTime);
    }
  }, [timerOn]);

  const timer = (
    <Timer_set>{ (currentTime >= 3600000 ? Math.floor((currentTime / 3600000) % 24) : Math.floor((currentTime/ 60000) % 60)).toString().padStart(2, '0') }
    : { (currentTime >= 3600000 ? Math.floor((currentTime / 60000) % 60) : Math.floor((currentTime/ 1000) % 60)).toString().padStart(2, '0') }
    : { (currentTime >= 3600000 ? Math.floor((currentTime / 1000) % 60) : Math.floor((currentTime % 1000) / 10)).toString().padStart(2, '0') }</Timer_set>
  );
  
  // const timer = (
  //   <span className={style.timer}>{ Math.floor((currentTime / 3600000) % 24).toString().padStart(2, '0') }
  //   : { Math.floor((currentTime / 60000) % 60).toString().padStart(2, '0') }
  //   : { Math.floor((currentTime / 1000) % 60).toString().padStart(2, '0') }</span>
  // );
  // window.addEventListener("beforeunload", (event)=>{
  //   event.preventDefault();
  //   if(timerOn){
  //     patchStudyTime(currentStudyTimeId,timeStamp());
  //   }
  //   window.sessionStorage.removeItem("accessToken");
  //   return event.returnValue = "종료하시겠습니까?";
  // })
  
  return ( 
    <TimerContainer>
      {subjects.length > 0 ? 
      (<><SubjectTitle>
        {currentSubject}
      </SubjectTitle>
      {timer}
      <TimerButton 
        onClick = {
        (event) => {
          // if(event.target.classList.contains('animate__animated')){
          //   event.target.classList.remove('animate__animated')
          //   event.target.classList.remove('animate__shakeX')
          // }
          if(isLogin){
            if(isEditMode !== true){
              setTimerOn(!timerOn);          
              setUserTimerOn(!timerOn);
              setGlobalTimerOn(!timerOn);
            } else {
              event.target.classList.add('animate__animated')
              event.target.classList.add('animate__headShake')
              setTimeout(() => {
                event.target.classList.remove('animate__animated')
                event.target.classList.remove('animate__headShake')
              }, 500);
            }
          }else{
            loginComment();
            setTimeout(navigate("/Login"),1000);
          }
        }}> 
        {timerOn ? "STOP" : "START"}
      </TimerButton></>) : <NoSubjectMessage>과목 정보가 없습니다. <br />버튼을 눌러 과목을 추가해주세요.</NoSubjectMessage>}
    </TimerContainer>
  );
}

// class Timer extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleStopwatch.bind(this);
//   }
  
//   handleStopwatch() {
//     const {subjects, currentTime, currentSubjectId, timerRunning, onChangeCurrentTime, onChangeStudyLog} = this.props;
//     if(!timerRunning){
//       this.startTimeFormatted = timeStamp();
//       this.startTime = Date.now();
//       this.offset = currentTime;
//       this.interval = setInterval(() => {
//         onChangeCurrentTime(this.offset + Date.now() - this.startTime);
//       }, 70)
//     }
//     else {
//       this.endTimeFormatted = timeStamp();
//       clearInterval(this.interval);
//       sendStudyInterval(this.startTimeFormatted, this.endTimeFormatted, currentSubjectId);  
//       onChangeStudyLog(indexToName(subjects, currentSubjectId), currentTime);
//     }
//   }

//   render() {
//     const timer = (<h1>
//       <span className={style.timer}>{ (this.props.currentTime >= 3600000 ? Math.floor((this.props.currentTime / 3600000) % 24) : Math.floor((this.props.currentTime/ 60000) % 60)).toString().padStart(2, '0') }
//       : { (this.props.currentTime >= 3600000 ? Math.floor((this.props.currentTime / 60000) % 60) : Math.floor((this.props.currentTime/ 1000) % 60)).toString().padStart(2, '0') }
//       : { (this.props.currentTime >= 3600000 ? Math.floor((this.props.currentTime / 1000) % 60) : Math.floor((this.props.currentTime % 1000) / 10)).toString().padStart(2, '0') }</span>
//     </h1>);
//     const {
//       onChangeTimerRunning,
//     } = this.props;
//     return ( 
//       <div className = {style.timerContainer} >
//         {timer}
//         <button className={style.timerButton} 
//           onClick = {
//           () => {
//             onChangeTimerRunning(this.props.timerRunning);
//             this.handleStopwatch();
//           }}> 
//           {this.props.timerRunning ? "Stop" : "Start"}
//         </button> 
//       </div>
//     );
//   }
// }

// const timer = (<h1>
//   <span className={style.timer}>{ (props.currentTime >= 3600000 ? Math.floor((props.currentTime / 3600000) % 24) : Math.floor((props.currentTime/ 60000) % 60)).toString().padStart(2, '0') }
//   : { (props.currentTime >= 3600000 ? Math.floor((props.currentTime / 60000) % 60) : Math.floor((props.currentTime/ 1000) % 60)).toString().padStart(2, '0') }
//   : { (props.currentTime >= 3600000 ? Math.floor((props.currentTime / 1000) % 60) : Math.floor((props.currentTime % 1000) / 10)).toString().padStart(2, '0') }</span>
// </h1>);

function mapStateToProps(state){
  return{
      isLogin : state.isLogin,
  };
}

function mapDispatchToProps(dispatch){
  return{
      setCurrentStudyTimeId : id => dispatch(changeCurrentStudyTimeId(id)),
      setGlobalTimerOn : timerOn => dispatch(changeTimerOn(timerOn)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps) (Timer);