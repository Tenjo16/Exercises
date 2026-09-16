function createWorkStation(container, devName, workVisual, gameVisual) {
    let state = 'WORKING';
    let alertCountdown = null;

    const card = document.createElement('div');
    card.className = 'workstation-card';
    card.innerHTML = `
    <h3>${devName}</h3>
    <div class='visual-display'>${workVisual}</div>
    <div class='status-badge'>WORKING</div>
    <button class='action-btn'>🎮 START GAMING</button>
    `;

    container.appendChild(card);

    const actionBtn = card.querySelector('.action-btn');
    const visualEl = card.querySelector('.visual-display');
    const statusEl = card.querySelector('.status-badge');

    actionBtn.addEventListener('click', function () {
        if (state == 'FIRED') {
            return;
        }
        if (state == 'WORKING') {
            state = 'GAMING';
            visualEl.textContent = gameVisual;
            statusEl.textContent = state;
            actionBtn.textContent = '💼 BACK TO WORK';
        } else {
            state = 'WORKING';
            visualEl.textContent = workVisual;
            statusEl.textContent = state;
            actionBtn.textContent = '🎮 START GAMING';
        }

        card.dispatchEvent(new CustomEvent('dev:toggled', { bubbles: true }));
    });
    return {
        isGaming() {
            return state === 'GAMING';
        },
        isFired() {
            return state === 'FIRED';
        },
        triggerAlert() {
            if (state == 'FIRED' || alertCountdown !== null) {
                return;
            }
            alertCountdown = 5;
            card.classList.add('alert');
            statusEl.textContent = `🚨 BOSS ALERT: ${alertCountdown}s`;
        },
        work() {
            if (state == 'FIRED') {
                return;
            }
            state = 'WORKING';
            visualEl.textContent = workVisual;
            statusEl.textContent = 'WORKING';
            actionBtn.textContent = '🎮 START GAMING';
        },
        tick() {
            if (state === 'FIRED') return 0;

            if (alertCountdown !== null) {
                alertCountdown--;

                if (alertCountdown <= 0) {
                    card.classList.remove('alert');
                    alertCountdown = null;

                    if (state === 'GAMING') {
                        // Caught gaming -> FIRED!
                        state = 'FIRED';
                        card.classList.add('fired');
                        visualEl.textContent = '🪦';
                        statusEl.textContent = 'FIRED';
                        actionBtn.textContent = '📦 PACKED UP';
                        actionBtn.disabled = true;
                        card.dispatchEvent(new CustomEvent('dev:fired', { bubbles: true }));
                        return 0;
                    } else {
                        // Working -> SURVIVED!
                        statusEl.textContent = 'WORKING';
                    }
                } else {
                    if (state == 'GAMING') {
                        statusEl.textContent = `🚨 BOSS ALERT: ${alertCountdown}s`;
                    } else {
                        statusEl.textContent = 'WORKING';
                    }
                }
            }

            return state === 'GAMING' ? 10 : 0;
        }
    };
};

const officeFloor = document.getElementById('office-floor');

const dev1 = createWorkStation(officeFloor, 'Dev 1', '💼', '🎮');
const dev2 = createWorkStation(officeFloor, 'Dev 2', '🖥️', '🕹️');
const dev3 = createWorkStation(officeFloor, 'Dev 3', '💻', '👾');

const workstations = [dev1, dev2, dev3];

let totalPoints = 0;
let timeRemaining = 120;

const scoreEl = document.getElementById('score-display');
const timerEl = document.getElementById('timer-display');
const gameInterval = setInterval(function () {
    timeRemaining--;

    workstations.forEach(function (dev) {
        totalPoints += dev.tick(); // Use += to accumulate score
    });

    scoreEl.textContent = totalPoints;
    timerEl.textContent = timeRemaining;
}, 1000);

setInterval(function () {
    const activeDevs = workstations.filter(function (dev) {
        return !dev.isFired();
    });
    if (activeDevs.length > 0) {
        const randomIndex = Math.floor(Math.random() * activeDevs.length);
        activeDevs[randomIndex].triggerAlert();
    }
}, 5000);

const panicBtn = document.getElementById('emergency-btn');
panicBtn.addEventListener('click', function () {
    workstations.forEach(function (dev) {
        dev.work();
    });
});