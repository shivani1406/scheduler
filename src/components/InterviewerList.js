import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

export default function InterviewerList({interviewers, value, onChange}=this.props) { 
  const ivs = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
      key = {interviewer.id}
      name = {interviewer.name}
      avatar = {interviewer.avatar}
      selected = {interviewer.id === value}
      setInterviewer = {event => {onChange(interviewer)}}
      />
    );
  });
 
  // const {interviewers, interviewer, setInterviewer} = props;
  // console.log(props.interviewers);
  

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> 
      {ivs}
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
