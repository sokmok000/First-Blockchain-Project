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
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("contract Deplying, please wait .......");
  const contract = await contractFactory.deploy();
  //   const transactionReceipt = await contract.deployTransaction.wait(1);
  const currentFavoriteNumber = await contract.retrieve();
  console.log("current number is  ", currentFavoriteNumber.toString());
  const tracsactionResponse = await contract.store("7");
  const transactionReceipt = await tracsactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log("update number is  ", updatedFavoriteNumber.toString());
};

main();
