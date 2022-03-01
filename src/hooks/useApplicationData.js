import axios from "axios";
import { useState, useEffect } from "react";
export default function useApplicationData() { 
  //STATES
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log('this is state', state.days)
    console.log(interview)
    // console.log(interview)
    const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
    };

    const appointments = {
    ...state.appointments,
    [id]: appointment
    };

  // setState({...state, appointments});
  // console.log(appointments)
  // console.log(appointments.time)
  // console.log('APPOINTMENT', appointment)
  // updateSpots()


    return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
      setState({...state, appointments});
      })


  };


  function cancelInterview(id) {
    const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };  
  return axios.delete(`/api/appointments/${id}`, {id}).then(() => {
    setState({...state, appointments});
    })
  }; 

  function editInterview(id, interview) {
  // console.log(id, interview)
    const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  // setState({...state, appointments});
  // console.log(appointments)
  // console.log(appointments.time)
  // console.log('APPOINTMENT', appointment)
  // updateSpots()


  return axios.update(`/api/appointments/${id}`, {interview}).then(() => {
    setState({...state, appointments});
    })


  };

    // function updateSpots() {
  //   console.log('app', state.appointments)
  //   for(let meep of state.days) {
  //     console.log('...', meep)
  //   }
  //   // const test = state.days.filter(meep => days.name === meep);
  //   // console.log(test)
  // }
  // updateSpots()

  //GET
  useEffect(() => {
  axios.get(`/api/days`).then(response => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
        });
      });
    }, []);

  return { bookInterview, cancelInterview, editInterview, state, setDay}
};