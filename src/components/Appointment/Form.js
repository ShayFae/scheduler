import React, { useState } from 'react';
import InterviewerList from "../InterviewerList";
import Button from "../Button";
import "components/Appointment/Form.scss";

export default function Form(props) {
const {interviewers} = props

//STATES
const [student, setStudent] = useState(props.student || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

//FUNCTIONS
const reset = () => {
  setStudent("")
  setInterviewer(null)
}
//Calls reset that then sets an empty string and null to each state
const cancel = () => {
  reset()
  props.onCancel()
}

  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        //Set value
        value={student}
        //Then target that source and update 
        onChange={(event) => {setStudent(event.target.value)}}
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList
       value={interviewer}
       //interviewers listed
       interviewers={props.interviewers}
       //When clicked it will then set a new state to whatever interviewer id was chosen
       onChange={setInterviewer}
      //  onClick={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  );
}