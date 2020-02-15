const Transcation = require("./transaction");
const Wallet = require("./index");

describe("Transaction", () => {
  let transcation, wallet, recipient, amount;

  beforeEach(() => {
    wallet = new Wallet();
    amount = 50;
    recipient = "r3cipi3nt";
    transcation = Transcation.newTransaction(wallet, recipient, amount);
  });

  it("output the `amount` substracted from the wallet balance", () => {
    expect(
      transcation.outputs.find(output => output.address === wallet.publicKey)
        .amount
    ).toEqual(wallet.balance - amount);
  });

  it("outputs the `amount` added to the recipient", () => {
    expect(
      transcation.outputs
        .find(output => output.address === recipient)
        .amount
    ).toEqual(amount);
  });

  describe("transcating with an amount that exceeds the balance", () => {
    beforeEach(() => {
      amount = 50000;
      transcation = Transcation.newTransaction(wallet, recipient, amount);
    });

    it("does not create the transaction", () => {
      expect(transcation).toEqual(undefined);
    });
  });
});
