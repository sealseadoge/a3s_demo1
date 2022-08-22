const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
  const { deployer } = await getNamedAccounts();
  //   const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [user0, user1, user2, user3] = await ethers.getSigners();
  const a3s = await ethers.getContractAt("A3S", addr, user0);
  console.log("contract A3S address : ", addr);
  console.log("deployer     address : ", deployer);
  const res = await a3s.mintNft();
  console.log("mintRes : ", res);
  //safeTransferFrom(from,to,tokenId)   safeTransferFrom
  //getApproved(tokenId)
  //ownerOf(tokenId)
  //balanceOf(ownerAddress)
  //tokenURI(tokenId)
  //getTokenCounter()
  // const from = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  // const to = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

  //   await a3s.transferFrom(from, to, 2);
  //   await a3s.transferFrom(from, to, 4);
  // await a3s["safeTransferFrom(address,address,uint256)"](from, to, 7);

  const tokenCounter = await a3s.getTokenCounter();
  console.log("tokenCounter : ", tokenCounter);
  for (var i = 0; i < tokenCounter; i++) {
    const ownerAddress = await a3s.ownerOf(i);
    const tokenUri = await a3s.tokenURI(i);
    const walletAddr = await a3s.getWalletAddressByTokenId(i);
    console.log(
      "tokenURI = ",
      tokenUri,
      "wallet address = ",
      walletAddr,
      "ownerAddress = ",
      ownerAddress
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
