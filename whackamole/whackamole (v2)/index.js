let score = 0;
const scoreDisplay = document.getElementById('score');

function renderScore() {
    scoreDisplay.textContent = score;
}

window.addEventListener('game:hit', function () {
    score += 1;
    renderScore();
});

window.addEventListener('game:miss', function () {
    score -= 1;
    renderScore();
});

function createSlot(container) {
    let timerId = null;
    let isSleeping = true;
    const element = document.createElement('div');

    function wakeUp() {
        isSleeping = false;
        element.textContent = '😳';
        clearTimeout(timerId);
        timerId = setTimeout(function () {
            sleep();
        }, 2000);
    }

    function sleep() {
        isSleeping = true;
        element.textContent = '😴';
        clearTimeout(timerId);
        const randomDelay = Math.floor(Math.random() * 3000) + 2000;
        timerId = setTimeout(function () {
            wakeUp();
        }, randomDelay);
    }
    element.classList.add('slot');
    element.textContent = '😴'; // Start as a sleeping mole

    element.addEventListener('click', function () {
        if (!isSleeping) {
            window.dispatchEvent(new CustomEvent('game:hit'));
            sleep();
        } else {
            window.dispatchEvent(new CustomEvent('game:miss'));
        }
    });

    container.appendChild(element);
    sleep();
}

const board = document.getElementById('game-board');

for (let i = 0; i < 4; i++) {
    createSlot(board);
}

renderScore();