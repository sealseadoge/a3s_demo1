const { BigNumber } = require("ethers");
const { ethers, getNamedAccounts } = require("hardhat");
const hre = require("hardhat");

async function main() {
  const [user0, user1, user2, user3] = await ethers.getSigners();
  const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const wallet = await ethers.getContractAt("Wallet", addr, user3);
  let wBalance = await wallet.getWalletBalance();
  let u3Balance = await user3.getBalance();
  console.log(
    "wallet balance : ",
    wBalance,
    "  deployer balance : ",
    u3Balance
  );
  const txResponse = await wallet.deposit({
    value: ethers.utils.parseEther("199.7"),
  });
  wBalance = await wallet.getWalletBalance();
  u3Balance = await user3.getBalance();
  console.log(
    "wallet balance : ",
    wBalance,
    "  deployer balance : ",
    u3Balance
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
