const Blockchain = require("./blockchain");
const Wallet = require("./wallet");

const bc = new Blockchain();
const wallet = new Wallet();

// for (let i = 0; i < 10; i++) {
//   console.log(bc.addBlock(`foo ${i}`).toString());
// }

console.log(wallet.toString());
