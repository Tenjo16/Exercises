let heroPower = 5;
let isGameOver = false;
const display = document.getElementById('hero-power-display');
const message = document.getElementById('message');
const reset = document.getElementById('reset-btn');
tower = document.getElementById('tower-container');

function updateHeroUI() {
    display.textContent = heroPower;
}

document.addEventListener('combat:victory', function (event) {
    console.log('Victory event caught:', event.detail);
    heroPower += event.detail.monsterPower;
    updateHeroUI();
    if (heroPower >= 52) {
        message.textContent = 'Mission Cleared!';
    }
});
document.addEventListener('combat:defeat', function (event) {

    console.log('Defeat event caught:', event.detail);
});

function createTowerRoom(container, monsterType, monsterPower) {
    let power = monsterPower;
    let isCleared = false;
    const card = document.createElement('div');
    card.className = 'room-card';
    card.innerHTML =
        `<div id='monsters'>
        <h3>Monster: ${monsterType}</h3>
        <p>Power: ${power}
        <button class="fight-btn">Fight</button>
        `;
    container.appendChild(card);

    const fightBtn = card.querySelector('.fight-btn');
    fightBtn.addEventListener('click', function () {
        if (isCleared || isGameOver) {
            return;
        }
        if (heroPower >= power) {
            isCleared = true;
            fightBtn.disabled = true;
            fightBtn.textContent = 'Cleared';
            card.style.opacity = '0.4';
            card.dispatchEvent(new CustomEvent('combat:victory', {
                bubbles: true,
                detail: { monsterPower: power } //This detail is used to move to console log line 11 and update combat power
            }));
        } else {
            fightBtn.textContent = 'Defeated';
            fightBtn.disabled = true;
            card.dispatchEvent(new CustomEvent('combat:defeat', {
                bubbles: true,
                detail: { monsterPower: power }
            }));
            message.textContent = 'Overthrown...';
        }
    });
}

function initGame() {
    heroPower = 5;
    isGameOver = false;
    message.textContent = 'Defeat monsters weaker than you to gain their power!';
    tower.innerHTML = '';
    updateHeroUI();
    createTowerRoom(tower, 'Goblin 👺', 3);
    createTowerRoom(tower, 'Skeleton 💀', 7);
    createTowerRoom(tower, 'Orc 🪓', 12);
    createTowerRoom(tower, 'Dragon 🐉', 25);

    reset.addEventListener('click', initGame);
}

initGame();