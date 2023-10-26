const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DataVerificationContract", function () {
  let dataVerificationContract;
  let owner;
  let user;
  let organization;
  const userData = {
    idNumber: "123456",
    dateOfIssue: "2023-10-26",
    expiringDate: "2023-10-26",
  };

  before(async function () {
    [owner, user, organization] = await ethers.getSigners();

    const dataVerificationContractFactory = await ethers.getContractFactory("DataVerificationContract");
    dataVerificationContract = await dataVerificationContractFactory.deploy();
  });

  it("Should register user data", async function () {
    await dataVerificationContract.connect(user).registerData(userData.idNumber, userData.dateOfIssue, userData.expiringDate);

    const userSMEData = await dataVerificationContract.smeData(user.address);
    expect(userSMEData.idNumber).to.equal(userData.idNumber);
  });

  it("Should request and generate proof", async function () {
    const dataToProve = userData;

    await dataVerificationContract.connect(organization).requestProof(user.address, dataToProve);

    await dataVerificationContract.connect(user).generateProof(dataToProve);

    const generatedProof = await dataVerificationContract.proofs(user.address);
    expect(generatedProof).to.not.equal("0x0000000000000000000000000000000000000000000000000000000000000000");
  });

  it("Should verify proof", async function () {
    const dataToProve = userData;

    const isVerified = await dataVerificationContract.connect(organization).verifyProof(user.address, dataToProve);

    expect(isVerified).to.be.true;
  });
});
