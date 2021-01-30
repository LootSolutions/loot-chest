import React from "react";
import "./style.scss";

export default function Main(props) {
  const { src } = props;
  return <img className="carousel" src={src} />;
}
