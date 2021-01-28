import React, { useEffect, useState } from "react";
import "./style.scss";
import Identicon from "@polkadot/react-identicon";
import BoughtAsset from "../../Components/BoughtAsset";

const cyrstalImg = require("../../assets/purchases/crystal.png");

export default function Main() {
  const [editing, setEditing] = useState(() => false);
  const [address, setAddress] = useState(() => "");
  const [displayName, setDisplayName] = useState(() => "");
  const [balance, setBalance] = useState(() => "");
  const [boughtAsset, setBoughtAsset] = useState(() => false);

  window.ipcRenderer.on("user-info", (_event, info) => {
    setAddress(() => info.address);
    setDisplayName(() => info.display.Raw);
    setBalance(() => info.balance);
  });

  window.ipcRenderer.on("bought-asset", () => {
    console.log("test");
    setBoughtAsset(() => true);
  });

  useEffect(() => {
    window.ipcRenderer.send("get-user-info");
    window.ipcRenderer.send("get-bought-asset");
  }, []);

  const updateInfo = () => {
    setEditing(() => false);

    const newUserName = document.getElementById("user-name-input").value;

    window.ipcRenderer.send("update-user-info", newUserName);
  };

  return (
    <div id="profile">
      <div id="profile-container">
        <div id="info">
          <Identicon value={address} size={96} theme={"polkadot"} />
          <div id="info-right">
            <div id="user-name">
              <span>Username: </span>
              {!editing ? (
                <span>{displayName}</span>
              ) : (
                <input id="user-name-input"></input>
              )}
            </div>
            <div id="balance">
              <span>Balance: </span>
              <span>{balance}</span>
            </div>
          </div>
        </div>
        {!editing ? (
          <div id="edit-buttons">
            <span
              className="edit-button"
              onClick={() => setEditing(() => true)}
            >
              Edit
            </span>
          </div>
        ) : (
          <div id="edit-buttons">
            <span id="save" onClick={() => updateInfo()}>
              Save
            </span>
            <span id="cancel" onClick={() => setEditing(() => false)}>
              Cancel
            </span>
          </div>
        )}
        <h1>Your Assets</h1>
        <div id="user-assets">
          {boughtAsset ? (
            <BoughtAsset
              title="Rock: Gemstone"
              price="5"
              image={cyrstalImg}
              id="crystal"
              onClick={() => buyAsset()}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
