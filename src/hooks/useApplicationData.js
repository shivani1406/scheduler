import { useEffect , useReducer } from "react";

import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

const useApplictionData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => dispatch({ type: SET_DAY, day: day });
  
  /* ***** Booking Interview function ********/
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(r =>
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview
      })
    );
  }
 
  /* ***** Canceling Booking made  *****/
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(r =>
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null
      })
    );
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });

      //Websocket set up
      const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
      socket.onopen = () => {
        console.log("Web socket opened");
        socket.send("Ping...");
      };

      //On message from server, update state with interview
      socket.onmessage = appointmentData => {
        const appointment = JSON.parse(appointmentData.data);
        console.log(appointment);

        if (appointment.type === "SET_INTERVIEW") {

          dispatch({ type: "updateInterview", id: appointment.id, interview: appointment.interview});
        }
      };
    });
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplictionData;