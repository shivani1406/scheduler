import React,{useEffect} from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  // const appointments = () => {
  //   if (props.time) {
  //     return (<>Appointment at {props.time}</>);
  //   } else { return(<>No Appointments</>);}
  // };
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
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

function save(name, interviewer) {
    
    if (name && interviewer) {
      transition(SAVING);

      const interview = {
        student: name,
        interviewer
      };

      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        // .catch(() => transition(ERROR_SAVE, true))
    }
  }
const edit = () => {
    transition(EDIT);
  };
const remove = () => {
    if (mode === SHOW) {
      transition(CONFIRM);
    } else {
      transition(DELETING);
      props.cancelInterview(props.id).then(
        () => window.location.reload(false),
        error => {
          console.log("Delete error:", error);
          // transition(ERROR_DELETE, true);
        }
      );
    }
  };

  return (
    <article className="appointment"> 
    <Header time={props.time}>
      </Header>
      {/* {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer} 
      // onEdit={props.onEdit} onDelete={props.onDelete}
      /> }
      {!props.interview && <Empty />} */}
      {mode === EMPTY && <Empty onAdd={transition} />}
{mode === SHOW && (
  <Show
    student={props.interview.student}
    interviewer={props.interview.interviewer}
    onDelete={remove}
    onEdit={edit}
  />
)}
{mode === CREATE && (<Form interviewers={props.interviewers}  onSave={save}
          onCancel={back}/>)}
           {mode === SAVING && <Status message="Saving" />}
           {mode === DELETING && <Status message="Deleting" />}
           {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to cancel this appointment"
          onCancel={back}
          onConfirm={remove}
        />
      )}

{mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={back}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      </article>
  );
}