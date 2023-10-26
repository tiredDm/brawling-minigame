//for each winCounter.. Add Event Listener -> Event listner has div as a parameter, puts a 
const winCounters = document.querySelectorAll('.winCounter');
const leftSubmit = document.querySelector('.submit-button');
const rightSubmit = document.querySelector('.r-submit-button');
const container = document.querySelector('.container');
//Add Event Listeners to the winCounters..
//for(let i = 0; i < 10; i++){} Technically speaking if we do the math per turn we won't need this..

let gameState = 0; //0 means no one has submitted, 1 means one person has, 2 means both has, and 3 means game over..

let lCurrentAction;
let rCurrentAction;

function addWin(points){
    //Have a version for Right and Left..
    winCounters[0].innerHTML = points;
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
        evaluateRound();
        //CLear all Roll Areas
        r_roll1.value='';
        r_roll2.value='';
        r_roll3.value='';
        l_roll1.value='';
        l_roll2.value='';
        l_roll3.value='';
    }

}

function evaluateRound(){ //input array of values... then for each value do shit.. have the six roll as parameters.. then create a loop over each.. in which you order divs made and inputs..
    console.log('Pizza Time');




    /* ADDING THE POPUP */
    let endOfRoundScreen = document.createElement('div');
    endOfRoundScreen.classList.add('endOfRound');
    
    
    let endRoundButton = document.createElement('button')
    endRoundButton.innerHTML = 'End Round'
    endRoundButton.addEventListener('click', () => {
        finalizeRound();
    });

    //Populate End Of Round POPUP..
    let div = document.createElement('div');
    div.innerHTML = '0';

    endOfRoundScreen.appendChild(div);
    endOfRoundScreen.appendChild(endRoundButton)
    container.appendChild(endOfRoundScreen);
}

function finalizeRound(){
    console.log('RoundFinalized');
    if(gameState == 10){
        endGame();
    }
    container.removeChild(container.lastChild);
    container.removeChild(container.lastChild);
    container.removeChild(container.lastChild);
}

function endGame(){
    console.log('Game Over Bro')
}

