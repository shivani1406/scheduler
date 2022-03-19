export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_INTERVIEW_DAYS = "SET_INTERVIEW_DAYS";

function getSpotsForDay(state, day) {
  return state.days
    .find(d => d.name === day)
    .appointments.reduce((a, c) => {
      return state.appointments[c].interview ? a : a + 1;
    }, 0);
}

export default function reducer(state, action) {
  switch (action.type) {

    case "updateInterview":

      let currentDay = state.days.find(
        day => day.appointments.includes(action.id)
      );

      //Updates the spots information for that day and correct appointment information for a new interview and ready's for rendering
      if(action.interview){
        currentDay.spots -= 1;
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview }
        };
        
        const appointments = {
          ...state.appointments,
          [ action.id]: appointment
        };
        let newDaysArr = [...state.days];
        newDaysArr[currentDay.id -1] = currentDay;
        return { ...state, appointments: appointments, days: newDaysArr };
      }

      //Updates spots information for that day and correct appoointment information for a null interview and ready's for rendering
      else{
        currentDay.spots += 1;
        const appointment = {
          ...state.appointments[action.id],
          interview: null
        };
        
        const appointments = {
          ...state.appointments,
          [ action.id]: appointment
        };

        let newDaysArr = [...state.days];
        newDaysArr[currentDay.id -1] = currentDay;

        return { ...state, appointments: appointments, days: newDaysArr };
      }

    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW_DAYS: {
      return {
        ...state,
        days: action.days,
        appointments: action.appointments
      };
    }
    case SET_INTERVIEW: {
      const newState = {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview
          }
        }
      };
      return {
        ...newState,
        days: state.days.map(day => ({
          ...day,
          spots: getSpotsForDay(newState, day.name)
        }))
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}