import React from "react";
import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem(props) {
  const dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots===0
  });

  const formatSpots = (spot) => {
    if (spot === 0) {
      return (<>no spots </>);
    } else if (spot === 1) {
      return (<>1 spot</>);
    } else {
      return (<>{spot} spots</>);
    }
  }

  return (
     <li onClick={() => props.setDay(props.name)} className={dayListItemClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}