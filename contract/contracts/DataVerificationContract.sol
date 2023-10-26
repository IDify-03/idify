// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


contract DataVerificationContract is Ownable(msg.sender) {
    using ECDSA for bytes32;

    struct SMEData {
        address user;
        string idNumber;
        string dateOfIssue;
        string expiringDate;
    }

    struct ProofRequest {
        address requestingOrganization;
        address sme;
        string dataToProve;
        bool isProven;
    }

    mapping(address => SMEData) public smeData;
    mapping(address => ProofRequest) public proofRequests;
    mapping(address => bytes) public proofs;

    event DataRegistered(address indexed user, string idNumber);
    event ProofRequested(address indexed requestingOrganization, address indexed sme, string dataToProve);
    event ProofGenerated(address indexed sme, address indexed requestingOrganization, string dataToProve);
    event ProofVerified(address indexed sme, address indexed requestingOrganization, string dataToProve);

    // Function for user to register their new data
    function registerData(string memory idNumber, string memory dateOfIssue, string memory expiringDate) public {
        require(bytes(smeData[msg.sender].idNumber).length == 0, "Data already registered");
        smeData[msg.sender] = SMEData(msg.sender, idNumber, dateOfIssue, expiringDate);
        emit DataRegistered(msg.sender, idNumber);
    }

    // Function for Bank or Other organisation to request proof from SMES
    function requestProof(address sme, string memory dataToProve) public {
        ProofRequest storage request = proofRequests[msg.sender];
        require(request.sme == address(0), "Request already exists");
        request.requestingOrganization = msg.sender;
        request.sme = sme;
        request.dataToProve = dataToProve;
        request.isProven = false;
        emit ProofRequested(msg.sender, sme, dataToProve);
    }

    function generateProof(string memory dataToProve) public {
        SMEData storage data = smeData[msg.sender];
        ProofRequest storage request = proofRequests[msg.sender];
        require(bytes(data.idNumber).length > 0, "Data not registered");
        require(keccak256(bytes(request.dataToProve)) == keccak256(bytes(dataToProve)), "Invalid data to prove");
        require(request.isProven == false, "Proof already generated");

        bytes32 dataHash = keccak256(bytes(dataToProve));
        bytes memory signature = ECDSA.recover(dataHash, msg.sender);

        // Store the signature as the proof
        proofs[msg.sender] = signature;
        request.isProven = true;
        emit ProofGenerated(msg.sender, request.requestingOrganization, dataToProve);
    }

    function verifyProof(address sme, string memory dataToProve) public view returns (bool) {
        ProofRequest storage request = proofRequests[sme];
        require(request.requestingOrganization == msg.sender, "Unauthorized verification");
        require(request.isProven, "Proof not generated");

        // Use ECDSA to verify the proof
        bytes memory signature = proofs[sme];
        bytes32 dataHash = abi.encodePacked(dataToProve).toEthSignedMessageHash();
        return dataHash.recover(signature) == sme;
    }
}
