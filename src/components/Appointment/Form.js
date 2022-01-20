// import React from "react";
import "components/Appointment/styles.scss"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';

export default function({ student, interviewer, onCancel, onSave, interviewers } = this.props)  {
  
  const [newstudent, setStudent] = useState(student || "");
  const [newinterviewer, setInterviewer] = useState(interviewer || null);

  function validate() {
    onSave(newstudent, newinterviewer.id);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
       value={student}  onChange={(event) => setStudent(event.target.value)}
      />
    </form>
    {newinterviewer ? <InterviewerList
            interviewers={interviewers}
            value={newinterviewer.id}
            onChange={setInterviewer}
          />
          :
          <InterviewerList
            interviewers={interviewers}
            value={newinterviewer}
            onChange={setInterviewer}
          />
          }
   
    
   
  </section>
  
  <section className="appointment__card-right">
    
    <section className="appointment__actions">
      <Button danger onClick={onCancel}>Cancel</Button>
      <Button confirm onClick={event => validate()}>Save</Button>
    </section>
  </section>
</main>
  
  );
}