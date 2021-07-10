const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
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
               expect(Blockchain.isValidChain(blockchain.chain)).toBeFalse();
            });
        });

        describe('when the chain starts with the genesis block', () =>{
                describe('and a lastHash reference changed' , () =>{
                    it('should return false', () =>{
                      

                        // tamper data
                        blockchain[2].lastHash = 'yoloSwaggerHacker';
                        expect(Blockchain.isValidChain(blockchain.chain)).toBeFalse();
                    });
                });
        });

        describe('and the chain contains a block with an invalid field',()=>{
             it('should return false', () =>{
                

                // tamper data
                blockchain.chain[2].data = 'yoloSwaggerHacker';
                expect(Blockchain.isValidChain(blockchain.chain)).toBeFalse();

             });
        });
        
        describe('and the chain does not contain a any invalid data',()=>{
            it('should return true', () =>{
             

                expect(Blockchain.isValidChain(blockchain.chain)).toBeTrue();
            });
        });

    });

        
});