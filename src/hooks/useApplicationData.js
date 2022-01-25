import { useState, useEffect } from "react";

import axios from "axios";


const useApplictionData = () => {
  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: [],
    interviewers: []
  });
  
  const setDay = day => setState({ ...state, day });

  
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

 
  const cancelInterview = id => {

    return axios.delete(`/api/appointments/${id}`).then(res => {
    });
  };

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
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplictionData;