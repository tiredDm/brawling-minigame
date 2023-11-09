function createPlayer (strength, dexterity, constitution, armorClass) {
    const str = strength;
    const dex = dexterity;
    const con = constitution;
    const ac = armorClass;
    let points = 0;
    let fS = 0; //failedSaves..
    let currentAction = 0; //0,1,2,3,4
    let roundPoints = {};
    const statToMod = (stat) => Math.floor((stat-10)/2); 
    let currentRolls = [];
    const inputRolls = (roll1, roll2, roll3) => {
        currentRolls = [];
        currentRolls.add(roll1);
        currentRolls.add(roll2);
        currentRolls.add(roll3);
    };
    return  { str, dex, con, ac, fS, statToMod, currentAction, roundPoints , currentRolls, inputRolls, points}
}

function createGame (leftPlayer, rightPlayer) {
    const printName = () => console.log('Pizza');
    let roundCounter = 0;

    const startRound = (leftPlayer, rightPlayer) => {
        
        for(let i = 0; i < 3; i++){

        }
        
        let difference = 0;
        let loser = leftPlayer;
        let conSave = 10 + (difference*3) +(leftPlayer.fS*3);
        return [conSave, loser] ; //important outputs
    };

    const checkSave = (save, roll, player) => {
        if(save > roll) {
            player.fS++;
        }
        roundCounter++;
        if(roundCounter >= 5) {
            endGame();
        };
    };

    const endGame = () => {

    };

    return {printName , startRound, checkSave};
}

let leftPlayer = createPlayer(15, 15, 15, 12);
let rightPlayer = createPlayer(16, 12, 15, 12);
const game = createGame(leftPlayer, rightPlayer);   
// then keep playin rounds..
export { game };