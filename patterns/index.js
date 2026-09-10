function createInstrumentPad(container, index, emoji, label) {
    let padIndex = index;
    let idleIcon = emoji;
    let isLit = false;

    let buttonEl = document.createElement('button');
    buttonEl.className = 'pad';
    buttonEl.textContent = idleIcon + ' ' + label;
    container.appendChild(buttonEl);

    function reset() {
        isLit = false;
        buttonEl.style.backgroundColor = '';
        buttonEl.textContent = idleIcon + ' ' + label;
    }

    function highlight() {
        isLit = true;
        buttonEl.style.backgroundColor = 'yellow';
        setTimeout(function () {
            reset();
        }, 300);
    }

    buttonEl.addEventListener('click', function () {
        highlight();
        buttonEl.dispatchEvent(new CustomEvent('pad:played', {
            bubbles: true,
            detail: { index: padIndex }
        }));
    });

    return {
        highlight: highlight,
        reset: reset,
        getIndex: function () {
            return padIndex;
        }
    };
}

const stageEl = document.getElementById('pad-stage');

const instruments = [
    { emoji: '🥁', label: 'Drum' },
    { emoji: '🎸', label: 'Guitar' },
    { emoji: '🎹', label: 'Piano' },
    { emoji: '🎷', label: 'Sax' }
];

const padControllers = instruments.map(function (inst, index) {
    return createInstrumentPad(stageEl, index, inst.emoji, inst.label);
});

stageEl.addEventListener('pad:played', function (e) {
    console.log('Parent stage caught event for pad index:', e.detail.index);
});

let sequence = [];
let playerStep = 0;

// Extend instrument rhythm by 1 upon completion
function addToSequence() {
    let randomIndex = Math.floor(Math.random() * instruments.length);
    sequence.push(randomIndex);
}

function playSequence() {
    sequence.forEach(function (padIndex, i) {
        setTimeout(function () {
            padControllers[padIndex].highlight();
        }, i * 600);
    });
}