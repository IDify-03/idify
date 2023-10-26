require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();

// const KEY = process.env.KEY;
const KEY = '146ef34e2daec2399194565dc48d3f324132ab6e5eba94982d19559c2d157e31'
/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [`${KEY}`]
    }
  }
};
