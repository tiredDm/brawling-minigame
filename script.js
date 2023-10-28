//for each winCounter.. Add Event Listener -> Event listner has div as a parameter, puts a 
const winCounters = document.querySelectorAll('.winCounter');
const leftSubmit = document.querySelector('.submit-button');
const rightSubmit = document.querySelector('.r-submit-button');
const container = document.querySelector('.container');
const actions =   document.querySelectorAll('.action');  


//Add Event Listeners to the winCounters..
//for(let i = 0; i < 10; i++){} Technically speaking if we do the math per turn we won't need this..

//STAT GRABBers..
const lS = document.querySelector('#str_modifier');
const lD = document.querySelector('#dex_modifier');
const lC = document.querySelector('#con_modifier');
const lAC = document.querySelector('#ac');
const rS = document.querySelector('#r_str_modifier');
const rD = document.querySelector('#r_dex_modifier');
const rC = document.querySelector('#r_con_modifier');
const rAC = document.querySelector('#r_ac');

let gameState = 0; //0 means no one has submitted, 1 means one person has, 2 means both has, and 3 means game over..

let lCurrentAction;
let rCurrentAction;

function addWin(points){
    //Have a version for Right and Left..
    winCounters[0].innerHTML = points;
}

//Action Event Listners..
for(let i = 0; i < 8; i++){
    actions[i].addEventListener('click', () => {
       selectAction(actions[i],i);
    });
}

//ActionSection Function
function selectAction(action, locationIndex){
    if(locationIndex < 4){
        for(let i = 0; i < 4; i++){
            actions[i].classList.remove('selected');
        }
        action.classList.add('selected');
        lCurrentAction = locationIndex;
        console.log(lCurrentAction);
    } else {
        for(let i = 4; i < 8; i++){
            actions[i].classList.remove('selected');
        }
        action.classList.add('selected');
        rCurrentAction = locationIndex;
        console.log(rCurrentAction);
    }
}


/**SUBMIT EVENT LISTNERS */
leftSubmit.addEventListener('click', () => {
    processSubmit(leftSubmit);
});

rightSubmit.addEventListener('click', () => {
    processSubmit(rightSubmit);
});

function processSubmit(submitter){
    //Collect all Document Elements
    let r_roll1 = document.querySelector('#r_roll_one');
    let r_roll2 = document.querySelector('#r_roll_two');
    let r_roll3 = document.querySelector('#r_roll_three');
    let l_roll1 = document.querySelector('#roll_one');
    let l_roll2 = document.querySelector('#roll_two');
    let l_roll3 = document.querySelector('#roll_three');


    if(submitter.classList.contains('r-submit-button')) {
        console.log('Right button Pressed');
        //Creat Game Wait Element..
        let waitScreenRight = document.createElement('div'); 
        waitScreenRight.classList.add('waitScreenRight');
        waitScreenRight.innerHTML='Please Wait for the Other Player to Finish';
        container.appendChild(waitScreenRight);
        
        console.log(r_roll1.value, r_roll2.value, r_roll3.value);

    } else {
        console.log('Left button Pressed');    
        //Creat Game Wait Element..
        let waitScreenLeft = document.createElement('div'); 
        waitScreenLeft.classList.add('waitScreenLeft');
        waitScreenLeft.innerHTML='Please Wait for the Other Player to Finish';
        container.appendChild(waitScreenLeft);    
        console.log(l_roll1.value, l_roll2.value, l_roll3.value);
    }
    gameState += 1;
    if(gameState % 2 == 0){
        let allRolls = [l_roll1.value, r_roll1.value, l_roll2.value, r_roll2.value, l_roll3.value, r_roll3.value];
        evaluateRound(allRolls);
        //CLear all Roll Areas
        r_roll1.value='';
        r_roll2.value='';
        r_roll3.value='';
        l_roll1.value='';
        l_roll2.value='';
        l_roll3.value='';
    }

}

