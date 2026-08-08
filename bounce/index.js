const balloon = document.getElementById('balloon');
const sky = document.getElementById('sky');
let x = 0;
let y = 0;
let speedX = 7;
let speedY = 10;

function moveBalloon() {
    balloon.style.left = `${x}px`;
    balloon.style.top = `${y}px`;
    x += speedX;
    y += speedY;
    if (x > sky.clientWidth - balloon.offsetHeight || x < 0) {
        if (x > 360) {
            x = 360;
        }
        if (x < 0) {
            x = 0;
        }
        speedX = -speedX;
        speedX = (speedX > 0 ? 1 : -1) * (Math.floor(Math.random() * 5) + 3);
    }
    if (y > sky.clientWidth - balloon.offsetHeight || y < 0) {
        if (y > 360) {
            y = 360;
        }
        if (y < 0) {
            y = 0;
        }
        speedY = -speedY;
        speedY = (speedY > 0 ? 1 : -1) * (Math.floor(Math.random() * 5) + 3);
    }
}

setInterval(moveBalloon, 30);