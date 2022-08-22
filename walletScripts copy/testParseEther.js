const { BigNumber } = require("ethers");
const hre = require("hardhat");

async function main() {
  console.log("begin deploy...");
  // const Storage = await hre.ethers.getContractFactory("Storage");
  //   const Wallet = await hre.ethers.getContractFactory("Wallet");

  //   const wallet = await Wallet.deploy();
  //   await wallet.deployed;
  //   console.log("wallet deployed");
  //   console.log("the address of the Contract wallet : ", wallet.address);
  const [user0, user1, user2, user3] = await ethers.getSigners();
  let value = hre.ethers.utils.parseEther("123.4");
  console.log("value : ", value);
  //   await user3.sendTransaction({
  //     to: wallet.address,
  //     value: ethers.utils.parseEther("99.0"),
  //   });
  //   let user3Balance = await user3.getBalance();
  //   console.log("user3 balance : ", user3Balance);
  //   // let walletBalance = await wallet.getBalance();
  //   // console.log("wallet balance 1 : ", walletBalance);
  //   let walletBalance = await wallet.getWalletBalance();
  //   console.log("wallet balance : ", walletBalance);
  //   await wallet.withdraw(user2.address, BigNumber.from("3000000000000000000"));
  //   walletBalance = await wallet.getWalletBalance();
  //   console.log("wallet balance : ", walletBalance);
  //   let user2Balance = await user2.getBalance();
  //   console.log("user2 balance : ", user2Balance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
