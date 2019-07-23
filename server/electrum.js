const Client = require("electrum-client");
const bitcoinjs = require("bitcoinjs-lib");
const TESTNET = bitcoinjs.networks.testnet;

const methodEnum = {
  listUnspent: 0,
  getBalance: 1,
  getTransactions: 2
};

const proc = async (cl, method, publicKey) => {
  try {
    const version = await cl.server_version("2.7.11", "1.0");
    // console.log(version)
    // const fee = await cl.blockchainEstimatefee(6)
    // console.log(fee)
    // 2NCXtCZp45D8gS4Cyb5SBRjmHBngJhAvQqb
    // 2MtgSNACcz6NXtWJmBrj5JcWzXo9pKXrtZj
    // 2N2gmWMwrjuxdECctvGQpCLv8tEhUGM9ig6
    // mkHS9ne12qx9pS9VojpwU5xtRd4T7X7ZUt
    // tb1q2nxh9twy0ff8pe4rs6k5gkfjhajh9ptklf8972
    const { address } = bitcoinjs.payments.p2pkh({ pubkey: publicKey, network: TESTNET });
    const scriptHash = toElectrumHash(address);
    console.log("scriptHash =", scriptHash);
    let response;
    switch (method) {
      case methodEnum.listUnspent:
        response = await cl.blockchainScripthash_listunspent(scriptHash);
        console.log("listUnspent =", response);
        break;
      case methodEnum.getBalance:
        response = await cl.blockchainScripthash_getBalance(scriptHash);
        console.log("balance =", response);
        break;
      case methodEnum.getTransactions:
        console.log("num of transactions =", response);

        response = await cl.blockchainScripthash_getHistory(scriptHash, 1);
        console.log("balance =", response);
        break;

      default:
        break;
    }

    return response;
  } catch (e) {
    console.log(e);
  }
};

const sendRequestToBitcoin = async (method, publicKey) => {
  const cl = new Client(60001, "ec2-34-219-15-143.us-west-2.compute.amazonaws.com");
  await cl.connect();
  const response = await proc(cl, method, publicKey);
  await cl.close();
  return response;
};

const toElectrumHash = function(address) {
  let network = bitcoinjs.networks.testnet;
  let script = bitcoinjs.address.toOutputScript(address, network);
  // let addressInfo = bitcoinjs.address.fromBase58Check(address);
  // console.log('addressInfo =', addressInfo);
  // let script = bitcoinjs.payments.p2sh({
  //     // redeem: bitcoinjs.payments.p2wpkh({
  //     //     hash: addressInfo.hash,
  //     //     network
  //     // }),
  //     hash: addressInfo.hash,
  //     network
  // });

  // console.log('script #1 =', script);
  // console.log('script.output =', script.output.toString('hex'));
  // console.log('script.hash =', script.hash.toString('hex'));
  // console.log('script.address =', script.address.toString('hex'));
  // console.log('script.input =', script.input);
  // console.log('script.witness =', script.witness);
  // console.log('script.redeem.output =', script.redeem.output.toString('hex'));
  // console.log('script.redeem.hash =', script.redeem.hash.toString('hex'));
  // script = script.output
  // console.log('script.output =', script.output);
  let hash = bitcoinjs.crypto.sha256(script);
  return Buffer.from(hash.reverse()).toString("hex");
};

const toECPair = function(network) {
  return bitcoinjs.ECPair.fromPublicKey(Buffer.from(this.toHex(), "hex"), { network });
};

module.exports = { sendRequestToBitcoin, methodEnum };
