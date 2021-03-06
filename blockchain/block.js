const { DIFFICULTY, MINE_RATE } = require("../config");
const ChainUitl = require("../chain-util");

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }
  // for debug purpose
  toString() {
    return `Block - 
           Timestamp : ${this.timestamp}
           Last Hash : ${this.lastHash.substring(0, 10)}
           Hash      : ${this.hash.substring(0, 10)}
           Nonce     : ${this.nonce}
           Difficulty: ${this.difficulty}
           Data      : ${this.data}`;
  }

  static genesis() {
    return new this("Genesis time", "------", "f1r57-h45h", [], 0, DIFFICULTY);
  }

  // mineBlock function is to generate new block
  static mineBlock(lastBlock, data) {
    let hash, timestamp;
    let nonce = 0;
    let { difficulty } = lastBlock;
    const lastHash = lastBlock.hash;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return ChainUitl.hash(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}`
    ).toString();
  }

  static blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1;
    return difficulty;
  }
}

module.exports = Block;
