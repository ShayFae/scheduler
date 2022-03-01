import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData"

export default function Application(props) {
  // console.log(state.interviewers)

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview,
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day);
  // console.log('interviewers', interviewers)
  //SATE FUNCTIONS

  const appointmentsList = dailyAppointments.map(appointment => {  
    // console.log(dailyAppointments)
      const interview = getInterview(state, appointment.interview); 
      return (<Appointment key={appointment.id}  id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        editInterview={editInterview}
      />);

    });
    
  // console.log(appointmentsList)
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