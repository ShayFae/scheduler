import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //Had to define setDay
  const {setDay} = props;
  //Couldn't use spread for setDay because its a function
  //couldn't use spread for selected
  //add key(day.id) to each day for it to be a unique prop
  const dayList = props.days.map(day => <DayListItem key={day.id} setDay={setDay} selected={day.name === props.day} {...day}/>);

  return (
    <ul>
      {dayList}
    </ul>
  );
}