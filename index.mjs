import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib();

const startingBalance = stdlib.parseCurrency(100);
const accAlice = await stdlib.newTestAccount(startingBalance);
const accBob = await stdlib.newTestAccount(startingBalance);

const fmt = (x) => stdlib.formatCurrency(x, 4);//formats currency up to 4 decimal places 
const getBalance = async (who) => fmt(await stdlib.balanceOf(who)); //helpful function for getting the balance of a participant and displaying it with up to 4 decimal places.
const beforeAlice = await getBalance(accAlice);//get the balance before the game starts for both Alice and Bob
const beforeBob = await getBalance(accBob);//get the balance before the game starts for both Alice and Bob
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());

const HAND = ['Rock', 'Paper', 'Scissors'];
const OUTCOME = ['Bob wins', 'Draw', 'Alice wins'];

const Player = (Who) => ({
    ...stdlib.hasRandom,
    getHand: () => {
        const hand = Math.floor(Math.random() * 3);
        console.log(`${Who} played ${HAND[hand]}`)
        return hand;
    },
    seeOutcome: (outcome) =>{
        console.log(`${Who} saw outcome ${OUTCOME[outcome]}`)
    },
    informTimeout: () =>{
        console.log(`${Who} observed a timeout`)
    },
});


await Promise.all([
    ctcAlice.p.Alice({
        ...Player('Alice'),
        wager: stdlib.parseCurrency(5),
        deadline: 10,
    }),
    ctcBob.p.Bob({
        ...Player('Bob'),
        acceptWager: async (amt) =>{
            if(Math.random() <= 0.5){
                for(let i = 0; i < 10; i++){
                    console.log(`Bob takes hist sweet time...`);
                    await stdlib.wait(1);
                }
            }else{
                console.log(`Bob accepts the wager of ${fmt(amt)}.`)
            }
        },
    }),
]);

const afterAlice = await getBalance(accAlice);
const afterBob = await getBalance(accBob);//Lines 44 and 45 get the balances afterwards

console.log(`Alice went from ${beforeAlice} to ${afterAlice}.`)
console.log(`Bob went from ${beforeBob} to ${afterBob}`)