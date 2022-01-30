import React from "react";
import DayListItem  from "./DayListItem";
export default function DayList({days, propDay, setDay} = this.props){

  const parsedDays = days.map(day =>
     <DayListItem 
     key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === propDay} 
    setDay={setDay} />);

  return(
    <ul>{parsedDays}</ul>
  );
  
}