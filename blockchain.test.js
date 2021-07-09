const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain', () => {
    const blockchain = new Blockchain();
    it('should contain a `chain` Array instance', () =>{
        expect(blockchain.chain).toBeInstanceOf(Array);
    } );

    it('should start with the genesis block', () =>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());

    });

    it('adds a new block to the chain' , () =>{
        const newData = 'hey elsowiny';
        blockchain.addBlock({data: newData});
        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });
});