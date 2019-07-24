const express = require("express");
const router = express.Router();
const bitcoinZENGO = require("./lib/bitcoinjs-lib-master");
const bitcoin = require("bitcoinjs-lib");
const axios = require("axios");
const sendRequestToElectrom = require("./electrum").sendRequestToBitcoin;
const electrumMethodEnum = require("./electrum").methodEnum;
const SphereClient = require("./lib/index");
const TESTNET = bitcoin.networks.testnet;
var db = {};
const testPrivateKey = Buffer.from("\u001d�\u0019�`���\u001aP����");
const testPublicKey = Buffer.from(`\u0003��C��G�\u001f�"o��c�'�\t�\u0001f��}�\t��\u0010��\u0004`);

var bitcoinApiUrl = "ec2-34-219-15-143.us-west-2.compute.amazonaws.com";

router.get("/", (req, res) => {
  res.json("Welcome To ShpereWallet Hackathon");
});

router.post("/send", async (req, res) => {
  console.log("Post to send route recieved ");
  const {address, amount} = req.body;

  // Get key pair
  let keyPair = getOrGenerateKeyPair();
  try {
    let unspentArray = await sendRequestToElectrom(electrumMethodEnum.listUnspent, keyPair.publicKey);
    const txb = new bitcoinZENGO.TransactionBuilder(TESTNET);
    txb.setVersion(1);
    let count = 0;
    let inputCount = 0;

    // Add all unspent needed for the transaction
    for (let i = 0; i < unspentArray.length; i++) {
      if (count > amount) break; // if we added enough
      const unspentTrx = unspentArray[i];
      txb.addInput(unspentTrx.tx_hash, unspentTrx.tx_pos); // Alice's previous transaction output, has 15000 satoshis
      count = count + unspentTrx.value;
      inputCount++;
    }

    console.log("Count = " + count);

    // If we didn't add enough
    if (count < amount) {
      console.log("Not enough funds. returning 401 response");
      return res.status(401).json("Not enough funds!");
    }

    console.log("Adding output");
    txb.addOutput(address, Number(amount)); //send amount to address

    console.log("Signing Trx");
    let singedInputArray = [];
    // This is suppsed to be done in sphere
    for (let i = 0; i < inputCount; i++) {
      txb.sign(i, keyPair);
      // let inputToSign = txb.getSignatureHash(i, keyPair);
      // singedInputArray[i] = inputToSign;
      // console.log(inputToSign.toString("hex"));
    }

    console.log("Building Trx");
    const finalTrx = txb.build().toHex();
    let broadcastRespone = await sendRequestToElectrom(
      electrumMethodEnum.broadcastTrx,
      /* PublicKey */ getOrGenerateKeyPair().publicKey,
      /* trx */ finalTrx
    );
    res.json(broadcastRespone);
  } catch (error) {
    console.log(error);
    res.status(500).json(JSON.stringify(error));
  }
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
  const {address} = bitcoin.payments.p2pkh({pubkey: keyPair.publicKey, network: TESTNET});

  //return adress to client
  res.json(address);
});

router.get("/getTransactions", (req, res) => {
  console.log("getTransactions route recieved ");

  // Get key pair
  let keyPair = getOrGenerateKeyPair();
  sendRequestToElectrom(electrumMethodEnum.getTransactions, keyPair.publicKey).then(resFromElectrum => {
    res.json(resFromElectrum);
  });
});

router.post("/messageToSphere", (req, res) => {
  console.log("messageToSphere route recieved ");

  // Get key pair
  let keyPair = getOrGenerateKeyPair();
  sendMessageToSphere(req.body.message)
    .then(resFromSphere => res.json(resFromSphere))
    .catch(e => res.status(500));
});

function getOrGenerateKeyPair() {
  //just for testing
  return bitcoin.ECPair.fromPrivateKey(testPrivateKey, {network: TESTNET});

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

async function sendMessageToSphere(message) {
  const client = new SphereClient("10.53.109.250", 11000);
  try {
    return await client.sendToSphere(message);
  } catch (error) {
    console.log("caught in sendMessageToSphere");
    throw error;
  }
}

module.exports = router;
