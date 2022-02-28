import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  //STATES
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // console.log(state.interviewers)

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day);
  // console.log('interviewers', interviewers)
  //SATE FUNCTIONS
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
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

     return axios.put(`/api/appointments/${id}`, {interview}).then(() => {
      setState({...state, appointments});
     })
   };


  //  { interview }
  const appointmentsList = dailyAppointments.map(appointment => {  
    // console.log(dailyAppointments)
      const interview = getInterview(state, appointment.interview); 
      // console.log('beep', interview)
      // return (<Appointment key={appointment.id} {...appointment}  interviewers={interviewers} />);
      return (<Appointment key={appointment.id}  id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />);

    });
    
  // console.log(appointmentsList)

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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList days={state.days} value ={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
      {appointmentsList}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}