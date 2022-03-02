import React, { Fragment } from 'react';
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

//MODE CONSTANTS
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const {interviewers, student} = props
  
  //Takes in user input infromation and puts it into the api 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
      transition(ERROR_SAVE, true)
    });
  };

  //If confirmed it will then delete
  function cancel() {
    transition(DELETING);

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {
        transition(ERROR_DELETE, true)
      });
  }

  //Once trashcan Icon is clicked it will goto CONFIRM MODE
  function confirm() {
    transition(CONFIRM);
  }

  //Once user clicks clipboard icon it will goto EDIT MODE
  function edit() {
    transition(EDIT);
  }

  return (
    <Fragment>
      <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={confirm}
            onEdit={edit}
          />
        )}

        {mode === ERROR_SAVE && <Error message="Could not save appointment" onClose={() => back(SHOW)}/>}
        {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={() => back(SHOW)}/>}

        {mode === DELETING && <Status message="DELETING" />}
        {mode === SAVING && <Status message="SAVING" />}
        {mode === CONFIRM && <Confirm message="Are you sure you want to DELETE?" onConfirm={cancel} onCancel={() => back(EMPTY)} />}

        {mode === CREATE && (<Form interviewers={interviewers}  onCancel={() => back(EMPTY)} onSave={save}/>)}       
        {mode === EDIT && (<Form interviewers={interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} onCancel={() => back(SHOW)} onSave={save}/>)}    
      </article>
    </Fragment>
  );
}