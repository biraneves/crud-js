const cv = document.getElementById("cv");
const ctx = cv.getContext("2d");

const pos = [50, 50];
const speed = [40, 60];
const sizeX = 600;
const sizeY = 300;
let lastTime;

function draw(time) {

    if (!lastTime) {
        lastTime = time;
    } 

    const ellapsedTime = (time - lastTime) / 1000;  // time in seconds
    lastTime = time;

    pos[0] += ellapsedTime * speed[0];
    pos[1] += ellapsedTime * speed[1];

    pos[0] = pos[0] >= sizeX ? pos[0] % sizeX : pos[0];
    pos[1] = pos[1] >= sizeY ? pos[1] % sizeY : pos[1];

    ctx.clearRect(0, 0, sizeX,sizeY);
    
    ctx.fillStyle = "rgb(0, 80, 120)";
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], 20, 0, 2 * Math.PI, true);
    ctx.fill();

    requestAnimationFrame(draw);

}

requestAnimationFrame(draw);