import { loadStdlib, ask } from '@reach-sh/stdlib'; 
import * as backend from './build/index.default.mjs';
const stdlib = loadStdlib();

let players = [0, 0, 0]
let index = 0;

// console.log(`Show me what is happening with this thing here: ${players}`


// players.forEach(async (arr, f)  =>{
//     players[f] = await ask.ask(
//         `What is happening here?`,
//         (x => x)
//     );
//    console.log(`Show me the data within the array: ${players[f]}`)
// });

//get player name
const player = await ask.ask(
    `What is your name player...?`,
    (x => x)
)

let acc = null;
const createAcc = await ask.ask(
    `Would you like to create an account? (only possible on devnet)?`.
    ask.yesno
);

if(createAcc){
    acc = await stdlib.newTestAccount(stdlib.parseCurrency(1000));
}else{
    const secret = await ask.ask(
        `What is your account secret?`,
        (x => x)
    );
    acc = await stdlib.newAccountFromSecret(secret);
}

let ctc = null;
if(player !== ""){
    ctc = acc.contract(backend);
    ctc.getInfo().then((info) => {
        console.log(`The contract is deployed as = ${JSON.stringify(info)}`); 
    });
}else{
    const info = await ask.ask(
        `PLease paste the contract information:`,
        JSON.parse
    );
    ctc = acc.contract(backend, info);
}

console.log(`${player} has entered the game...`);

// players.forEach((player =>{
    // players[index] = await  ask.ask(
    //     `State your name player...`,
    //     (x => x)
    // );
    // console.log(`Show me the players who have joined in ${players[index]}`)
    // index++;
// }))

ask.done();