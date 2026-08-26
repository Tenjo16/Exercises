let currentState = 'IDLE';

const petDisplay = document.getElementById('pet-display');
const stateInspector = document.getElementById('state-inspector');
const controls = document.querySelector('#controls');
const image = document.getElementById('pet-img');
let wakeUp = 10;

function render() {
    stateInspector.textContent = `Current State: ${currentState}`;

    switch (currentState) {
        case 'IDLE':
            petDisplay.textContent = '🐶 What should DD do?';
            image.src = 'images/idle.jpg';
            break;
        case 'FEEDING':
            petDisplay.textContent = '🍖 Numnumnum..';
            image.src = 'images/nom.jpg';
            break;
        case 'PLAYING':
            petDisplay.textContent = '🎾 Taime to pleh.';
            image.src = 'images/play.jpg';
            break;
        case 'SLEEPING':
            petDisplay.textContent = '😴 So eepy.';
            image.src = 'images/eep.jpg';
            break;
        default:
            petDisplay.textContent = '❓ Unknown state.';
    }



    //Each time the website renders, will disable buttons based on what's already active.
    document.getElementById('btn-feed').disabled = (currentState === 'FEEDING');
    document.getElementById('btn-play').disabled = (currentState === 'PLAYING');
    document.getElementById('btn-sleep').disabled = (currentState === 'SLEEPING');
}

controls.addEventListener('click', function (event) {
    if (event.target.id == 'btn-feed') {
        changeState('FEEDING');
    } else if (event.target.id == 'btn-play') {
        changeState('PLAYING');
    } else if (event.target.id == 'btn-sleep') {
        changeState('SLEEPING');
    }
});

function changeState(newState) {
    if (currentState == 'SLEEPING' && newState !== 'IDLE') {
        petDisplay.innerHTML = `😴 He's still eeping! You gotta wake him up (Gently.) <br> Poke him ${wakeUp}x to woke!`;
        return;
    } else {
        currentState = newState;
        render();
    }
}

image.addEventListener('click', function (event) {
    if (currentState == 'SLEEPING') {
        wakeUp--;
        petDisplay.innerHTML = `😴 He's still eeping! You gotta wake him up (Gently.) <br> Poke him ${wakeUp}x to woke!`;
    }

    if (wakeUp <= 0) {
        wakeUp = 10;
        changeState('IDLE');
    }
});

render();