import React from "react";
import "components/Appointment/styles.scss"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
export default function(props)  {
  const {student, interviewers, interviewer, onSave, onCancel} = props
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
       value={props.student}
      />
    </form>
    <InterviewerList
            interviewers={interviewers}
            interviewer={interviewer}
          />
    
   
  </section>
  
  <section className="appointment__card-right">
    
    <section className="appointment__actions">
      <Button danger onClick={props.onCancel}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  
  );
}