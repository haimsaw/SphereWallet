const express = require("express");
const router = express.Router();
const bitcoin = require("bitcoinjs-lib");
const axios = require("axios");
const crypto = require("crypto");
const sendRequestToElectrom = require("./electrum").sendRequestToBitcoin;
const electrumMethodEnum = require("./electrum").methodEnum;
const TESTNET = bitcoin.networks.testnet;
var db = {};
const testPrivateKey = Buffer.from("\u001d�\u0019�`���\u001aP����");
const testPublicKey = Buffer.from(`\u0003��C��G�\u001f�"o��c�'�\t�\u0001f��}�\t��\u0010��\u0004`);

var bitcoinApiUrl = "ec2-34-219-15-143.us-west-2.compute.amazonaws.com";

router.get("/", (req, res) => {
  res.json("Welcome To ShpereWallet Hackathon");
});
router.post("/send", (req, res) => {
  console.log("Post to send route recieved ");
  const { address, amount } = req.body;

  // Get key pair
  let keyPair = getOrGenerateKeyPair();
  sendRequestToElectrom(electrumMethodEnum.getBalance, keyPair.publicKey);
});

router.post("/balance", (req, res) => {
  console.log("Post to send route recieved ");

  // Get key pair
  let keyPair = getOrGenerateKeyPair();
});

router.get("/recieve", (req, res) => {
  console.log("Get Recive route recieved ");
  // Generate key pair if not exists
  let keyPair = getOrGenerateKeyPair();

  // Create address
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: TESTNET });

  //return adress to client
  res.json(address);
});

function getOrGenerateKeyPair() {
  //just for testing
  return bitcoin.ECPair.fromPrivateKey(testPrivateKey);

  let keyPair;
  if (!db.keyPair) {
    // This should be done with the sphere
    keyPair = bitcoin.ECPair.makeRandom();
    db.keyPair = keyPair;
  } else {
    keyPair = db.keyPair;
  }
  return keyPair;
}

module.exports = router;
