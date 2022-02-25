import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props) {
  const {interview, time} = props
  // console.log('this is index', props)
  // console.log(interview)
  // console.log(student)
  // function pickDisplay(props) { 
  //     return (interview ? <Show></Show> : <Empty></Empty>);
  //   }
  return (
    <Fragment>
      <article className="appointment">
        <Header time={time}/>
        {/* {pickDisplay()} */}
        {interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}></Show> : <Empty></Empty>}
      </article>
    </Fragment>

  );
}