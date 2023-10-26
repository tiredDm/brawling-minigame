//for each winCounter.. Add Event Listener -> Event listner has div as a parameter, puts a 
const winCounters = document.querySelectorAll('.winCounter');

//Add Event Listeners to the winCounters..
//for(let i = 0; i < 10; i++){} Technically speaking if we do the math per turn we won't need this..

function addWin(){
    //Have a version for Right and Left..
    winCounters[0].innerHTML = 'X';
}