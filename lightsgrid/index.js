function createLight(id, initialState, mask) {
    let isOnState = initialState
    const lightBtn = document.createElement('button')
    lightBtn.classList.add('light')
    lightBtn.addEventListener('click', function () {
        lightBtn.dispatchEvent(new CustomEvent('light:trigger', {
            bubbles: true,
            detail: { id, mask }
        }))
    })

    const container = document.getElementById('grid-container')
    container.appendChild(lightBtn)

    function render() {
        if (isOnState) {
            lightBtn.textContent = '🟢'
        } else {
            lightBtn.textContent = '🔴'
        }
    }
    render()

    return {
        toggle() {
            isOnState = !isOnState;
            render()
            return isOnState
        },
        isOn() {
            return isOnState
        },
        setState(newState) {
            isOnState = newState;
            render();
            return isOnState
        }

    }
}

const container = document.getElementById('grid-container')
const currentStatus = document.getElementById('status')
const moveCounter = document.getElementById('move-counter')

const MASKS = [
    [0, 1, 3],       // 0: self, right, down
    [0, 1, 2, 4],    // 1: left, self, right, down
    [1, 2, 5],       // 2: left, self, down
    [0, 3, 4, 6],    // 3: up, self, right, down
    [1, 3, 4, 5, 7], // 4: up, left, self, right, down
    [2, 4, 5, 8],    // 5: up, left, self, down
    [3, 6, 7],       // 6: up, self, right
    [4, 6, 7, 8],    // 7: up, left, self, right
    [5, 7, 8]        // 8: up, left, self
];

const lights = []

for (let i = 0; i < 9; i++) {
    lights.push(createLight(i, true, MASKS[i]))
}

container.addEventListener('light:trigger', function (event) {
    if (isLocked) {
        return
    }
    const { mask } = event.detail;
    mask.forEach(function (index) {
        lights[index].toggle()
    })
    moves++
    moveCounter.textContent = 'Moves: ' + moves

    checkWin()
})

let moves = 0
let isLocked = false

function checkWin() {
    const allGreen = lights.every(function (light) {
        return light.isOn()
    })

    if (allGreen && moves > 0) {
        isLocked = true
        currentStatus.textContent = "Matrix Unlocked"
    }
}

function scramble() {
    for (let i = 0; i < 15; i++) {
        const randomIndex = Math.floor(Math.random() * 9)
        const randomMask = MASKS[randomIndex]

        randomMask.forEach(function (index) {
            lights[index].toggle()
        })
    }

    moves = 0
    moveCounter.textContent = 'Moves: 0'
    isLocked = false
}

const resetBtn = document.getElementById('reset-btn')
resetBtn.addEventListener('click', function () {
    currentStatus.textContent = 'Solve the puzzle and light them all green to win!'
    scramble()
})

scramble()