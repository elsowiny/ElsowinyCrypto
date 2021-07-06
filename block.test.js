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
});
