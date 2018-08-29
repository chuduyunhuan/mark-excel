
import * as nopt from 'nopt';



const knownOpts = {
    port: Number,
};

const shortHands = {
    p: [ '--port' ],
};


export default nopt(knownOpts, shortHands, process.argv, 2);

