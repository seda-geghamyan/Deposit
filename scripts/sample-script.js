const hre = require("hardhat");

async function main() {
  const Deposit = await hre.ethers.getContractFactory("Deposit");
  const deposit = await Deposit.deploy({ value: 1e19 }); // constructor call

 // 10000000000000000000

  await deposit.deployed();

  console.log("Deposit deployed to:", deposit.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
