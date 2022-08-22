const { ethers, getNamedAccounts } = require("hardhat");
//部署且mint之后依次测试：
//0.user0 mint wallet0
//1.user3 能向wallet0转入eth，user0能使用wallet0转出
//2.-> user1 不能通过a3s将wallet0 中的eth转出，也不能直接调用wallet0合约转出。
//3.user0 可以将wallet0转给user1,转出后 user0不能通过a3s将wallet0 中的eth转出，也不能直接调用wallet0转出。
//4.-> user1 此时可以将wallet0的eth转出。
async function main() {
  const { deployer } = await getNamedAccounts();
  //   const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [user0, user1, user2, user3] = await ethers.getSigners();
  const a3sUser1 = await ethers.getContractAt("A3S", addr, user1);
  //获取wallet0的地址
  const a3sWallet0Addr = await a3sUser1.getWalletAddressByTokenId(0);
  //0xa16E02E87b7454126E5E10d957A927A7F5B5d2be
  console.log("a3s wallet0 address : ", a3sWallet0Addr);
  //先获取并打印i_owner和msg.sender，对比是否一致
  const msgSender = await a3sUser1.getMessageSender();
  const iOwner = await a3sUser1.getIowner(0);
  console.log("msgSender :  ", msgSender, "iOwner : ", iOwner);
  const sender = await a3sUser1.getSender(0);
  const flag = await a3sUser1.getFlag(0);
  console.log("sender :  ", sender, "owner : ", iOwner, "flag : ", flag);
  //user1 调用a3s withdraw方法将 wallet0转出8个eth，步骤2时应抛出异常，步骤4时应能正常执行
  await a3sUser1.withdraw(0, user2.address, ethers.utils.parseEther("8.0"));
  let wallet0Balance = await a3sUser1.getWalletBalanceByTokenId(0);
  console.log("wallet0 Balance maybe 110 : ", wallet0Balance);
  //user1 直接调用wallet 的withdraw方法, 步骤2时应抛出异常，步骤4时应能正常执行
  // const wallet0 = await ethers.getContractAt("Wallet", a3sWallet0Addr, user1);
  // await wallet0.withdraw(user2.address, ethers.utils.parseEther("9.0"));
  // let wallet0Balance = await a3sUser1.getWalletBalanceByTokenId(0);
  // wallet0Balance = await a3sUser1.getWalletBalanceByTokenId(0);
  // console.log("wallet0 Balance maybe 101 : ", wallet0Balance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
