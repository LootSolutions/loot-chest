import React from "react";
import "./style.scss";

export default function Main(props) {
  const icon = props.icon;
  const onClick = props.onClick;

  return (
    <div className="sidebar-button" onClick={onClick}>
      {icon ? <img src={icon} /> : <div></div>}
    </div>
  );
}
