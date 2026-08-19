const appState = {
    total: 0.00,
    coinCount: 0
}
const btn25 = document.getElementById('btn-25')
const btn100 = document.getElementById('btn-100')
const btn500 = document.getElementById('btn-500')
const btns = document.getElementById('btn-container')

function render() {
    const tips = document.getElementById('tip-amount')
    const coins = document.getElementById('coin-count')
    const emoji = document.getElementById('mood-emoji')

    tips.textContent = appState.total.toFixed(2)
    coins.textContent = appState.coinCount

    if (appState.total == 0) {
        emoji.textContent = '😢'
    } else if (appState.total < 15) {
        emoji.textContent = '😐'
    } else {
        emoji.textContent = '😄'
    }
}

btns.addEventListener('click', function (event) {
    if (event.target.dataset.value) {
        appState.total += parseFloat(event.target.dataset.value)
        appState.coinCount += 1
        render()
    } else if (event.target.id == 'btn-reset') {
        appState.total = 0.00
        appState.coinCount = 0
        render()
    }
})

render()