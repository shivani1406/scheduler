import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) { 
  
  const {interviewers, interviewer, setInterviewer} = props;
  console.log(props.interviewers);
  

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {interviewers.map((iv) => 
          <InterviewerListItem
            key = {iv.id}
            name = {iv.name}
            avatar = {iv.avatar}
            selected = {iv.id === interviewer}
            setInterviewer = {iv.setInterviewer} {...iv}
          />)}
          </ul>
    </section>
  );

};