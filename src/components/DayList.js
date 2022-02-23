import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //couldn't use spread for selected
  //add key(day.id) to each day for it to be a unique prop
  const dayList = props.days.map(day => <DayListItem key={day.id} setDay={() => props.setDay(day.name)} selected={day.name === props.day} {...day}/>);
  return (
    <ul>
      {dayList}
    </ul>
  );
}