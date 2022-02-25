import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //couldn't use spread for selected
  //add key(day.id) to each day for it to be a unique prop
  //Had to change props.setDay to props.onChange inorder for new state in application.js to work
  const dayList = props.days.map(day => <DayListItem key={day.id} setDay={() => props.onChange(day.name)} selected={day.name === props.value} {...day}/>);
  return (
    <ul>
      {dayList}
    </ul>
  );
}