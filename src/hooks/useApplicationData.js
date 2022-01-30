import { useEffect , useReducer } from "react";

import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

const useApplictionData = () => {
  // const [state, setState] = useState({
  //   day:"Monday",
  //   days: [],
  //   appointments: [],
  //   interviewers: []
  // });
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  //const setDay = day => setState({ ...state, day });
  const setDay = day => dispatch({ type: SET_DAY, day: day });
  
  // function bookInterview(id, interview) {
  //     const appointment = {
  //       ...state.appointments[id],
  //       interview: { ...interview }
  //     };
  //     const appointments = {
  //       ...state.appointments,
  //       [id]: appointment
  //     };
      
  //     // console.log(id, interview);
  //      //Make put request to update state locally and on server
  //      return (axios.put(`/api/appointments/${id}`, appointment)
  //      .then((res) => 
  //       setState((prev) => ({...prev, appointments})) )
  //       .catch((err) => console.log(err.message))
  //       );
  //   }
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(r =>
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview
      })
    );
  }
 
  // const cancelInterview = id => {

  //   return axios.delete(`/api/appointments/${id}`).then(res => {
  //   });
  // };
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(r =>
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null
      })
    );
  }

  // useEffect(() => {
  //     Promise.all([
  //       axios.get(`http://localhost:8001/api/days`),
  //       axios.get('http://localhost:8001/api/appointments'),
  //       axios.get('http://localhost:8001/api/interviewers') 
  //     ])
  //       .then((all) => {  setState(prev => ({...prev, days: all[0].data,
  //       appointments:all[1].data,
  //     interviewers:all[2].data}))
  //     })
  //   }, []);
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
    });
  }, []);
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplictionData;