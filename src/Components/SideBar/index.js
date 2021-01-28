import React, { ReactComponent } from "react";
import "./style.scss";
import SideBarButton from "../SideBarButton";

import market from "../../assets/icons/market.svg";
import user from "../../assets/icons/user.svg";
import add from "../../assets/icons/add.svg";

import Marketplace from "../../Views/Marketplace";
import Game from "../../Views/Game";
import Profile from "../../Views/Profile";

const openFolder = () => {
  window.ipcRenderer.send("selectDirectory");
};

export default function Main(props) {
  const { setActiveWin } = props;

  return (
    <div id="sidebar">
      <SideBarButton
        icon={market}
        onClick={() => setActiveWin(() => "marketplace")}
      />
      <SideBarButton onClick={() => setActiveWin(() => "game")} />
      <div id="end">
        <SideBarButton
          className="end"
          icon={user}
          onClick={() => setActiveWin("profile")}
        />
        <SideBarButton
          className="end"
          icon={add}
          onClick={() => openFolder()}
        />
      </div>
    </div>
  );
}
