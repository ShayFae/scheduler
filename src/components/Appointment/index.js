import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

  //MODE CONSTANTS
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const {interview, time} = props

  return (
    <Fragment>
      <article className="appointment">
        <Header time={time}/>
        {/* {pickDisplay()} */}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && (<Form interviewers={[]} onCancel={() => back(EMPTY)}/>)}       
        {/* {interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}></Show> : <Empty></Empty>} */}
      </article>
    </Fragment>

  );
}