function evaluateRound(rolls){ //input array of values... then for each value do shit.. have the six roll as parameters.. then create a loop over each.. in which you order divs made and inputs..
    console.log('Pizza Time');
    
    //POINT COUNTERS
    let lPT = 0;
    let rPT = 0;

    /* ADDING THE POPUP */
    let endOfRoundScreen = document.createElement('div');
    endOfRoundScreen.classList.add('endOfRound');
    
    //Modifiers..
    let lBonus = 0;
    let rBonus = 0;

    switch(lCurrentAction){
        case 0: 
            lBonus = Number(lS.value);
            break; 
        case 1:
            lBonus = Number(lD.value);
            break;
        case 2: 
            lBonus = Number(lC.value);
    }

    switch(rCurrentAction%4){
        case 0: 
            rBonus = Number(rS.value);
            break; 
        case 1:
            rBonus = Number(rD.value);
            break;
        case 2: 
            rBonus = Number(rC.value);
    }

    console.log(lBonus);
    console.log(rBonus);

    //calculate who has.. the advantage/ proficiney..
    if(lCurrentAction == '3' || rCurrentAction == '7' || rCurrentAction == lCurrentAction){
        //No advantage don't add proficieny...
    } else {
        //we figure out who the person with the advantage... and add it to the "bonus modifier"
        //Strong > Defensive | Fast > Strong | Defensive > Fast
        if(Number(lCurrentAction) == (Number(rCurrentAction)%4)+1 || (lCurrentAction == 0 && (Number(rCurrentAction)%4) == 2)){
            lBonus += 2;
        } else if ((Number(rCurrentAction)%4) == (Number(lCurrentAction))+1 || (lCurrentAction == 2 && Number(rCurrentAction) == 4)) {
            rBonus += 2;
        }

    }   

    /**Filling Up the Popup with Roll Calcuations--------------------------------- */
    for(let i = 0; i < 6; i++){
        
        
        let points = document.createElement('div');
        if(rolls[i] == '20'){
            points.innerHTML = '1';
        } else {
            points.innerHTML = '0';
        }
        let roll = document.createElement('div');
        roll.innerHTML = rolls[i];

        if(i%2 == 0){
            roll.innerHTML = Number(roll.innerHTML) + lBonus; 
            endOfRoundScreen.appendChild(points);
            endOfRoundScreen.appendChild(roll) ;
            lPT += Number(points.innerHTML);
        } else {
            roll.innerHTML = Number(roll.innerHTML) + rBonus;
            endOfRoundScreen.appendChild(roll);
            endOfRoundScreen.appendChild(points);
            rPT += Number(points.innerHTML);
        }
    }

    /**TALLYING UP TOTALS.. --------------------------------1.2.3.4.*/
    let lRollTotal = document.createElement('div');
    let lPointTotal = document.createElement('div');
    let rRollTotal = document.createElement('div');
    let rPointTotal = document.createElement('div');

    //rtv is Roll Total Value
    let lRTV = Number(rolls[0])+Number(rolls[2])+Number(rolls[4]) + (Number(lBonus)*3);
    let rRTV = Number(rolls[1]) + Number(rolls[3]) + Number(rolls[5]) + (Number(rBonus)*3) ;
    lRTV -= rAC.value;
    rRTV -= lAC.value;

    if(lRTV > rRTV){
        lPT += Math.floor((lRTV - rRTV)/10);
    } else {
        rPT += Math.floor((rRTV - lRTV)/10);
    }

    lRollTotal.innerHTML =  lRTV;
    lPointTotal.innerHTML = lPT;
    rRollTotal.innerHTML =  rRTV;
    rPointTotal.innerHTML = rPT;
    
    endOfRoundScreen.appendChild(lPointTotal);
    endOfRoundScreen.appendChild(lRollTotal);
    endOfRoundScreen.appendChild(rRollTotal);
    endOfRoundScreen.appendChild(rPointTotal);
    


    let endRoundButton = document.createElement('button')
    endRoundButton.innerHTML = 'End Round'
    endRoundButton.addEventListener('click', () => {
        finalizeRound(lPointTotal.innerHTML, rPointTotal.innerHTML);
    });

    //Populate End Of Round POPUP..
    let con_save = 'Con Save: ';
    
    if(rPT < lPT){
        con_save += 10+(3*lPT); 
    } else{
        con_save += 10+(3*rPT);
    }

    let con_save_div = document.createElement('div');
    con_save_div.innerHTML = con_save;

    endOfRoundScreen.appendChild(con_save_div);
    endOfRoundScreen.appendChild(endRoundButton);
    container.appendChild(endOfRoundScreen);
}

function finalizeRound(leftPointTotal, rightPointTotal){
    console.log('RoundFinalized');
    /* Checks if Game Is Over */
   

    /* Adds Points for the Rounds onto the windows */
    winCounters[(gameState/2)-1].innerHTML = leftPointTotal
    winCounters[10-(gameState/2)].innerHTML = rightPointTotal
    /* Removes popups */
    container.removeChild(container.lastChild);
    container.removeChild(container.lastChild);
    container.removeChild(container.lastChild);

    if(gameState == 10){
        endGame();
    }
}

function endGame(){
    console.log('Game Over Bro')
    let endOfGameScreen = document.createElement('div');
    endOfGameScreen.classList.add('endOfGame');
    endOfGameScreen.innerHTML = 'GAME OVER: '
    
    let left = 0;
    let right = 0;
    for(let i = 0; i < 5; i++){
        left += Number(winCounters[i].innerHTML);
    }
    for(let i = 5; i < 10; i++){
        right += Number(winCounters[i].innerHTML);
    }

    endOfGameScreen.innerHTML += left + ' vs ' + right; 
    container.appendChild(endOfGameScreen);
}

