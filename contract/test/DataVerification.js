const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DataVerificationContract", function () {
    let dataVerificationContract;
    let owner;
    let sme;
    let organization;

    before(async function () {
        [owner, sme, organization] = await ethers.getSigners();

        const DataVerificationContract = await ethers.getContractFactory("DataVerificationContract");
        dataVerificationContract = await DataVerificationContract.deploy();
        await dataVerificationContract.deployed();
    });

    it("Should register SME data", async function () {
        const idNumber = "123456789";
        const dateOfIssue = "2023-01-01";
        const expiringDate = "2023-12-31";

        await expect(dataVerificationContract.connect(sme).registerData(idNumber, dateOfIssue, expiringDate))
            .to.emit(dataVerificationContract, "DataRegistered")
            .withArgs(sme.address, idNumber);
    });

    it("Should request proof and generate ZKP", async function () {
        const dataToProve = "123456789";

        await expect(dataVerificationContract.connect(organization).requestProof(sme.address, dataToProve))
            .to.emit(dataVerificationContract, "ProofRequested")
            .withArgs(organization.address, sme.address, dataToProve);

        await expect(dataVerificationContract.connect(sme).generateProof(dataToProve))
            .to.emit(dataVerificationContract, "ProofGenerated")
            .withArgs(sme.address, organization.address, dataToProve);

        const proof = await dataVerificationContract.proofs(sme.address);
        expect(proof).to.not.be.empty;
    });

    it("Should verify ZKP", async function () {
        const dataToProve = "123456789";
        const proof = await dataVerificationContract.proofs(sme.address);

        const isVerified = await dataVerificationContract.connect(organization).verifyProof(sme.address, dataToProve);
        expect(isVerified).to.equal(true);
    });

    it("Should fail to verify with incorrect data", async function () {
        const incorrectDataToProve = "987654321";

        const isVerified = await dataVerificationContract.connect(organization).verifyProof(sme.address, incorrectDataToProve);
        expect(isVerified).to.equal(false);
    });
});
