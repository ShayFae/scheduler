import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';

//MODE CONSTANTS
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
  // console.log(props.interview.interviewer)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const {interviewers, student} = props
  // console.log(props.interview)
  
  //Takes in user input infromation and puts it into the api 
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

  //If confirmed it will then delete
  function cancel() {
    transition(DELETING);

      props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
  }

  //Once trashcan Icon is clicked it will goto CONFIRM MODE
  function confirm() {
    transition(CONFIRM);
  }

  //Fix SELECTED interviewer in EDIT 
  //Fix CREATE needs to highlight selected interviews
  function edit() {
    transition(EDIT);
  }

  //Interviewer highlight target ID
  // interviewer={props.interview.interviewer.id}

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
            onDelete={confirm}
            onEdit={edit}
          />
        )}
        {mode === DELETING && <Status message="DELETING" />}
        {mode === SAVING && <Status message="SAVING" />}
        {mode === CREATE && (<Form interviewers={interviewers}  onCancel={() => back(EMPTY)} onSave={save}/>)}       
        {mode === CONFIRM && <Confirm message="Are you sure you want to DELETE?" onConfirm={cancel} onCancel={() => back(EMPTY)} />}
        {mode === EDIT && (<Form interviewers={interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} onCancel={() => back(SHOW)} onSave={save}/>)}       
      </article>
    </Fragment>
  );
}