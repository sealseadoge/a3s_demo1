const { ethers, getNamedAccounts } = require("hardhat");
//部署且mint之后依次测试：
//0.user0 mint wallet0
//1.user3 能向wallet0转入eth，user0能使用wallet0转出
//2.user1 不能通过a3s将wallet0 中的eth转出，也不能直接调用wallet0合约转出。
//3. -> user0 可以将wallet0转给user1,转出后 user0不能通过a3s将wallet0 中的eth转出，也不能直接调用wallet0转出。
//4.user1 此时可以将wallet0的eth转出。
async function main() {
  const { deployer } = await getNamedAccounts();
  //   const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [user0, user1, user2, user3] = await ethers.getSigners();
  console.log("user0 address : ", user0.address);
  console.log("user1 address : ", user1.address);
  const a3sUser0 = await ethers.getContractAt("A3S", addr, user0);
  //获取wallet0的地址
  const a3sWallet0Addr = await a3sUser0.getWalletAddressByTokenId(0);
  //0xa16E02E87b7454126E5E10d957A927A7F5B5d2be
  console.log("a3s wallet0 address : ", a3sWallet0Addr);
  await a3sUser0["safeTransferFrom(address,address,uint256)"](
    user0.address,
    user1.address,
    0
  );
  const wallet0 = await ethers.getContractAt("Wallet", a3sWallet0Addr, user0);
  const wallet0Owner = await wallet0.getOwner();
  console.log("wallet0Owner : ", wallet0Owner);
  //打印已经发行的所有NFT钱包及其owner
  const tokenCounter = await a3sUser0.getTokenCounter();
  console.log("tokenCounter : ", tokenCounter);
  for (var i = 0; i < tokenCounter; i++) {
    const ownerAddress = await a3sUser0.ownerOf(i);
    const tokenUri = await a3sUser0.tokenURI(i);
    const walletAddr = await a3sUser0.getWalletAddressByTokenId(i);
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
