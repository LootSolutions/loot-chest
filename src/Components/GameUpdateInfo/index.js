import React from "react";
import "./style.scss";

export default function Main(props) {
  const { date } = props;

  return (
    <div className="game-update-info">
      <div className="date-container">{date}</div>
      <ul>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Consectetur adipiscing elit.</li>
        <li>Nullam massa libero, semper vitae.</li>
        <li>Maximus nec dolor.</li>
      </ul>
    </div>
  );
}
