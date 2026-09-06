const grid = document.getElementById('grid-container');

function createMoleHole(container) {
    const element = document.createElement('div');
    element.className = 'mole-hole';
    element.textContent = '🕳️';
    container.appendChild(element);

    let isVisible = false;
    let isWhacked = false;

    const controller = {
        shuffle: function () {
            isWhacked = false;
            isVisible = Math.random() < 0.5;
            if (isVisible) {
                element.textContent = '🐹';
            } else {
                element.textContent = '🕳️';
            }
        },
        whack: function () {
            if (isWhacked) {
                return 0;
            }
            isWhacked = true;
            if (isVisible) {
                element.textContent = '💥';
                isVisible = false;
                element.dispatchEvent(new CustomEvent('mole:whacked', {
                    bubbles: true,
                    detail: { points: 10 }
                }));
                return 10;
            } else {
                element.dispatchEvent(new CustomEvent('mole:whacked', {
                    bubbles: true,
                    detail: { points: -5 }
                }));
                return -5;
            }
        },
        isUp: function () {
            return isVisible;
        }
    };

    element.addEventListener('click', function () {
        controller.whack();
    });

    return controller;
}

const moleControllers = [];
for (let i = 0; i < 6; i++) {
    moleControllers.push(createMoleHole(grid));
}

const shuffleBtn = document.getElementById('shuffle-btn');
shuffleBtn.addEventListener('click', function () {
    moleControllers.forEach(function (controller) {
        controller.shuffle();
    });
});

let score = 0;
let swings = 5;
const hud = document.getElementById('hud-display');

grid.addEventListener('mole:whacked', function (event) {
    score += event.detail.points;
    hud.textContent = 'Score: ' + score + ' | Swings: ' + swings;
});

const sweepBtn = document.getElementById('sweep-btn');

sweepBtn.addEventListener('click', function () {
    if (swings <= 0) {
        return;
    }
    swings--;
    moleControllers.forEach(function (controller) {
        controller.whack();
    });
    hud.textContent = 'Score: ' + score + ' | Swings: ' + swings;
});