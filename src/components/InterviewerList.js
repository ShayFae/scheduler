import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const interviewerList = props.interviewers.map(interviewer => <InterviewerListItem key={interviewer.id} setInterviewer={() => props.onChange(interviewer.id)} selected={interviewer.id === props.interviewer} {...interviewer}/>);
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  );
}