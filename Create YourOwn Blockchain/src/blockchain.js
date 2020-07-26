/**
 *                          Blockchain Class
 *  The Blockchain class contain the basics functions to create your own private blockchain
 *  It uses libraries like `crypto-js` to create the hashes for each block and `bitcoinjs-message` 
 *  to verify a message signature. The chain is stored in the array
 *  `this.chain = [];`. Of course each time you run the application the chain will be empty because and array
 *  isn't a persisten storage method.
 *  
 */

const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./block.js');
const bitcoinMessage = require('bitcoinjs-message');

class Blockchain {

    /**
     * Constructor of the class, you will need to setup your chain array and the height
     * of your chain (the length of your chain array).
     * Also everytime you create a Blockchain class you will need to initialized the chain creating
     * the Genesis Block.
     * The methods in this class will always return a Promise to allow client applications or
     * other backends to call asynchronous functions.
     */
    constructor() {
        this.chain = [];
        this.height = -1;
        this.initializeChain();
    }

    /**
     * This method will check for the height of the chain and if there isn't a Genesis Block it will create it.
     * You should use the `addBlock(block)` to create the Genesis Block
     * Passing as a data `{data: 'Genesis Block'}`
     */
    async initializeChain() {
        if( this.height === -1){
            let block = new BlockClass.Block({data: 'Genesis Block'});
            await this._addBlock(block);
        }
    }

    /**
     * Utility method that return a Promise that will resolve with the height of the chain
     */
    getChainHeight() {                                                         //This Function is Used in _addBlock(block) Function
        return new Promise((resolve, reject) => {
            resolve(this.height);
        });
    }

    /**
     * _addBlock(block) will store a block in the chain
     * @param {*} block 
     * The method will return a Promise that will resolve with the block added
     * or reject if an error happen during the execution.
     * You will need to check for the height to assign the `previousBlockHash`,
     * assign the `timestamp` and the correct `height`...At the end you need to 
     * create the `block hash` and push the block into the chain array. Don't for get 
     * to update the `this.height`
     * Note: the symbol `_` in the method name indicates in the javascript convention 
     * that this method is a private method. 
     */
    _addBlock(block) {                                                          //Used in submitStar
        let self = this;
        return new Promise(async (resolve, reject) => {
          let height = await self.getChainHeight();                             //Invocking the getChainHeight Function
          block.time = new Date().getTime().toString().slice(0, -3); 
            if(height == -1){                                                   //For Creating Genesis Block
                block.hash = SHA256(JSON.stringify(block)).toString();
                self.chain.push(block);
                self.height = self.chain.length - 1;
                resolve(block);
            }else{                                          
               block.height = height + 1;                                       //For Incrementing the height of the Blocks.
                block.previousBlockHash = self.chain[self.height].hash;         //For Stroing Previous Block's Hash
                block.hash = SHA256(JSON.stringify(block)).toString();          //For Verifying Signature
                self.chain.push(block);                                         //For Adding to the Block
                self.height = self.chain.length - 1;
                resolve(block);
            }
           });
    }

    /**
     * The requestMessageOwnershipVerification(address) method
     * will allow you  to request a message that you will use to
     * sign it with your Bitcoin Wallet (Electrum or Bitcoin Core)
     * This is the first step before submit your Block.
     * The method return a Promise that will resolve with the message to be signed
     * @param {*} address 
     */
    requestMessageOwnershipVerification(address) {
        return new Promise((resolve) => {
            resolve(`${address}:${new Date().getTime().toString().slice(0,-3)}:starRegister`);   //requestValidation
        });
    }

