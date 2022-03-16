'reach 0.1'

const [isDead, DUKE, ASSASSIN, AMBASSADOR, CAPTAIN, CONTESSA] = makeEnum(5);
const [isAction, INCOME, FOREIGN, COUP, TAX, ASSASSINATE, EXCHANGE, STEAL] = makeEnum(7);
//Make every move an enum 

const playerToLose = (playerToKill) => playerToKill % 5;

const Player = {
    getIncome: Fun([UInt], Null),//Take 1 coin from the treasury
    getForeignAid: Fun([UInt], Null),//Take 2 coins from the treasury
    throwCoup: Fun([UInt], UInt),//Pay 7 coins and choose Player to lose
}

const characterActions = (who) => {

    if(who.toLower() == "duke"){
        //Tax
    }else if(who.toLower() == "assassin"){
        //Assassin
    }else if(who.toLower() == "ambassador"){
        //Exchange
    }else if(who.toLower() == "captain"){
        //Steal
    }else if(who.toLower() == "contessa"){
        //No Action
    }
}

const dukeAction = () =>{

    return "";
}


export const main = Reach.App(() => {
    const Player1 = Participant('Player1', {
        ...Player,
        wager: UInt,
    });
    const Player2 = Participant('Player2', {
        ...Player,
        wager: UInt,
    });
    const Player3 = Participant('Player3', {
        ...Player,
        wager: UInt,
    });
    init();
});