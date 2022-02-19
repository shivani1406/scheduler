
import "components/Appointment/styles.scss"
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import React, { useState } from 'react';

export default function({ student, interviewer, onCancel, onSave, interviewers } = this.props)  {
  
  const [newstudent, setStudent] = useState(student || "");
  const [newinterviewer, setInterviewer] = useState(interviewer || null);
  const [error, setError] = useState("");

  /* Called on Cancel */
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

  /* Validates Form Before Saving */
  function validate() {
    if (newstudent === "") {
      setError("student name cannot be blank");
      return;
    }
    if (!newinterviewer) {
      setError('Please select an interviewer');
      return;
    }
    setError("");
    onSave(newstudent, newinterviewer);
    
  }

  return (
  <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={student}
        type="text"
        placeholder="Enter Student Name"
       value={newstudent}  
       onChange={(event) => setStudent(event.target.value)}
       data-testid="student-name-input"
      
      />
    </form>


    <section className="appointment__validation">{error}</section>
    {newinterviewer ? <InterviewerList
            interviewers={interviewers}
            value={newinterviewer.id}
            onChange={(event) => setInterviewer(event)}
          />
          :
          <InterviewerList
            interviewers={interviewers}
            value={newinterviewer}
            onChange={(event) => setInterviewer(event)}
          />
          }    
   
  </section>
  
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={event => cancel()}>Cancel</Button>
      <Button confirm onSubmit={event => event.preventDefault()} onClick={event => validate()}>Save</Button>
    </section>
  </section>
</main>
  
  );
}