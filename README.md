# Data Verification Platform

## Overview

The Data Verification Platform is a blockchain-based solution designed to securely manage data verification processes for small and medium-sized enterprises (SMEs) and organizations, such as banks. The platform utilizes zero-knowledge proofs (ZKPs) to enhance data privacy and security while allowing organizations to verify specific data without exposing sensitive information.

## Features

- **Dashboard**: A user-friendly dashboard to manage account activities.
- **Navigation Bar**: Provides easy access to key sections including wallet address, organisation, notifications, and data management.
- **Get Started**: Authentication using MetaMask or other secure methods.
- **Zero-Knowledge Proof Generation**: Allows SMEs to generate ZKPs to prove data possession without revealing the data.
- **Notifications**: SMEs receive proof requests from organizations.
- **Data Request**: Organizations can request specific data proofs from SMEs.
- **Proof Verification**: Organizations can verify the validity of ZKPs.

## Prerequisites

Before running the project, ensure you have the following:
!!! Source libraries requires different compiler version  0.8.20+commit.a1b79de6
Hardhat compiler verion is => (current compiler is 0.8.18+commit.87f61d96.Emscripten.clang)
So you can't compile it with the hardhat but you can use Remix Ide to compile the contracts

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- [Hardhat](https://hardhat.org/) or another Ethereum development environment set up.
- [MetaMask](https://metamask.io/) or an Ethereum wallet extension installed.
