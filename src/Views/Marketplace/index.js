import React from "react";
import "./style.scss";

import Carousel from "../../Components/Carousel";
import PurchaseCard from "../../Components/PurchaseCard";

const cyrstalImg = require("../../assets/purchases/crystal.png");
const pistolImg = require("../../assets/purchases/gold-pistol.png");
const uziImg = require("../../assets/purchases/gold-uzi.png");
const machineImg = require("../../assets/purchases/gold-machinegun.png");
const rocketImg = require("../../assets/purchases/gold-rocket.png");

const buyAsset = () => {
  window.ipcRenderer.send("buy-asset");
};

export default function Main() {
  return (
    <div id="marketplace">
      <div id="marketplace-container">
        <h1>Marketplace</h1>
        <Carousel />
        <h2>Rock Paper Scissors</h2>
        <div className="assets">
          <PurchaseCard
            title="Rock: Gemstone"
            price="5"
            image={cyrstalImg}
            id="crystal"
            onClick={() => buyAsset()}
          />
        </div>
        <h2>Shootem and Lootem!</h2>
        <div className="assets">
          <PurchaseCard title="Gold Pistol" price="5" image={pistolImg} />
          <PurchaseCard title="Gold Uzi" price="10" image={uziImg} />
          <PurchaseCard
            title="Gold Machine Gun"
            price="15"
            image={machineImg}
          />
          <PurchaseCard
            title="Gold Rocket Launcher"
            price="20"
            image={rocketImg}
          />
        </div>
        <div id="footer"></div>
      </div>
    </div>
  );
}
