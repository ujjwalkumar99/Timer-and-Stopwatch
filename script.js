let timerInterval;
let stopwatchInterval;
let timerMilliseconds = 0;
let stopwatchSeconds = 0;
let stopwatchRecords = [];

function formatTimeWithMilliseconds(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millisecondsDisplay = (milliseconds % 1000).toString().padStart(3, '0');

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${millisecondsDisplay.slice(0, 2)}`;
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  const timerDisplay = document.getElementById('timer-display');
  timerDisplay.textContent = formatTimeWithMilliseconds(timerMilliseconds);
}

function updateStopwatchDisplay() {
  const stopwatchDisplay = document.getElementById('stopwatch-display');
  stopwatchDisplay.textContent = formatTime(stopwatchSeconds);
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timerMilliseconds += 10; // Increase milliseconds every 10ms for higher accuracy
    updateTimerDisplay();
  }, 10);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerMilliseconds = 0;
  updateTimerDisplay();
}

function startStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = setInterval(() => {
    stopwatchSeconds += 1; // Increase seconds every 1000ms
    updateStopwatchDisplay();
  }, 1000);
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
}

function stopStopwatch() {
  pauseStopwatch();
  if (stopwatchSeconds > 0) {
    stopwatchRecords.push(formatTime(stopwatchSeconds));
    if (stopwatchRecords.length > 5) {
      stopwatchRecords.shift();
    }
    const last5List = document.getElementById('last-5-times');
    last5List.innerHTML = ''; // Clear the list first
    stopwatchRecords.forEach((time) => {
      const listItem = document.createElement('li');
      listItem.textContent = time;
      last5List.appendChild(listItem);
    });
  }
  stopwatchSeconds = 0;
  updateStopwatchDisplay();
}

function resetStopwatch() {
  pauseStopwatch();
  stopwatchSeconds = 0;
  updateStopwatchDisplay();
}

updateTimerDisplay();
updateStopwatchDisplay();


function getRandomColor() {
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  document.body.style.backgroundColor = randomColor;
}

setInterval(getRandomColor, 0.5);
