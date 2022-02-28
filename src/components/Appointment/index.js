import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';

//MODE CONSTANTS
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const {interviewers, student} = props
  // console.log(props.interview)
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
    // console.log('STUDENT', interview.student)
    // console.log('interviewer', interview.interviewer)
  };
 
  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time}/>
        {/* {pickDisplay()} */}
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === SAVING && <Status message="SAVING" />}
        {mode === CREATE && (<Form interviewers={interviewers}  onCancel={() => back(EMPTY)} onSave={save}/>)}       
        {/* {interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}></Show> : <Empty></Empty>} */}
      </article>
    </Fragment>

  );
}