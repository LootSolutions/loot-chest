const express = require("express");
const app = express();
const port = 3000;

let aurum = null;
let userPair = null;

app.get("/user/balance", async (req, res) => {
  const { _nonce, data: balance } = await aurum.query.system.account(
    userPair.address
  );
  res.send(balance);
});

app.get("/user/identity", async (req, res) => {
  const identity = await aurum.query.identity.identityOf(userPair.address);

  const username = identity.toHuman() ? identity.toHuman().info.display : null;

  res.send({ display: username ? username.Raw : null });
});

app.get("/user/assets", async (req, res) => {
  const assets = await aurum.query.ormlNft.tokensByOwner.entries();

  if (assets.length > 0) {
    res.send({ assets: true });
  } else {
    res.send({ assets: false });
  }
});

function start(api, pair) {
  aurum = api;
  userPair = pair;
  app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
  });
}

module.exports = { start };
