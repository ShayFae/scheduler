export function getAppointmentsForDay(state, day) {
  // console.log('this is state', state)
  const daysFilter = state.days.filter(days => days.name === day);
  let matchData = [];
  for(let dayValue of daysFilter) {
    let dayAppointments = dayValue.appointments
    let stateAppointments = state.appointments
    for (const [key, appointValue] of Object.entries(stateAppointments)) {
      // console.log([key, value] )
    let findMatch = [appointValue] 
    //  n.forEach(j => {console.log('this is j', dayAppointments.includes(j.id),j)})
    findMatch.forEach(x => {
      if(dayAppointments.includes(x.id)) {
        // console.log('this is x', x)
        matchData.push(x)
        // console.log(matchData)
      }
    })
    // console.log('this is day/match', dayAppointments, matchData)
    // console.log(state.appointments)
    }
    // console.log(value.appointments)
    // console.log(stateAppointments)
    // const test = dayAppointments.filter(meep => meep == key);
  }
    // console.log('This is match data', matchData)

  return matchData
}

export function getInterviewersForDay(state, day) {
  const interviewerFilter = state.days.filter(days => days.name === day);
  let interviewersData = [];
  for(let interviewersVal of interviewerFilter) { 
    let InterviewersApp = interviewersVal.appointments
    let stateApp = state.interviewers
    for (const [key, appointValue] of Object.entries(stateApp)) {
    let findMatch = [appointValue] 
    findMatch.forEach(x => { 
      if(InterviewersApp.includes(x.id)) {
        interviewersData.push(x)
      }
    })
    }
  }
  // console.log('this is match', matchData)
  // console.log('meep', Object.values(interviewersData))
  // console.log(interviewersData)

  return interviewersData
}

export function getInterview(state, interview) {
  let obj = {};
  // console.log('this is', interview)
  if(interview === null) {
    return null
  }
  if(state.interviewers[interview.interviewer]) {
    obj["interviewer"] = state.interviewers[interview.interviewer];
  }
  obj["student"] = interview.student;
  // console.log('this is interviewer ID', interview.interviewer)
  // console.log('this is interviewers', state.interviewers)
  // console.log('this is obj', obj)
  return obj
}