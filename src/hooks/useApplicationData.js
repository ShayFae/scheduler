import axios from "axios";
import { useState, useEffect } from "react";
export default function useApplicationData() { 
  //STATES
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });

  //ADD APPOINTMENT FUNCTION
  function bookInterview(id, interview) {
    const appointment = {
    ...state.appointments[id],
    interview: { ...interview },
    };

    const appointments = {
    ...state.appointments,
    [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
      updateSpots()
      setState({...state, appointments});
      })
  };

  //DELETE APPOINTMENT FUNCTION
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

  //EDIT APPOINTMENT FUNCTION
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

  return axios.update(`/api/appointments/${id}`, {interview}).then(() => {
    setState({...state, appointments});
    })

  };

  function updateSpots() {
    const getDays = [...state.days];
    for(let day of getDays) {
      if(day.name === state.day) {
        let getAppointment = day.appointments
        const holdApp =  getAppointment.map(matchID => state.appointments[matchID].interview);
        const nullInterview = holdApp.filter(findNull => findNull === null);
        const spots = nullInterview.length;
        day.spots = spots;
     }
   }
    return getDays;
  }
  updateSpots()

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