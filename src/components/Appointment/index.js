import React,{useEffect} from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {mode, transition, back} = useVisualMode(props.interview == null ? EMPTY : SHOW);
   //Side effect that listens for changes in state
useEffect(() => {  
    if (props.interview && mode === EMPTY) {
     transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
     transition(EMPTY);
    }
   }, [mode, transition, props.interview]);

/* Called when user press save button */
function save(name, interviewer) {
  // debugger
  if (!interviewer) {
    transition(ERROR_SAVE, true);
  } 
  if (name && interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer: interviewer.id
    };
      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
    }
  }

/* Called when edit icon is pressed */
const edit = () => {
    transition(EDIT);
  };

const errorClose = () => {
    back();
  };

/* Called when deleting appointment */
const remove = () => {
  if (mode === CONFIRM) {
    transition(DELETING, true)
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE, true))
  } else {
    transition(CONFIRM);      
  }
  };

return (
<article className="appointment"> 
<Header time={props.time}>
</Header>
{mode === EMPTY && <Empty onAdd={transition} />}
{mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={remove}
      onEdit={edit}
    />  
)}
{mode === CREATE && 
    (<Form name={props.name} 
      value={props.value} 
      interviewers={props.interviewers}  
      onSave={save}
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
        name={props.name ? props.name : props.interview.student}
        value={props.value ? props.value: props.interview.interviewer.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={back}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}

{mode === ERROR_SAVE && (
        <Error   message="Could not create appointment" onClose={errorClose} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment" onClose={errorClose} />
      )}
      </article>
  );
}