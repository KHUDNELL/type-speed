const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
var textArray = ["The quick brown fox jumped over the lazy dog", "Now is the time for all good men to come to the aid of their country.",
"That herd of bison seems to be moving quickly; does that seem normal to you?",
"You can lead a horse to water but you can't make him drink."];

const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var random = Math.floor(Math.random() * 4);

var originText = document.querySelector("#origin-text p").innerHTML= textArray[random];
var timer = [0,0,0,0];
var interval;
var timerRunning = false;

function randomize() {
    random = Math.floor(Math.random() * 4);
    originText = document.querySelector("#origin-text p").innerHTML = textArray[random];
}



// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if (time <= 9) {
        time="0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100)-(timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0]*6000));

}
// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if (textEntered == originText){
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
        resetButton.focus();
    } else {
        if (textEntered == originTextMatch){
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
   
}

// Start the timer:
function start() {
    let textEnteredLength = testArea.value.length;
    
    if (textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    randomize();
    testArea.value= "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor= "grey";
    document.getElementById("test-area").focus();
}

document.getElementById("test-area").focus();
// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click",reset,false);