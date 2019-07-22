const express = require("express");
const router = express.Router();
const bitcoin = require("bitcoinjs-lib");
const TESTNET = bitcoin.networks.testnet;
var db = {};

router.get("/", (req, res) => {
  res.json("Welcome To ShpereWallet Hackathon");
});
router.post("/send", (req, res) => {
  // Get key pair
  let keyPair = getOrGenerateKeyPair();
});

router.get("/recieve", (req, res) => {
  // Generate key pair if not exists
  let keyPair = getOrGenerateKeyPair();

  // Create address
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: TESTNET });

  //return adress to client
  res.json(address);
});

function getOrGenerateKeyPair() {
  let keyPair;
  if (!db.keyPair) {
    keyPair = bitcoin.ECPair.makeRandom();
    db.keyPair = keyPair;
  } else {
    keyPair = db.keyPair;
  }
  return keyPair;
}

module.exports = router;
