const balloonControllers = [];
const shelf = document.getElementById('balloon-shelf');
const pumpAllBtn = document.getElementById('pumpall');
const cashOutBtn = document.getElementById('cashout');
const bank = document.getElementById('bank-display');

function createBalloon(container) {
    let pumpCount = 0;
    let value = 0;
    let isPopped = false;
    const popLimit = Math.floor(Math.random() * 5) + 3;
    const element = document.createElement('div');
    element.className = 'balloon';
    element.innerHTML = `
    <p class="balloon-emoji">🎈</p>
    <p class="balloon-value">🎟️ 0</p>
`;
    container.appendChild(element);

    return {
        pump: function () {
            if (isPopped) {
                return;
            }
            pumpCount++;
            value += 10;
            const emojiEl = element.querySelector('.balloon-emoji');
            const valueEl = element.querySelector('.balloon-value');

            emojiEl.style.transform = `scale(${1 + pumpCount * 0.25})`;
            valueEl.textContent = `🎟️ ${value}`;
            if (pumpCount >= popLimit) {
                isPopped = true;
                element.textContent = '💥 (POPPED)';
                element.dispatchEvent(new CustomEvent('balloon:burst', { bubbles: true }));
            }
        },
        getValue: function () {
            return value;
        },
        isPopped: function () {
            return isPopped;
        }
    };
}

for (let i = 0; i < 3; i++) {
    balloonControllers.push(createBalloon(shelf));
}

pumpAllBtn.addEventListener('click', function () {
    balloonControllers.forEach(function (balloon) {
        balloon.pump();
    });
});

let bankScore = 0;
cashOutBtn.addEventListener('click', function () {
    balloonControllers.forEach(function (balloon) {
        if (!balloon.isPopped()) {
            bankScore += balloon.getValue();
        }
        bank.textContent = `Bank: ${bankScore} 🎟️`;
        pumpAllBtn.disabled = true;
        cashOutBtn.disabled = true;
    });
});