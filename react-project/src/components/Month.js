import React from "react";
import Day from "./Day";

export default function Month({ month }) {
  return (
    <div className="cal_days">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} rowIdx={i} key={idx} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
