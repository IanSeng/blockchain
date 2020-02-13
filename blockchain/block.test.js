const Block = require("./block");
const { DIFFICULTY } = require("../config");
describe("Block", () => {
  let data, lastBlock, block;
  beforeEach(() => {
    data = "bar";
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });
  it("sets the `data` to match the input", () => {
    expect(block.data).toEqual(data);
  });

  it("sets the `lastHash` to match the hash of the last block", () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });
  
  it("generates a hash that matches the difficulty", () => {
    console.log(block.diffuculty)
    console.log(block.hash.substring(0, block.difficulty) + "hi")
    expect(block.hash.substring(0, block.diffuculty)).toEqual('0'.repeat(block.diffuculty));
   
  });
});
