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
  if(!state.days){
    return [];
  }
  let theDay = state.days.filter(d => d.name === day)[0];
  if(!theDay){
    return [];
  }
  let result = [];
  for(const id of theDay.appointments){
    const appointmentObj = state.appointments[id];
    result.push(appointmentObj);
  }

  return result;
}