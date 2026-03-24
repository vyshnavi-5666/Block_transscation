const crypto = require("crypto");

// Hash function
function hash(data) {
  return crypto.createHash("sha256")
    .update(typeof data === "string" ? data : JSON.stringify(data))
    .digest("hex");
}

// Build Merkle Tree
function buildMerkleTree(leaves) {
  if (!leaves || leaves.length === 0) return null;

  let level = leaves.map(hash);

  while (level.length > 1) {
    let nextLevel = [];

    for (let i = 0; i < level.length; i += 2) {
      if (i + 1 < level.length) {
        nextLevel.push(hash(level[i] + level[i + 1]));
      } else {
        nextLevel.push(hash(level[i] + level[i]));
      }
    }

    level = nextLevel;
  }

  return "0x" + level[0];
}

// Example
const blocks = [
  "Block1 Data",
  "Block2 Data",
  "Block3 Data",
  "Block4 Data",
  "Block5 Data"
];

const root = buildMerkleTree(blocks);

console.log("Merkle Root:", root);