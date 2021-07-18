const Blockchain = require('./blockchain');
const Block = require('./block');
const cryptoHash = require('./crypto-hash');

describe('Blockchain', () => {
    let blockchain, newChain, originalChain;

    beforeEach(() => {
        blockchain = new Blockchain();
        newChain = new Blockchain();

        originalChain = blockchain.chain;
    });

    it('should contain a `chain` Array instance', () =>{
        expect(blockchain.chain).toBeInstanceOf(Array);
    });

    it('should start with the genesis block', () =>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());

    });

    it('adds a new block to the chain' , () =>{
        const newData = 'hey elsowiny';
        blockchain.addBlock({data: newData});
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    
    
    
    describe('isValidChain()', () =>{
        beforeEach(() => {
            blockchain.addBlock({data: 'Elsowiny'});
            blockchain.addBlock({data: 'Sherief'});
            blockchain.addBlock({data: 'yoloSwag'});
        });

        describe('when the chain does not start with the genesis block', () =>{
            it('should return false', () =>{
               blockchain.chain[0] = {data: 'hey fake'};
               expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe('when the chain starts with the genesis block', () =>{
                describe('and a lastHash reference changed' , () =>{
                    it('should return false', () =>{
                      

                        // tamper data
                        blockchain.chain[2].lastHash = 'yoloSwaggerHacker';
                        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                    });
                });
        });

        describe('and the chain contains a block with an invalid field',()=>{
             it('should return false', () =>{
                

                // tamper data
                blockchain.chain[2].data = 'yoloSwaggerHacker';
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

             });
        });
        
        describe('and the chain does not contain a any invalid data',()=>{
            it('should return true', () =>{
             

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
            });
        });

        describe('and the chain contains a block with a jumped difficulty', () =>{
            it('should return false', () => {
                const lastBlock = blockchain.chain[blockchain.chain.length - 1];
                const lastHash = lastBlock.hash;
                const timestamp = Date.now();
                const nonce = 0;
                const data = [];
                const difficulty = lastBlock.difficulty - 3;

                const hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
                
                const badBlock = new Block({
                    timestamp,
                    lastHash,
                    hash,
                    data,
                    nonce,
                    difficulty

                });
                blockchain.chain.push(badBlock);
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

            });
        });

    });

    
    


    describe('replaceChain()', () =>{
        let errorMock, logMock;

        beforeEach(() => {
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        })

        describe('when the new chain is not longer ', () =>{
            beforeEach(() => {
                newChain.chain[0] = {new: 'chainnnn'};
                blockchain.replaceChain(newChain.chain);
            })
            it('does NOT replace the chain', () =>{

               
                expect(blockchain.chain).toEqual(originalChain);
                
            });



            it('logs an error', () =>{
                expect(errorMock).toHaveBeenCalled();
            });
        })

        describe('when the new chain is longer ', () =>{

            beforeEach(() => {
                newChain.addBlock({data: 'Elsowiny'});
                newChain.addBlock({data: 'Sherief'});
                newChain.addBlock({data: 'yoloSwag'});
            })

            describe('and the chain is invalid', () => {
                beforeEach(() => {
                    newChain.chain[2].hash = 'yoloSwaggerHackerFake-fash';
                    blockchain.replaceChain(newChain.chain);
                });
                it('does NOT replace the chain', () =>{
                   
                    expect(blockchain.chain).toEqual(originalChain);
                });

                
                it('logs an error', () =>{
                    expect(errorMock).toHaveBeenCalled();
                });
                
            });

            describe('and the chain is valid', ()=>{
                beforeEach(() => {
                    blockchain.replaceChain(newChain.chain);
                });
                it('should replace the chain', () =>{
                    expect(blockchain.chain).toEqual(newChain.chain);
                    
                });

                it('should log about the chain replacement' , () =>{
                    expect(logMock).toHaveBeenCalled();
                });
            });
            
        });




    });

});