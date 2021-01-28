import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import SideBar from "./Components/SideBar";

import Marketplace from "./Views/Marketplace";
import Game from "./Views/Game";
import Profile from "./Views/Profile";

function App() {
  const [activeWin, setActiveWin] = useState("marketplace");
  return (
    <div id="app">
      <SideBar setActiveWin={setActiveWin} />
      {activeWin === "game" && <Game />}
      {activeWin === "marketplace" && <Marketplace />}
      {activeWin == "profile" && <Profile />}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
