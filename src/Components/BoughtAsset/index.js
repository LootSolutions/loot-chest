import React from "react";
import "./style.scss";

export default function Main(props) {
  const { title, image, id } = props;

  return (
    <div className="purchase-card">
      <div className="asset-image">
        {image ? (
          <div>
            <img id={id || ""} src={image} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="asset-info">
        <h1>{title}</h1>
      </div>
      <div className="purchase-button">Sell</div>
    </div>
  );
}
