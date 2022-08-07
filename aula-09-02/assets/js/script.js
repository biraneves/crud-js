const clock = document.getElementById("clock");
const btn = document.getElementById("btn");
let interval;

function startClock() {

    clock.textContent = formatDate(new Date());

    interval = setInterval(() => {

        clock.textContent = formatDate(new Date());

    }, 1000);

    btn.textContent = "Stop clock";

}

function stopClock() {

    clearInterval(interval);
    interval = undefined;
    btn.textContent = "Start clock";

}

function startOrStop() {

    if (interval) {

        stopClock();

    } else {

        startClock();

    }

}

function formatDate(date) {

    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");

    return `${h}h ${m}min ${s}s`;

}

startClock();