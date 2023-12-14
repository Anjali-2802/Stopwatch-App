let stopwatchInterval;
let isRunning = false;
let startTime;
let laps = [];

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - (laps.length > 0 ? laps.reduce((acc, lap) => acc + lap, 0) : 0);
        stopwatchInterval = setInterval(updateDisplay, 10);
        document.getElementById('startBtn').innerText = 'Pause';
    } else {
        isRunning = false;
        clearInterval(stopwatchInterval);
        document.getElementById('startBtn').innerText = 'Resume';
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(stopwatchInterval);
    document.getElementById('startBtn').innerText = 'Start';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    document.getElementById('milliseconds').innerText = '00';
    laps = [];
    updateLaps();
}

function recordLap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        laps.push(lapTime);
        updateLaps();
    }
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    document.getElementById('minutes').innerText = padNumber(minutes);
    document.getElementById('seconds').innerText = padNumber(seconds);
    document.getElementById('milliseconds').innerText = padNumber(milliseconds);
}

function padNumber(number) {
    return number < 10 ? '0' + number : number;
}

function updateLaps() {
    const lapsList = document.getElementById('laps');
    lapsList.innerHTML = '';

    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.classList.add('lap-item');
        lapItem.innerText = `Lap ${index + 1}: ${formatTime(lap)}`;
        lapsList.appendChild(lapItem);
    });
}

function formatTime(time) {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(milliseconds)}`;
}
