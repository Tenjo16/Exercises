/* Note: Gemini was used to reposition my already written code for better understanding of how
each line of code connects */

// ==========================================
// 1. DATA & STATE
// ==========================================
const instruments = [
    { emoji: '🥁', label: 'Drum' },
    { emoji: '🎸', label: 'Guitar' },
    { emoji: '🎹', label: 'Piano' },
    { emoji: '🎷', label: 'Sax' }
];

let sequence = [];
let playerStep = 0;


// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const stageEl = document.getElementById('pad-stage');
const message = document.getElementById('info-display');
const startBtn = document.getElementById('start-btn');


// ==========================================
// 3. FACTORY & HELPER FUNCTIONS
// ==========================================

/* Factory function to create individual instrument pads */
function createInstrumentPad(container, index, emoji, label) {
    let padIndex = index;
    let idleIcon = emoji;

    let buttonEl = document.createElement('button');
    buttonEl.className = 'pad';
    buttonEl.textContent = idleIcon;
    container.appendChild(buttonEl);

    /* Function to reset each instrument that was lit to its original state */
    function reset() {
        buttonEl.classList.remove('lit');
        buttonEl.textContent = idleIcon;
    }

    function highlight() {
        buttonEl.classList.add('lit'); // Adds lit styling from CSS
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

// Extend instrument rhythm by 1 upon completion
function addToSequence() {
    // Picks a random index (instrument) and adds it to sequence
    let randomIndex = Math.floor(Math.random() * instruments.length);
    sequence.push(randomIndex);
}

// Plays back the full sequence pattern
function playSequence() {
    sequence.forEach(function (padIndex, i) {
        setTimeout(function () {
            padControllers[padIndex].highlight();
        }, i * 600);
    });
}


// ==========================================
// 4. INITIALIZATION
// ==========================================

/* Creates visual emoji pads and returns controllers array */
const padControllers = instruments.map(function (instrument, index) {
    return createInstrumentPad(stageEl, index, instrument.emoji, instrument.label);
});


// ==========================================
// 5. GLOBAL EVENT LISTENERS
// ==========================================

// Central Stage Listener (Event Delegation)
stageEl.addEventListener('pad:played', function (e) {
    console.log('Parent stage caught event for pad index:', e.detail.index);
    const clickedIndex = e.detail.index;

    // Checks matched individual pad click before continuing pattern
    if (clickedIndex == sequence[playerStep]) {
        playerStep++;
        // Check if player completed the whole sequence
        if (playerStep == sequence.length) {
            playerStep = 0;
            addToSequence();
            setTimeout(function () {
                playSequence();
            }, 1000);
        }
    } else {
        message.textContent = 'WRONG! GAME OVER';
        sequence = [];
        playerStep = 0;
        startBtn.disabled = false;
        startBtn.textContent = "Start Performance";
    }
});

// Start Performance Button Listener
startBtn.addEventListener('click', function () {
    message.textContent = 'Watch the Rhythm...';
    sequence = [];
    playerStep = 0;
    addToSequence();
    playSequence();
    startBtn.textContent = 'Rhythm in Progress...';
    startBtn.disabled = true;
});