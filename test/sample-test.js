const { expect } = require("chai");
const {
  ethers: { getContractFactory, BigNumber, getNamedSigners },
} = require("hardhat");

// https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html
// import in hardhat.config.js
// write signers
// import hardhat-deploy in hardhat-config
// create signers in tests

describe("Deposit: ", function () {
  let accounts;
  let deployer, owner, caller, holder;

  it("Should invest with correct args: ", async function () {
    const Deposit = await getContractFactory("Deposit");
    const deposit = await Deposit.deploy({
      value: BigNumber.from("10000000000000000000"),
    });
    await deposit.deployed();

    accounts = await getNamedSigners();
    ({ deployer, owner, caller, holder } = accounts);
    const beforeDeposit = await deposit.contractBalance();

    // test invest function
    await deposit
      .connect(caller)
      .invest({ value: BigNumber.from("1000000000") });

    const afterDeposit = await deposit.contractBalance();

    expect(await deposit.investings(caller.address)).to.equal(
      BigNumber.from("1000000000")
    );
    expect(afterDeposit.sub(beforeDeposit)).to.equal(
      BigNumber.from("1000000000")
    );

    // test withdraw function
    const amount = await deposit.interestRate(
      await deposit.investings(caller.address)
    );

    const beforeWithdraw = await deposit.contractBalance();
    await deposit.connect(caller).withdraw();
    const afterWithdraw = await deposit.contractBalance();

    expect(await deposit.investings(caller.address)).to.equal(0);
    expect(beforeWithdraw.sub(afterWithdraw)).to.equal(BigNumber.from(amount));
  });
});
