const { ethers, getNamedAccounts } = require("hardhat");
//部署且mint之后依次测试：
//0.user0 mint wallet0
//1.-> user3 能向wallet0转入eth，user0能使用wallet0转出
//2.user1 不能通过a3s将wallet0 中的eth转出，也不能直接调用wallet0合约转出。
//3.user0 可以将wallet0转给user1,转出后 user0不能通过a3s将wallet0 中的eth转出，也不能直接调用wallet0转出。
//4.user1 此时可以将wallet0的eth转出。
async function main() {
  const { deployer } = await getNamedAccounts();
  //   const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [user0, user1, user2, user3] = await ethers.getSigners();
  const a3sUser0 = await ethers.getContractAt("A3S", addr, user0);
  //获取wallet0的地址
  const a3sWallet0Addr = await a3sUser0.getWalletAddressByTokenId(0);
  //0xa16E02E87b7454126E5E10d957A927A7F5B5d2be
  console.log("a3s wallet0 address : ", a3sWallet0Addr);
  //user3向 wallet0转入123个eth
  await user3.sendTransaction({
    to: a3sWallet0Addr,
    value: ethers.utils.parseEther("123.0"),
  });
  let user3Balance = await user3.getBalance();
  console.log("user3 balance after send 123 : ", user3Balance);
  let wallet0Balance = await a3sUser0.getWalletBalanceByTokenId(0);
  console.log("wallet0 balance should be 123 : ", wallet0Balance);

  //..........wallet0 向user2转出5个
  await a3sUser0.withdraw(0, user2.address, ethers.utils.parseEther("5.0"));
  let user2Balance = await user2.getBalance();
  console.log("user2 balance after receive 5 : ", user2Balance);
  wallet0Balance = await a3sUser0.getWalletBalanceByTokenId(0);
  console.log("wallet0 balance should be 118 : ", wallet0Balance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
