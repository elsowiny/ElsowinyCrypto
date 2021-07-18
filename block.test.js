const Block = require('./block');
const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash')
describe('Block', () => {

    const timestamp = 2000;
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = 'some-data';
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({timestamp, lastHash, hash, data, nonce, difficulty});

    it('should have timestamp, lastHash, hash,', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);

    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();
        console.log('genesis block', genesisBlock);

        it('returns a Block instance' , () => {
            expect(genesisBlock).toBeInstanceOf(Block);
        });

        it('returns the genesis',()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    });

    describe('mineBlock()', () => {
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({lastBlock, data });
        it("return a Block instance", () => {
            expect(minedBlock).toBeInstanceOf(Block);
        });
        it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
            console.log('lastHash', minedBlock.lastHash);
            console.log('hash', lastBlock.hash);
        });

      

        it('sets the `data`', ()=>{
            expect(minedBlock.data).toEqual(data);
            

        });

        

        it('sets the `timestamp` to be the current time', ()=>{
            expect(minedBlock.timestamp).not.toEqual(undefined);
        });

        it('create a SHA-256 `hash ` based on the proper inputs', ()=>{
            expect(minedBlock.hash).toEqual(
                cryptoHash(minedBlock.timestamp, 
                    minedBlock.nonce, 
                    minedBlock.difficulty, 
                    lastBlock.hash, 
                    data
                    )
            );

        });

        it('sets a `hash` that matches the difficulty criteria', () =>{
            expect(minedBlock.hash.substring(0, minedBlock.difficulty))
            .toEqual('0'.repeat(minedBlock.difficulty));
        });
        
});



    describe('adjustDifficulty()', ()=>{
        it('raises the difficulty for a quickly mined block' , () => {
            expect(Block.adjustDifficulty({
                originalBlock: block,
                timestamp: block.timestamp + MINE_RATE - 100
            })).toEqual(block.difficulty + 1);
        });
        it('lowers the difficulty for a slowly mined block' , () => {
            expect(Block.adjustDifficulty({
                originalBlock: block,
                timestamp: block.timestamp + MINE_RATE + 100
            })).toEqual(block.difficulty - 1);
        });

    })
});
