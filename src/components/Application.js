// import React from "react";
import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getInterviewersForDay, getAppointmentsForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
 
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

const listAppointments = dailyAppointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  if(interview){
  return (
    <Appointment 
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}  
    interviewers={interviewers}  
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
    />
  )
  }else{
    return (
      <Appointment 
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={null}  
    interviewers={interviewers}  
    bookInterview={bookInterview}
    />
    )}
});
  

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />

<nav className="sidebar__menu">
  
  <DayList
    days={state.days}
    propDay={state.day}
    setDay={day => {
      setDay(day);
    }}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}
/>
  </nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {listAppointments}
      <Appointment key="last" time="5pm" bookInterview={bookInterview}
    cancelInterview={cancelInterview}/>
      </section>
    </main>
  );
}
