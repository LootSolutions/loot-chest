const { app, BrowserWindow } = require("electron");
const aurumTypes = require("./aurumTypes.json");
const api = require("./api");
const spawn = require("child_process").spawn;
const electron = require("electron");
const { ApiPromise, WsProvider } = require("@polkadot/api");
const { Keyring } = require("@polkadot/keyring");

const keyring = new Keyring({ type: "sr25519", ss58Format: 2 });

const ipcMain = electron.ipcMain;

const dialog = electron.dialog;

let win = null;

let pendingTxs = new Map();

let aurum = null;

let userPair = null;

class PendingTx {
  constructor(tx, event, channel, infoFunc) {
    this.tx = tx;
    this.infoFunc = infoFunc;
    this.event = event;
    this.channel = channel;
  }
}

function createWindow() {
  ApiPromise.create({
    types: aurumTypes,
  }).then((aurumApi) => {
    win = new BrowserWindow({
      width: 1194,
      height: 834,
      webPreferences: {
        nodeIntegration: true,
        preload: __dirname + "/preload.js",
      },
    });

    // win.removeMenu();

    userPair = keyring.addFromUri(
      "bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice",
      { name: "Alice" },
      "sr25519"
    );

    aurum = aurumApi;
    api.start(aurumApi, userPair);

    win.loadFile("./dist/index.html");
  });
}

function createSignWindow() {
  const signWin = new BrowserWindow({
    width: 384,
    height: 128,
    resizable: true,
    alwaysOnTop: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: __dirname + "/preload.js",
    },
  });

  signWin.removeMenu();
  signWin.loadFile("./src/Windows/Sign/index.html");

  return signWin.id;
}

async function getUserInfo() {
  const identity = await aurum.query.identity.identityOf(userPair.address);
  const display = identity.toHuman() ? identity.toHuman().info.display : "";

  const { data: b } = await aurum.query.system.account(userPair.address);

  const balance = b.free.toHuman();

  const userInfo = {
    balance: balance,
    display: display,
    address: userPair.address,
  };

  return userInfo;
}

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("get-user-info", async (event, _args) => {
  const userInfo = await getUserInfo();

  event.reply("user-info", userInfo);
});

ipcMain.on("update-user-info", (event, newUserName) => {
  const tx = aurum.tx.identity.setIdentity({
    display: { raw: newUserName },
  });

  const winId = createSignWindow();
  pendingTxs.set(winId, new PendingTx(tx, event, "user-info", getUserInfo));
});

ipcMain.on("selectDirectory", () => {
  dialog.showOpenDialog(win, {
    properties: ["openDirectory"],
  });
});

ipcMain.on("playGame", () => {
  const gamePath = "/home/brettkolodny/Games/RockPaperScissors.x86_64";
  const prc = spawn(gamePath);

  prc.on("close", (code) => {
    console.log("process exit code " + code);
  });
});

ipcMain.on("buy-asset", () => {
  const tx = aurum.tx.aurumNft.mintNftToken(0, 0, 0);

  const winId = createSignWindow();
  pendingTxs.set(winId, new PendingTx(tx, null, null, null));
});

ipcMain.on("get-bought-asset", async (event, _args) => {
  const numAssets = await aurum.query.aurumNft.purchases(0, userPair.address);

  if (numAssets > 0) {
    event.reply("bought-asset");
  }
});

ipcMain.on("sign-and-send", async (_event, winId) => {
  const pendingTx = pendingTxs.get(winId);

  const unsub = await pendingTx.tx.signAndSend(
    userPair,
    async ({ status, events, dispatchError }) => {
      // status would still be set, but in the case of error we can shortcut
      // to just check it (so an error would indicate InBlock or Finalized)
      if (dispatchError) {
        if (dispatchError.isModule) {
          // for module errors, we have the section indexed, lookup
          const decoded = api.registry.findMetaError(dispatchError.asModule);
          const { documentation, name, section } = decoded;
          console.log(`${section}.${name}: ${documentation.join(" ")}`);
        } else {
          // Other, CannotLookup, BadOrigin, no extra info
          console.log(dispatchError.toString());
        }
      } else if (status.isInBlock) {
        if (pendingTx.event) {
          pendingTx.event.reply(
            pendingTx.channel,
            pendingTx.infoFunc ? await pendingTx.infoFunc() : null
          );
        }

        pendingTxs.delete(winId);
        BrowserWindow.fromId(winId).close();

        unsub();
      }
    }
  );
});

ipcMain.on("cancel", (_event, winId) => {
  pendingTxs.delete(winId);
  BrowserWindow.fromId(winId).close();
});
