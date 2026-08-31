let totalBankedScore = 0
const totalScoreDisplay = document.getElementById('total-score')

document.addEventListener('balloon:banked', function (event) {
    totalBankedScore += event.detail.points
    totalScoreDisplay.textContent = totalBankedScore
})

function createBalloonStation(container) {
    let pumpCount = 0
    let isResolved = false
    const popLimit = Math.floor(Math.random() * 6) + 3 // Give random pumps up to (but less than) 6 and add 3 to give an initial pop limit of 3
    const station = document.createElement('div')
    station.className = 'balloon-station'
    render()


    function render() {
        station.innerHTML = `
    <p>Pumps: ${pumpCount}</p>
    <div id='balloon'>🎈</div>
    <style>
    #balloon{
    height: 120px;      
    display: flex;           
    justify-content: center;   
    align-items: center;     
    font-size: 1.5rem;
    }
    </style>
    <button id='pump-btn'>Pump</button>
    <button id='cash-btn'>Cash In</button>
    `
        const pumpBtn = station.querySelector('#pump-btn')
        const balloonEl = station.querySelector('#balloon')

        pumpBtn.addEventListener('click', function () {
            if (isResolved) {
                return
            }
            pumpCount++
            if (pumpCount >= popLimit) {
                isResolved = true
                balloonEl.textContent = '💥'
                station.querySelector('p').textContent = 'POPPED!'
            } else {
                station.querySelector('p').textContent = `Pumps: ${pumpCount}`
                balloonEl.style.fontSize = `${1.5 + pumpCount * 0.5}rem`
            }
        })
        const cashBtn = station.querySelector('#cash-btn')
        cashBtn.addEventListener('click', function () {
            if (isResolved) {
                return
            }
            if (pumpCount == 0) {
                return
            }
            isResolved = true
            const pointsAwarded = pumpCount * 10
            station.querySelector('p').textContent = `Banked: ${pointsAwarded} pts!`
            document.dispatchEvent(new CustomEvent('balloon:banked', { detail: { points: pointsAwarded } }));
        })

        container.appendChild(station)
    }
}

const balloonRow = document.getElementById('balloon-row');
for (let i = 0; i < 3; i++) {
    createBalloonStation(balloonRow);
}