const ethers = require("ethers");
const fs = require("fs-extra");

const main = async () => {
  // HTTP://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "cebaf45d3d805d878f5fae3eae5bcfa06d6763c7985fe1ed2d9b5aea3670e7c9",
    provider
  );
};
