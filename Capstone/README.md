# UDACITY BLOCKCHAIN CAPSTONE PROJECT
> This is a Real-World Project using blockchain. Here Blockchain is solving the problem in **Real-Estate Industry** to sell or buy properties. We're using **OpenSea** as a market place.
> The Token that we're using in this project is **ERC721**, it is a non-fungible token. The one of the major problem is the authencity of the owner, for solving this issue, we're using
> **zk-SNARKs**. So **zk-SNARKs** will help us to verify the owner and the other issue is the details of the property, here is the major role of **OpenSea**, this marketplace will give 
> all the details of the property and provides a easy transaction of money. Therefore, by using this project we can easly resolve the problems that are facing in the **Real-Estate Industry**

## How to Install
  > This repository contains Smart Contract code in Solidity (using Truffle), tests (also using Truffle), dApp scaffolding (using HTML, CSS and JS).
  - To install, download or clone the repo, then:
   ```
  cd Capstone
  npm i
  ```
  - To run ganache:
  ```
  ganache-cli
  ```
  - In a separate terminal window,from inside the directory eth-contracts/ Compile smart contracts:
  `truffle.cmd compile`
  > This will create the smart contract artifacts in folder build\contracts.
  - To Deploy the Application

  `truffle migrate --network <Select a Network>`
  
  ![CapstoneMigration](https://github.com/Sreesankar-G-Warrier/BlockchainProjects/blob/master/Capstone/CapstoneMigration.png)
  
  - To Test the Application

  `truffle test`
  
  ![CapstoneTest](https://github.com/Sreesankar-G-Warrier/BlockchainProjects/blob/master/Capstone/Capstone%20Test.png)
  
  - Create ZK-Snarks Proof using Zokrates
  > Install Docker Community Edition here (https://docs.docker.com/install/). Virtualization should be enabled for Docker to work. 
  - Run this docker command

  `docker run -v <path to your project folder>:/home/zokrates/code -ti zokrates/zokrates:0.3.0 /bin/bash`
  - Change Directory to

  `cd code/zokrates/code/square/`
  - Then compile

  `/path/to/zokrates compile -i square.code`
  - Compute Witness

  `/path/to/zokrates compute-witness -a 3 9`
  - After that Generate Proof

  `/path/to/zokrates generate-proof`
  - Then Export Verifier

  `path/to/zokrates export-verifier`

  ## Minting the Token
  > In a separate terminal window, launch the DApp

  `npm run dev`
## Contract Details

| Contract Name      |              Contract Address              |
| ------------------ | ------------------------------------------ |
| SquareVerifier     | 0x94cd576AcA46B37Be786f9Dde21b227DaC6442ac |
| SolnSquareVerifier | 0xc4aa98710BCA36ee2D6A71924A3e01B31d60095f |

## On Etherscan and OpenSea Demo
  - SolnSquareVerifier on Ether: https://rinkeby.etherscan.io/address/0x21b0dd083d18062F04078C8B329f3Ab90E848e3F
  - Transaction: https://rinkeby.etherscan.io/address/0x205cb429cc7dccff9a222b51cb5553fe1d5704b0
  - Demo of OpenSea: - https://rinkeby.opensea.io/assets/0x21b0dd083d18062f04078c8b329f3ab90e848e3f/200
                     - https://rinkeby.opensea.io/assets/0x9a53711e8a178e6adb0218ecb0a4de358dc27ce2/2
                     - https://rinkeby.opensea.io/assets/0xc218a7b48e84640ae44893d5a674bcc5bd28a3f7/2000
                     - https://rinkeby.opensea.io/assets/0x876472d7ba7197e03555d7fedfbf409be79d9d2d/10000
                     - https://rinkeby.opensea.io/assets/0x46aeb0cdb2ff7428b4e83761807e4251beb152bb/1
  
## Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
