import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  //Gives styles based on conditions
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  //If condition is met it will change the text shown to the user
  const formatSpots = () => {
    if(props.spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    } else if(props.spots === 1) {
      return <h3 className="text--light">{props.spots} spot remaining</h3>
    } 
    return <h3 className="text--light">{props.spots} spots remaining</h3>
  }

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2> 
      {formatSpots()}
    </li>
  );
}