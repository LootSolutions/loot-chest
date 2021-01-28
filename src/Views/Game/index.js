import React from "react";
import "./style.scss";
import Carousel from "../../Components/Carousel";
import GameUpadteInfo from "../../Components/GameUpdateInfo";

const playButtonPushed = () => {
  window.ipcRenderer.send("playGame");
};

export default function Main() {
  return (
    <div id="game-view">
      <div id="game-view-container">
        <Carousel />
        <h1>Rock Paper Scissors</h1>
        <div id="updates-container">
          <GameUpadteInfo date="01/03" />
          <GameUpadteInfo date="01/02" />
          <GameUpadteInfo date="01/01" />
        </div>
        <div id="play-button" onClick={() => playButtonPushed()}>
          Play
        </div>
      </div>
    </div>
  );
}
