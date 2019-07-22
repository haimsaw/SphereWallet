const express = require("express");
const router = express.Router();
const bitcoin = require("bitcoinjs-lib");
const TESTNET = bitcoin.networks.testnet;

router.get("/", (req, res) => {
  res.json("Welcome To ShpereWallet Hackathon");
});
router.post("/send", (req, res) => {
  // Generate public key and adress
});

router.get("/recieve", (req, res) => {
  // Generate public key and address
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: TESTNET });

  //return adress to client
  res.json(address);
});

module.exports = router;
