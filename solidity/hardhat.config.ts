import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  networks: {
    polygon: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/Yfrm2SI3VwZWwIgpb_fizrC4Y8UgwAmH',
      accounts: [
        process.env.PRIVATE_KEY ??
          '8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'
      ],
      gasPrice: 100000000000
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/uBGMUDYLkss-zCtNjr5gxZerNS-D-kiN',
      accounts: [
        process.env.PRIVATE_KEY ??
          '8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'
      ],
      gasPrice: 35000000000
    },
    // ethereum
    ethereum: {
      url: 'https://eth-mainnet.g.alchemy.com/v2/594y_GONlw1CfyfRUF2ZBXWEvkc3qzdH',
      accounts: [
        process.env.PRIVATE_KEY ??
          '8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'
      ]
    },
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/GG_6HvNIcrM9eDm-ljjI9rOd_ViRwoqf',
      accounts: [
        process.env.PRIVATE_KEY ??
          '8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'
      ]
    },
    wemix: {
      url: 'https://api.wemix.com/',
      accounts: [
        process.env.PRIVATE_KEY ??
          '8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'
      ],
      gasPrice: 3000000000000
    },
    twemix: {
      url: 'https://api.test.wemix.com',
      accounts: [
        process.env.PRIVATE_KEY ??
          '8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f'
      ],
      gasPrice: 3000000000000
    }
  }
};

export default config;
