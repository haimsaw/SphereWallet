const express = require("express");
const router = express.Router();
const bitcoin = require("bitcoinjs-lib");
const axios = require("axios");
const crypto = require("crypto");
const ElectrumCli = require("electrum-client");

const TESTNET = bitcoin.networks.testnet;
var db = {};
const testPrivateKey = Buffer.from("��(\u00041\u00144�ه��z��X\u001d�\u0019z�`���\u001aP����W");
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
  let hashedPublicKey = crypto
    .createHash("sha256")
    .update(keyPair.publicKey)
    .digest("hex");

  console.log(hashedPublicKey);
  main(hashedPublicKey);
  //axios.post(bitcoinApiUrl + "/listunspent(" +);
});

const main = async hashedPublicKey => {
  const ecl = new ElectrumCli(60001, bitcoinApiUrl, "tls"); // tcp or tls
  console.log("befoer connect");
  await ecl.connect(); // connect(promise)
  console.log("after connect");

  res = await ecl.blockchainAddress_listunspent();

  console.log("result: " + res);

  // try {
  //   console.log("before version");
  //   const ver = await ecl.server_version("2.7.11", "1.0"); // json-rpc(promise)
  //   console.log("after version");

  //   console.log(ver + "ver");
  // } catch (e) {
  //   console.log(e + "err");
  // }
  await ecl.close(); // disconnect(promise)
};

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
  return { privateKey: testPrivateKey, publicKey: testPublicKey };

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
