// import React from "react";
import React, { useState,useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getInterviewersForDay, getAppointmentsForDay, getInterview } from "helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//   }
// ];
export default function Application(props) {
  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: [],
    interviewers: []
  });
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    // console.log(id, interview);
     //Make put request to update state locally and on server
     return (axios.put(`/api/appointments/${id}`, appointment)
     .then((res) => 
      setState((prev) => ({...prev, appointments})) )
      .catch((err) => console.log(err.message))
      );
  }
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
//   const appointmentlist = appointments.map((appointment) => {
//     return (
//   <Appointment key={appointment.id} id={appointment.id} time={appointment.time} interview={appointment.interview} />);
// });
const listAppointments = dailyAppointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  return (
    <Appointment 
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={interview}  
    interviewers={interviewers}  
    bookInterview={bookInterview}
    />
  )
});
  
  
  
useEffect(() => {
  Promise.all([
    axios.get(`http://localhost:8001/api/days`),
    axios.get('http://localhost:8001/api/appointments'),
    axios.get('http://localhost:8001/api/interviewers') 
  ])
    .then((all) => {  setState(prev => ({...prev, days: all[0].data,
    appointments:all[1].data,
  interviewers:all[2].data}))
  })
}, []);

const setDay = day => setState({ ...state, day });

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
      
      </section>
    </main>
  );
}
