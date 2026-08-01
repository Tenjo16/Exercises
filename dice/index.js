function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

const resultDiv = document.getElementById('result');
const buttons = document.querySelectorAll('.die-btn');

buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        const sides = button.dataset.sides;
        const result = rollDie(sides);
        resultDiv.textContent = result;
    });
});