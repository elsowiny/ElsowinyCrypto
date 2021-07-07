const Block = require('./block');
const { GENESIS_DATA } = require('./config');
describe('Block', () => {

    const timestamp ='a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = 'some-data';
    const block = new Block({timestamp,lastHash, hash,data });

    it('should have timestamp, lastHash, hash,', () => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data)

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
        })
        
    });
});
