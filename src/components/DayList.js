import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //couldn't use spread for selected
  //add key(day.id) to each day for it to be a unique prop
  const dayList = props.days.map(day => <DayListItem key={day.id} setDay={() => props.setDay(day.onChange)} selected={day.name === props.value} {...day}/>);
  return (
    <ul>
      {dayList}
    </ul>
  );
}