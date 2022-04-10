import { loadStdlib, ask } from '@reach-sh/stdlib'; 
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();


let numberOfPlayersCanJoinGame = 6;
let players = [0, 0, 0]
let index = 0;

// console.log(`Show me what is happening with this thing here: ${players}`

const startingBalance = stdlib.parseCurrency(1000);
// const fmt = (x) => stdlib.formatCurrency(x, 4);

// players.forEach(async (arr, f)  =>{
//     players[f] = await ask.ask(
//         `What is happening here?`,
//         (x => x)
//     );
//    console.log(`Show me the data within the array: ${players[f]}`)
// });

//get player name

const isFunder = await ask.ask(
    `Are you the funder ?`,
    ask.yesno
)

var  numberOfPlayersInGame = 0;
var player = 0;

if(isFunder){
    player = 1;
    numberOfPlayersInGame = Number(await ask.ask(
        `How many players do you want in the game ?`,
        (num => num)
    ))
}else{
    player = Number(await ask.ask(
        `What is your number player...?`,
        (x => x)
    ))
}


let acc = null;
const createAcc = await ask.ask(
    `Would you like to create an account? (only possible on devnet)?`,
    ask.yesno
);

if(createAcc){
    // acc = await stdlib.newTestAccount(stdlib.parseCurrency(1000));
    // console.log(acc)

    var accFunder = await stdlib.newTestAccounts(startingBalance)

    // const accPlayer_arr = await Promise.all(
    //     Array.from({ length: numberOfPlayersInGame}, ()=> 
    //       stdlib.newTestAccount(startingBalance)
    //     )
    //   );

    var ctcFunder = accFunder.contract(backend);
    var ctcInfo = ctcFunder.getInfo();

    var [funderAcc, ...accPlayer_arr ] = 
    await stdlib.newTestAccounts(numberOfPlayersInGame + 1, startingBalance);
        funderAcc.setDebugLabel('Funder');
        accPlayer_arr.forEach((acc, idx) => acc.setDebugLabel(`Player${idx}`));
        console.log("Accounts created!!!")
        console.log(accFunder.networkAccount)
    // console.log(`please show me the backend stuff ${getAddress()}`)
    // console.log(backend)
}else{
    const secret = await ask.ask(
        `What is your account secret?`,
        (x => x)
    );
    acc = await stdlib.newAccountFromSecret(secret);
}

var ctc = null;
var ctcInfo = null;

if(isFunder){
    ctc = accFunder.contract(backend);
    ctcInfo = ctc.getInfo();
    // ctc.getInfo().then((info) => {
    //     console.log(`The contract is deployed as = ${JSON.stringify(info)}`); });
    ctcInfo.then((info) => {
        console.log(`The contract is deployed as = ${JSON.stringify(info)}`); });
}else{
    const info = await ask.ask(
        `Please paste the contract information:`,
        JSON.parse
    );
    ctc = acc.contract(backend, info);
}

console.log(`${player} has entered the game...`);

const fmt = (x) => stdlib.formatCurrency(x, 4);
const getBalance = async () => fmt(await stdlib.balanceOf(playerOneAcc));

const before = await getBalance();
console.log(`Your balance is ${before}`);

const interact = { ...stdlib.hasRandom };
interact.playerNumber = numberOfPlayersInGame;

// await Promise.all([
//     backend.Player1(playerOneAcc, {

//     })
// ])
interact.informTimeout = () => {
    console.log(`There was a timeout.`);
    process.exit(1);
};
  

if(isFunder){
    const amount = await ask.ask(
        `How much do you want to wager?`,
        stdlib.parseCurrency
    );
    interact.wager = amount;
    console.log(`Show me the wager amount please: ${interact.wager}`)
    interact.deadline = { ETH: 100, ALGO: 100, CFX: 1000 }[stdlib.connector];

    await Promise.all([
        backend.Player1(ctc, {
            ...stdlib.hasRandom,
            coins: 2,
            hand: (() => ({first: 0, second: 0})),
            // reduceWager: Fun([UInt], UInt),
            // increaseWager: Fun([UInt], UInt),
            informTimeout: (()=> {
                console.log(`There was a timeout.`);
                process.exit(1);
            }),
            playerNumber: 1,
            wager: amount,
            deadline: numberOfPlayersCanJoinGame * 75,
        })
    ])
}else{
    interact.acceptWager = async (amt) => {
        const accepted = await ask.ask(
          `Do you accept the wager of ${fmt(amt)}?`,
          ask.yesno
        );
        if (!accepted) {
          process.exit(0);
        }
      };
}

// const part = isPlayerOne ? ctc.p.Player1
// await ctc.p.Player1(interact)
ask.done();