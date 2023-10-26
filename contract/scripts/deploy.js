const { ethers } = require('hardhat');

const main = async () => {
  const dataVerificationContractFactory = await ethers.getContractFactory("DataVerificationContract");
  const dataVerificationContract = await dataVerificationContractFactory.deploy();

  console.log(`Contract deployed to`, dataVerificationContract.target);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});