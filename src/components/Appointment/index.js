import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const {interview, time, student, interviewer} = props
  // function pickDisplay(props) { 
  //     return (interview ? <Show></Show> : <Empty></Empty>);
  //   }
  return (
    <Fragment>
      <article className="appointment">
        <Header time={time}/>
        {/* {pickDisplay()} */}
        {interview ? <Show student={student} interviewer={interviewer}></Show> : <Empty></Empty>}
      </article>
    </Fragment>

  );
}