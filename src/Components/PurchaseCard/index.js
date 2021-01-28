import React from "react";
import "./style.scss";

export default function Main(props) {
  const { title, price, image, id, onClick } = props;

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
        <div className="price-container">
          <span className="price">{price}</span>
          <span className="unit"> Au</span>
        </div>
      </div>
      <div className="purchase-button" onClick={onClick}>
        Purchase
      </div>
    </div>
  );
}
