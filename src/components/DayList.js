import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //add key(day.id) to each day for it to be a unique prop
  //When user clicks on a day it will then change the background style of that selected area
  const dayList = props.days.map(day => <DayListItem key={day.id} setDay={() => props.onChange(day.name)} selected={day.name === props.value} {...day}/>);
  return (
    <ul>
      {dayList}
    </ul>
  );
}