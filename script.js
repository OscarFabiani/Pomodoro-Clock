
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

let minsLeft;
let secsLeft;
let intervalID;
let paused = true;

//ADDING EVENT LISTENERS
breakDecrement.addEventListener('click', subtractBreakLength);
breakIncrement.addEventListener('click', addBreakLength);
sessionDecrement.addEventListener('click', subtractSessionLength);
sessionIncrement.addEventListener('click', addSessionLength);
startStop.addEventListener('click', toggleTimerActivity);
reset.addEventListener('click', resetClock);

//INITIALIZING
resetClock();


//FUNCTIONS

function setTime() {
  //Sets timeLeft based on minsLeft in MM:SS format.
  if (minsLeft < 10) {
    timeLeft.textContent = '0' + minsLeft + ':00';
  }
  else {
    timeLeft.textContent = minsLeft + ':00';
  }
}

function subtractLength(label, element) {
  //Decrements the textContent of an HTML element if timer is paused and updates the timer.
  if (paused == true && element.textContent > 1) {
    element.textContent--;
    if (timerLabel.textContent == label) {
      minsLeft = element.textContent;
      secsLeft = 0;
      setTime();
    }
  }
}

function addLength(label, element) {
  //Increments the textContent of an HTML element if timer is paused and updates the timer.
  if (paused == true && element.textContent < 60) {
    element.textContent++;
    if (timerLabel.textContent == label) {
      minsLeft = element.textContent;
      secsLeft = 0;
      setTime();
    }
  }
}

function subtractBreakLength() {
  //Event handler function for specific element.
  subtractLength('Break', breakLength);
}

function addBreakLength() {
  //Event handler function for specific element.
  addLength('Break', breakLength);
}

function subtractSessionLength() {
  //Event handler function for specific element.
  subtractLength('Session', sessionLength);
}

function addSessionLength() {
  //Event handler function for specific element.
  addLength('Session', sessionLength);
}

function runTimer() {
  //Decrements secsLeft then switches the timer mode if time is expired or sets the timer in MM:SS format according to the time remaining.
  secsLeft--;
  if (minsLeft == 0 && secsLeft == -1) {
    toggleTimerMode();
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

function toggleTimerMode() {
  //Switches the timer mode and plays an audio clip.
  secsLeft = 0;
  if (timerLabel.textContent == 'Session') {
    timerLabel.textContent = 'Break';
    minsLeft = breakLength.textContent;
  }
  else {
    timerLabel.textContent = 'Session';
    minsLeft = sessionLength.textContent;
  }
  setTime();
  beep.play();
}

function toggleTimerActivity() {
  //Pauses and resumes the timer.
  if (paused == false) {
    paused = true;
    clearInterval(intervalID);
  }
  else {
    paused = false;
    intervalID = setInterval(runTimer, 50);
  }
}

function resetClock() {
  //Pauses and resets the clock to default settings.
  if (paused == false) {
    paused = true;
    clearInterval(intervalID);
  }
  breakLength.textContent = 2;
  sessionLength.textContent = 1;
  minsLeft = 1;
  secsLeft = 0;
  timerLabel.textContent = 'Session';
  setTime();
  beep.pause();
  beep.currentTime = 0;
}


//FINISH STYLING: EXPERIMENT WITH ELIMINATING FLEX IN FAVOR OR TEXT-ALIGN AND ADD BUTTON HOVER+CLICK STYLING AND TIMER STYLING.