const gameState = {
    score: 0,
    slots: [
        { id: 1, status: 'inactive' },
        { id: 2, status: 'inactive' },
        { id: 3, status: 'inactive' }
    ]
}

const grid = document.querySelector('#game-grid')
const score = document.getElementById('score-display')

function render() {
    grid.innerHTML = ''
    gameState.slots.forEach(function (slot) {
        const slotElem = document.createElement('div')
        if (slot.status == 'active') {
            slotElem.classList.add('active')
        }
        slotElem.classList.add('slot')
        //Slot ID Step 1: Gives slots a dedicated ID#
        slotElem.dataset.id = slot.id
        grid.appendChild(slotElem)
    })
}

function resetTimer() {
    clearInterval(timerId);
    timerId = setInterval(spawnTarget, 1000);
}

grid.addEventListener('click', function (event) {
    if (event.target.classList.contains('slot')) {
        console.log('Clicked slot ID:', event.target.dataset.id)
        //Slot ID Step 2: Set the ID# into a true numbered value from its string
        const clickedId = Number(event.target.dataset.id)
        //Slot ID Step 3: Find what ID# the current slot was clicked on
        const clickedSlot = gameState.slots.find(function (slot) {
            return slot.id == clickedId
        })
        //Slot ID Step 3: If the current Slot ID status is active, get a poit
        if (clickedSlot.status === 'active') {
            gameState.score += 1;
            spawnTarget();
            resetTimer(); // Resets the 1-second countdown so you get a full 1000ms on the new target!
            score.textContent = gameState.score;
        }
    }
    render()
})

function spawnTarget() {
    gameState.slots.forEach(function (slot) {
        slot.status = 'inactive'
    })
    randomIndex = Math.floor(Math.random() * gameState.slots.length)
    gameState.slots[randomIndex].status = 'active'
    render()
}

let timerId = setInterval(spawnTarget, 1000);