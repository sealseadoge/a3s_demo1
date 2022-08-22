const hre = require("hardhat");

async function main() {
  console.log("begin deploy...");
  // const Storage = await hre.ethers.getContractFactory("Storage");
  const A3S = await hre.ethers.getContractFactory("A3S");

  const a3s = await A3S.deploy();
  await a3s.deployed;
  console.log("a3s deployed");
  console.log("the address of the Contract a3s : ", a3s.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
