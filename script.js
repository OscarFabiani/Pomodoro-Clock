const breakLength = document.getElementById('break-length');
let breakLengthVal = Number(breakLength.textContent);

const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');


function subtractBreak() {
  if (breakLengthVal > 1) {
    breakLengthVal--;
    breakLength.textContent = breakLengthVal;
  }
}

function addBreak() {
  if (breakLengthVal < 60) {
    breakLengthVal++;
    breakLength.textContent = breakLengthVal;
  }
}

breakDecrement.addEventListener('click', subtractBreak);
breakIncrement.addEventListener('click', addBreak);

const sessionLength = document.getElementById('session-length');
let sessionLengthVal = Number(sessionLength.textContent);

const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');

function subtractSession() {
  if (paused == true && sessionLengthVal > 1) {
    sessionLengthVal--;
    sessionLength.textContent = sessionLengthVal;
    minsLeft = sessionLengthVal;
    secsLeft = 0;
    timeLeft.textContent = minsLeft + ':00';

  }
}

function addSession() {
  if (paused == true && sessionLengthVal < 60) {
    sessionLengthVal++;
    sessionLength.textContent = sessionLengthVal;
    minsLeft = sessionLengthVal;
    secsLeft = 0;
    timeLeft.textContent = minsLeft + ':00';
  }
}

sessionDecrement.addEventListener('click', subtractSession);
sessionIncrement.addEventListener('click', addSession);



const timeLeft = document.getElementById('time-left');
let minsLeft = Number(timeLeft.textContent.match(/\d+/));
let secsLeft = Number(timeLeft.textContent.match(/(?<=:)\d+/));

console.log(minsLeft);
console.log(secsLeft);

function subtract1() {
  secsLeft--;
  //if minsLeft and secsLeft == 0 (do stuff)
  if (secsLeft == -1) {
    minsLeft--;
    secsLeft = 59;
    timeLeft.textContent = minsLeft + ':' + secsLeft;
  }
  else if (secsLeft < 10) {
    timeLeft.textContent = minsLeft + ':0' + secsLeft;
  }
  else {
    timeLeft.textContent = minsLeft + ':' + secsLeft;
  }
}

let intervalID;// = setInterval(subtract1, 100);

const startStop = document.getElementById('start_stop');

let paused = true;

function toggleTimer() {
  console.log(paused);
  if (paused == true) {
    paused = false;
    console.log(paused);
    intervalID = setInterval(subtract1, 100);
  }
  else {
    paused = true;
    clearInterval(intervalID);
  }
}


startStop.addEventListener('click', toggleTimer);

const reset = document.getElementById('reset');

function resetTimer() {
  if (paused == false) {
    paused = true;
    clearInterval(intervalID);
  }
  minsLeft = 25;
  secsLeft = 0;
  timeLeft.textContent = minsLeft + ':00';
  breakLengthVal = 5;
  breakLength.textContent = breakLengthVal;
  sessionLengthVal = 25;
  sessionLength.textContent = sessionLengthVal;
}

reset.addEventListener('click', resetTimer);


//CREATE REPOSITORY AND CONTINUE USER STORIES