//Filter though days name in order to get the matching days Object after looping through daysFilter 
//Searches for matching data that will then be used to push into the array
//Returns an array of appointments that contain either booked appointments or Null
export function getAppointmentsForDay(state, day) {
  const daysFilter = state.days.filter(days => days.name === day);
  let matchData = [];

  for(let dayValue of daysFilter) {
    let dayAppointments = dayValue.appointments;
    let stateAppointments = state.appointments;

    for (const [key, appointValue] of Object.entries(stateAppointments)) {
    let findMatch = [appointValue];

    findMatch.forEach(x => {
      if(dayAppointments.includes(x.id)) {
        matchData.push(x);
       }
     })
    }
  }
  return matchData;
}

//Filter though days name but instead tartgeting interviewers key and then finding the interviewers who match that day
//Returns an array of interviewers 
export function getInterviewersForDay(state, day) {
  const interviewerFilter = state.days.filter(days => days.name === day);
  let interviewersData = [];

  for(let interviewersVal of interviewerFilter) { 
    let InterviewersApp = interviewersVal.interviewers;
    let stateApp = state.interviewers;

    for (const [key, appointValue] of Object.entries(stateApp)) {
    let findMatch = [appointValue];

    findMatch.forEach(x => { 
      if(InterviewersApp.includes(x.id)) { 
        interviewersData.push(x);
       }
     })
   }
  }
  return interviewersData;
}

//Checks if interview is null first
//Then it checks in state interviewers list if an interviewers id matches
//If it matches then that interviewer id/avatar and name will be added as the value for the interviewer key in the empty object
//Another key called student is made with the student name as value
//Returns an object that contains interviewer/student information
export function getInterview(state, interview) {
  let obj = {};

  if(interview === null) {
    return null;
  }

  if(state.interviewers[interview.interviewer]) {
    obj["interviewer"] = state.interviewers[interview.interviewer];
  }

  obj["student"] = interview.student;

  return obj;
}