export function getAppointmentsForDay(state, day) {
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
  return matchData
  // console.log(matchData)
}