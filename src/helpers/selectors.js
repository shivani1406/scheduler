const matchIds = (appointments, ids) => {
  const matched = ids.map(id => appointments[id]);
  return matched;
}
export const getInterview = function(state, interview) {
  if (!interview) {
    return null;
  };
  let interviewerID = interview.interviewer
    return {
      student: interview.student,
      interviewer: state.interviewers[interviewerID]
    };
}

export function getAppointmentsForDay(state, day) {
  
  let appointmentArr = [];
  // eslint-disable-next-line
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.appointments.forEach(apptId => appointmentArr.push(apptId))
    }
  })
  return matchIds(state.appointments, appointmentArr);
 
  
}



export function getInterviewersForDay(state, day) {

  let interviewersArr = [];
  // eslint-disable-next-line
  state.days.map(dayObject => {
    if (dayObject.name === day) {
      dayObject.interviewers.forEach(interviewerId => interviewersArr.push(interviewerId))
    }
  })
  return matchIds(state.interviewers, interviewersArr);
}