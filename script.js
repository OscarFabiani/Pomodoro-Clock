
//SETTING VARIABLES
const breakDecrement = document.getElementById('break-decrement');
const breakIncrement = document.getElementById('break-increment');
const breakLength = document.getElementById('break-length');
const sessionDecrement = document.getElementById('session-decrement');
const sessionIncrement = document.getElementById('session-increment');
const sessionLength = document.getElementById('session-length');
const timerLabel = document.getElementById('timer-label');
const timeLeft = document.getElementById('time-left');
const startStop = document.getElementById('start_stop');
const reset = document.getElementById('reset');
const beep = document.getElementById('beep');


let breakLengthVal = Number(breakLength.textContent);
let sessionLengthVal = Number(sessionLength.textContent);

let minsLeft = Number(timeLeft.textContent.match(/\d+/));
let secsLeft = Number(timeLeft.textContent.match(/(?<=:)\d+/));


//ADDING EVENT LISTENERS
breakDecrement.addEventListener('click', subtractBreak);
breakIncrement.addEventListener('click', addBreak);
sessionDecrement.addEventListener('click', subtractSession);
sessionIncrement.addEventListener('click', addSession);
startStop.addEventListener('click', toggleTimer);
reset.addEventListener('click', resetTimer);


let intervalID;
let paused = true;

resetTimer();


//FUNCTIONS

function subtractBreak() {
  if (paused == true && breakLengthVal > 1) {
    breakLengthVal--;
    breakLength.textContent = breakLengthVal;
    if (timerLabel.textContent == 'Break') {
      minsLeft = breakLengthVal;
      secsLeft = 0;
      if (minsLeft < 10) {
        timeLeft.textContent = '0' + minsLeft + ':00';
      }
      else {
        timeLeft.textContent = minsLeft + ':00';
      }
    }
  }
}

function addBreak() {
  if (paused == true && breakLengthVal < 60) {
    breakLengthVal++;
    breakLength.textContent = breakLengthVal;
    if (timerLabel.textContent == 'Break') {
      minsLeft = breakLengthVal;
      secsLeft = 0;
      if (minsLeft < 10) {
        timeLeft.textContent = '0' + minsLeft + ':00';
      }
      else {
        timeLeft.textContent = minsLeft + ':00';
      }
    }
  }
}

function subtractSession() {
  if (paused == true && sessionLengthVal > 1) {
    sessionLengthVal--;
    sessionLength.textContent = sessionLengthVal;
    if (timerLabel.textContent == 'Session') {
      minsLeft = sessionLengthVal;
      secsLeft = 0;
      if (minsLeft < 10) {
        timeLeft.textContent = '0' + minsLeft + ':00';
      }
      else {
        timeLeft.textContent = minsLeft + ':00';
      }   
    }
  }
}

function addSession() {
  if (paused == true && sessionLengthVal < 60) {
    sessionLengthVal++;
    sessionLength.textContent = sessionLengthVal;
    if (timerLabel.textContent == 'Session') {
      minsLeft = sessionLengthVal;
      secsLeft = 0;
      if (minsLeft < 10) {
        timeLeft.textContent = '0' + minsLeft + ':00';
      }
      else {
        timeLeft.textContent = minsLeft + ':00';
      }
    }
  }
}

function runTimer() {
  secsLeft--;
  if (minsLeft == 0 && secsLeft == -1) {
    console.log('swapped');
    swapBreak();
  }
  else if (secsLeft == -1) {
    minsLeft--;
    secsLeft = 59;
    if (minsLeft < 10) {
      timeLeft.textContent = '0' + minsLeft + ':' + secsLeft;
    }
    else {
      timeLeft.textContent = minsLeft + ':' + secsLeft;
    }
  }
  else if (secsLeft < 10) {
    if (minsLeft < 10) {
      timeLeft.textContent = '0' + minsLeft + ':0' + secsLeft;
    }
    else {
      timeLeft.textContent = minsLeft + ':0' + secsLeft;
    }
  }
  else {
    if (minsLeft < 10) {
      timeLeft.textContent = '0' + minsLeft + ':' + secsLeft;
    }
    else {
      timeLeft.textContent = minsLeft + ':' + secsLeft;
    }
  }
}

function toggleTimer() {
  if (paused == true) {
    paused = false;
    intervalID = setInterval(runTimer, 50);
  }
  else {
    paused = true;
    clearInterval(intervalID);
  }
}

function resetTimer() {
  if (paused == false) {
    paused = true;
    clearInterval(intervalID);
  }
  timerLabel.textContent = 'Session';
  minsLeft = 1;
  secsLeft = 0;
  breakLengthVal = 2;
  breakLength.textContent = breakLengthVal;
  sessionLengthVal = 1;
  sessionLength.textContent = sessionLengthVal;
  if (minsLeft < 10) {
    timeLeft.textContent = '0' + minsLeft + ':00';
  }
  else {
    timeLeft.textContent = minsLeft + ':00';
  }
  beep.pause();
  beep.currentTime = 0;
}

function swapBreak() {
  beep.play();
  if (timerLabel.textContent == 'Session') {
    console.log('timer-label set to Break');
    timerLabel.textContent = 'Break';
    minsLeft = breakLengthVal;
  }
  else {
    console.log('timer-label set to Session');
    timerLabel.textContent = 'Session';
    minsLeft = sessionLengthVal;
  }
  secsLeft = 0;
  if (minsLeft < 10) {
    timeLeft.textContent = '0' + minsLeft + ':00';
  }
  else {
    timeLeft.textContent = minsLeft + ':00';
  }
}


//REFACTOR CODE AND ADD STYLING