import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/header";

export default function Appointment(props) {
  const appointments = () => {
    if (props.time) {
      return (<>Appointment at {props.time}</>);
    } else { return(<>No Appointments</>);}
  };
  return (
    <article className="appointment"> <Header time={appointments()}></Header></article>
  );
}