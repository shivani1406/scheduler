import React,{useEffect} from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";

export default function Appointment(props) {
  // const appointments = () => {
  //   if (props.time) {
  //     return (<>Appointment at {props.time}</>);
  //   } else { return(<>No Appointments</>);}
  // };
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const {mode, transition, back} = useVisualMode(props.interview == null ? EMPTY : SHOW);
   //Side effect that listens for changes in state
   useEffect(() => {

  
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [props.interview, transition, mode]);
  
  return (
    <article className="appointment"> 
    <Header time={props.time}>
      </Header>
      {/* {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer} 
      // onEdit={props.onEdit} onDelete={props.onDelete}
      /> }
      {!props.interview && <Empty />} */}
      {mode === EMPTY && <Empty onAdd={transition(CREATE)} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
  />
)}
{mode === CREATE && (<Form interviewers={props.interviewers} onCancel={back}/>)}
      </article>
  );
}