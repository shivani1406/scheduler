import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const appointments = () => {
    if (props.time) {
      return (<>Appointment at {props.time}</>);
    } else { return(<>No Appointments</>);}
  };
  
  return (
    <article className="appointment"> 
    <Header time={appointments()}>
      </Header>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} 
      // onEdit={props.onEdit} onDelete={props.onDelete}
      /> : <Empty />}
      </article>
  );
}