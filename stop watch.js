 // stopwatch
let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const lapsList = document.getElementById('lapsList');

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pause();
    } else {
        start();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function start() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTime, 10);
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    lapBtn.disabled = false;
    resetBtn.disabled = true;
}


function pause() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = Date.now() - startTime;
    startPauseBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = false;
}
function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay(0, 0, 0);
    startPauseBtn.textContent = 'Start';
    lapsList.innerHTML = '';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.childElementCount + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
}
function updateTime() {
    elapsedTime = Date.now() - startTime;
    const [minutes, seconds, milliseconds] = formatTime(elapsedTime).split(':');
    updateDisplay(minutes, seconds, milliseconds);
}
function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}
function updateDisplay(minutes, seconds, milliseconds) {
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    millisecondsEl.textContent = milliseconds;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}
