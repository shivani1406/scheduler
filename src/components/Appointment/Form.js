// import React from "react";
import "components/Appointment/styles.scss"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';

export default function({ student, interviewer, onCancel, onSave, interviewers } = this.props)  {
  
  const [newstudent, setStudent] = useState(student || "");
  const [newinterviewer, setInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  const reset = function() {
    setStudent("");
    setInterviewer(null);
  };

  /**
   * Resets form and cancels
   */
  const cancel = function() {
    reset();
    onCancel();
  };

  function validate() {
    if (newstudent === "") {
      setError("student name cannot be blank");
      return;
    }
    setError("");
    onSave(newstudent, newinterviewer.id);
    // if(newstudent && newinterviewer.id) {
    //   onSave(newstudent, newinterviewer.id);
    // }
    
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" >
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
       value={student}  
       onChange={(event) => setStudent(event.target.value)}
       data-testid="student-name-input"
      
      />
    </form>
    <section className="appointment__validation">{error}</section>
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
      <Button danger onClick={event => cancel()}>Cancel</Button>
      <Button confirm onClick={event => validate()}>Save</Button>
    </section>
  </section>
</main>
  
  );
}