'reach 0.1'

const [isDead, NOTHING, DUKE, ASSASSIN, AMBASSADOR, CAPTAIN, CONTESSA] = makeEnum(6);
const [isAction, INCOME, FOREIGN, COUP, TAX, ASSASSINATE, EXCHANGE, STEAL] = makeEnum(7);
const [isCounterAction, BLOCK_FOREIGN_AID, BLOCK_STEALING_COINS, BLOCK_ASSASSINATION] = makeEnum(3);
//Make every move an enum

const TOTAL_COINS = 50;
const CARDS = 15;
const CARD_SET = [
    {DUKE: 3},
    {ASSASSIN: 3},
    {AMBASSADOR: 3},
    {CAPTAIN: 3},
    {CONTESSA: 3},
]

const PlayerHand = Object({
    first : UInt,
    second : UInt
});

const Common = {
    takeIncome: Fun([UInt], UInt),//Take 1 coin from the treasury
    takeForeignAid: Fun([UInt], UInt),//Take 2 coins from the treasury
    throwCoup: Fun([UInt], UInt),//Pay 7 coins and choose Player to lose
}

const Player = {
    /**
     * This interface is for when the player is done playing on their turn
     * for reducing the wager or increasing the wager depending on how their turn
     * went.
     */
    ...hasRandom,
    coins: UInt,
    // wager: UInt,
    hand: Fun([], PlayerHand),
    // reduceWager: Fun([UInt], UInt),
    // increaseWager: Fun([UInt], UInt),
    informTimeout: Fun([], Null),
    playerNumber: UInt,
}


const characterActions = (who) => {
    if(who == DUKE){
        //Tax
    }else if(who == ASSASSIN){
        //Assassin
    }else if(who == AMBASSADOR){
        //Exchange
    }else if(who == CAPTAIN){
        //Steal
    }else if(who == CONTESSA){
        //No Action
    }
}

const player_hand = {first: NOTHING, second: NOTHING}

export const main = Reach.App(() => {
    const Funder = Participant('Funder', {
        wager: UInt,
        numOfPlayers: UInt,
    });
    const Player1 = Participant('Player1', {
        ...Common,
        ...Player,
        // wager: UInt,
        deadline: UInt,
        acceptWager: Fun([UInt], Null),
    });
    const Player2 = Participant('Player2', {
        ...Common,
        ...Player,
        // wager: UInt,
        acceptWager: Fun([UInt], Null),
    });
    // const Player3 = Participant('Player3', {
    //     ...Common,
    //     ...Player,
    //     acceptWager: Fun([UInt], Null),
    // });
    // const Player4 = Participant('Player4', {
    //     ...Common,
    //     ...Player,
    //     acceptWager: Fun([UInt], Null),
    // });
    // const Player5 = Participant('Player5', {
    //     ...Common,
    //     ...Player,
    //     acceptWager: Fun([UInt], Null),
    // });
    // const Player6 = Participant('Player6', {
    //     ...Common,
    //     ...Player,
    //     acceptWager: Fun([UInt], Null),
    // });
    init();
    

    Funder.only(() => {
        const wager = declassify(interact.wager)
        const numOfPlayers = declassify(interact.numOfPlayers)
    })

    Funder.publish(wager, numOfPlayers)
    commit()

    // Player1.publish()
    // commit()

    Player1.only(() => {
        interact.acceptWager(wager)
        // const wager = declassify(interact.wager);//Line 20 has Alice declassify the wager for transmission
        // // console.log(`please show me the wager that's stored here: ${wager}`)
        // const deadline = declassify(interact.deadline);
    });
    // Player1.publish(wager, deadline)
    // // .pay(wager)
    // commit();
    

    // unknowable(Player2, Player1());
    Player2.only(()=>{
        interact.acceptWager(wager);
    })
    // Player1.publish(wager);
    // // .pay(wager);
    // commit();
    // Player2.only(() => {
    //     interact.acceptWager(wager)
    // })
    // // Player2.publish(); 
    // Player2.pay(wager)

    // var [ i ] = [ 0 ];
    // invariant(balance() == 0);
    // while(true){
    //     commit();
    //     Player1.only(() => {
    //         const wager = declassify(interact.wager);
    //         const ctc = declassify(interact.getCtc())
    //     });
    //     Player1.publish(ctc, wager);

    //     // console.log(`show me the announcement please: ${ctc}`)
    //     E.announce(i, ctc);
    //     // [ i ] = [ i + 1 ];
    //     continue;
    // }

    // commit();
    // Player3.only(() => {
    //     interact.acceptWager(wager)
    // })
});