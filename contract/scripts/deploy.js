const { ethers } = require("hardhat");

async function main() {
  const DataVerificationContract = await ethers.getContractFactory("DataVerificationContract");
  const dataVerificationContract = await DataVerificationContract.deploy(unlockTime, { value: lockedAmount });

  await dataVerificationContract.deployed();

  console.log(
    `DataVerificationContract with ${ethers.utils.formatEther(lockedAmount)} ETH and unlock timestamp ${unlockTime} deployed to ${dataVerificationContract.address}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
