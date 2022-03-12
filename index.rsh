'reach 0.1';

const Player = {
    getHand: Fun([], UInt), //returns a number
    seeOutcome: Fun([UInt], Null),//receives a number
};

export const main = Reach.App(() => {
  const Alice = Participant('Alice', {
    ...Player,
  });
  const Bob = Participant('Bob', {
    ...Player,
  });
  init();

  Alice.only(() => {
      const handAlice = declassify(interact.getHand());
  });
  Alice.publish(handAlice);
  commit();

  Bob.only(()=>{
      const handBob = declassify(interact.getHand());
  });
  Bob.publish(handBob);

  const outcome = (handAlice + (4 - handBob)) % 3;
  commit();

  each([Alice, Bob], ()=>{ //Line 31 states that this is a local step that each of the participants performs
      interact.seeOutcome(outcome);
  })
});
 