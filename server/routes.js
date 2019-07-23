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
  sendRequestToElectrom(electrumMethodEnum.listUnspent, keyPair.publicKey).then(resFromElectrum => {
    unspentArray = resFromElectrum;
    const txb = new bitcoin.TransactionBuilder();
    txb.setVersion(1);
    let count = 0;

    // Add all unspent needed for the transaction
    for (let i = 0; i < unspentArray.length; i++) {
      if (count > amount) break; // if we added enough
      const unspentTrx = unspentArray[i];
      txb.addInput(unspentTrx.tx_hash, unspentTrx.tx_pos); // Alice's previous transaction output, has 15000 satoshis
      count = count + unspentTrx.value;
    }

    // If we didn't add enough
    if (count < amount) {
      return res.status(401).json("Not enough funds!");
    }

    txb.addOutput(address, amount); //send to
  });
});

router.get("/balance", (req, res) => {
  console.log("Post to send route recieved ");

  // Get key pair
  let keyPair = getOrGenerateKeyPair();
  sendRequestToElectrom(electrumMethodEnum.getBalance, keyPair.publicKey).then(resFromElectrum => {
    res.json(resFromElectrum);
  });
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
