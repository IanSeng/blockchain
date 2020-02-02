const Blockchain = require("./blockchain");
const Block = require("./block");

describe("Blockchain", () => {
  let bc;

  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it("starts with genesis block", () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it("adds a new block", () => {
    const data = "foo";
    bc.addBlock(data);

    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it("validates a valid chain", () => {
    bc2.addBlock("foo");
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });
  it("invalidate a chain with a corrupt genesis block", () => {
    bc2.chain[0].data = "bad data";
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it("invalidate a corrupt chain", () => {
    bc2.addBlock("foo");
    bc2.chain[1].data = "Not foo";

    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });


  it('replaces the chain with a valid chain', () => {
      bc2.addBlock('goo');
      bc.replaceChain(bc2.chain);

      expect(bc.chain).toEqual(bc2.chain);
  }) 

  it('does not replace the chain with one or less than or equal to length', () => {
    bc.addBlock('foo');
    bc.replaceChain(bc2.chain);

    expect(bc.chain).not.toEqual(bc2.chain);
  })


});
