const MINE_RATE = 10000;
const INITIAL_DIFFICULTY = 14;


const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '--', 
    hash: 'elsowiny-hash',
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

module.exports = { GENESIS_DATA, MINE_RATE };