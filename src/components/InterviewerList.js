import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) { 
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.interviewer}
        setInterviewer={() => props.setInterviewer(interviewer.id)}
      />
    );
  });
 
  // const {interviewers, interviewer, setInterviewer} = props;
  // console.log(props.interviewers);
  

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> 
      {interviewers}
      {/* {interviewers.map((iv) => 
          <InterviewerListItem
            key = {iv.id}
            name = {iv.name}
            avatar = {iv.avatar}
            selected = {iv.id === interviewer}
            setInterviewer = {event => {setInterviewer(iv.id)}}
          />)} */}
          </ul>
    </section>
  );

};