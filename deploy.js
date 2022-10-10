const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("contract Deplying, please wait .......");
  const contract = await contractFactory.deploy();
        console.log("contract address", contract.address)   
    // const transactionReceipt = await contract.deployTransaction.wait(1);
  const currentFavoriteNumber = await contract.retrieve();
  console.log("current number is  ", currentFavoriteNumber.toString());
  const tracsactionResponse = await contract.store("7");
  const transactionReceipt = await tracsactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log("update number is  ", updatedFavoriteNumber.toString());
};

main();
