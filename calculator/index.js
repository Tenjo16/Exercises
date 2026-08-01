const keypad = document.querySelector('#keypad');
const display = document.querySelector('#display');

keypad.addEventListener('click', function (event) {
    const number = event.target.dataset.number;
    if (number) {
        display.value += number;
    }
    if (event.target.id === "clear") {
        display.value = "";
    }
    console.log(event.target);
});