    /**
     * The submitStar(address, message, signature, star) method
     * will allow users to register a new Block with the star object
     * into the chain. This method will resolve with the Block added or
     * reject with an error.
     * Algorithm steps:
     * 1. Get the time from the message sent as a parameter example: `parseInt(message.split(':')[1])`
     * 2. Get the current time: `let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));`
     * 3. Check if the time elapsed is less than 5 minutes
     * 4. Veify the message with wallet address and signature: `bitcoinMessage.verify(message, address, signature)`
     * 5. Create the block and add it to the chain
     * 6. Resolve with the block added.
     * @param {*} address 
     * @param {*} message 
     * @param {*} signature 
     * @param {*} star 
     */
    submitStar(address, message, signature, star) {                
        let self = this;
        return new Promise(async (resolve, reject) => {                             //[0]                  [1]         [2]
            let time = parseInt(message.split(':')[1]);                             //<Wallet_Address>:1592147680:starRegister
            let currentTime = parseInt(new Date().getTime().toString().slice(0, -3));       //Fetching new time for checking the timestamp
            if (time > currentTime - 300000){                                       //Calculating the timestamp with previous time with new time
               let validation = bitcoinMessage.verify(message, address, signature);           //Validating using Bitcoin
               if(validation){
                    let block = new BlockClass.Block({owner: address, star: star});    //Initializing the address to the owner and star with star
                    let addingBlock = await self._addBlock(block);             //Function Call of _addBlock and storing it into addingBlock
                    resolve(addingBlock);                                     //Here the await function allows to wait the section for completing function that are written in _addBlock.
               }else{
                   reject("Error: Signature is not Valid");
               }
            }else{
                reject("Warning: You should submit the Star before 5 Minutes");
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block
     *  with the hash passed as a parameter.
     * Search on the chain array for the block that has the hash.
     * @param {*} hash 
     */
    getBlockByHash(hash) {                                          //Used in BlockchainController  getBlockByHash()
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(f => f.hash === hash)[0];             //To get Block by the hash value of the Block. 
            if(block){                                                          //Indexing helps for fetching the values from an array and Filter helps to filter it out from the chain.
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with the Block object 
     * with the height equal to the parameter `height`
     * @param {*} height 
     */
    getBlockByHeight(height) {                                          //Used in BlockchainController  getBlockByHeight()
        let self = this;
        return new Promise((resolve, reject) => {
            let block = self.chain.filter(f => f.height === height)[0];         //To get Block by the height of the block
            if(block){                                                         //Indexing helps for fetching the values from an array and filter helps to filter it out from the chain.
                resolve(block);
            } else {
                resolve(null);
            }
        });
    }

    /**
     * This method will return a Promise that will resolve with an array of Stars objects existing in the chain 
     * and are belongs to the owner with the wallet address passed as parameter.
     * Remember the star should be returned decoded.
     * @param {*} address 
     */
    getStarsByWalletAddress (address) {
        let self = this;
        let stars = [];
        return new Promise((resolve, reject) => {
            self.chain.map((getBlock) => {                              //Invocking the Chain
                let putData = getBlock.getBData();                      //Calling the function from Block.js and assigning to putData
                if(putData){
                    if (putData.owner === address){                     //Validating the Owner
                        stars.push(putData);
                    }
                }
            });
            resolve(stars);
        });
    }

    /**
     * This method will return a Promise that will resolve with the list of errors when validating the chain.
     * Steps to validate:
     * 1. You should validate each block using `validateBlock`
     * 2. Each Block should check the with the previousBlockHash
     */
    validateChain() {
        let self = this;
        let errorLog = [];                                                      //ErrorLog for keeping each and every errors
        return new Promise(async (resolve, reject) => {
            var i =1;
            if(self.height > 0){                                                
                for (i;i<=self.height;i++){                                    //Looping validate function for handling the worst condtion
                    let b = self.chain[i];
                    let validate = await b.validate();                          //Initializing the block to validate
                    if(!validate){                                             //If validation is failure According to the condition mention below
                        console.log("Error: Cannot Validate the Data");        //If validation get failured
                    }else if(block.previousBlockHash != b[i - 1].hash){        //Condition is someone tries to Tamper the Block
                        console.log("Error: Hash has been Tampered!");
                    }
                }
                if(errorLog){
                    resolve(errorLog);
                } else{
                    resolve("The Chain is Valid");                             //Best Condition
                }
            } else {
                reject(Error("Validation of the chain is Failed!")).catch(error => {
                    console.log(error.message);
                });
            }
        });
    }

}

module.exports.Blockchain = Blockchain;   
