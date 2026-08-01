let add = document.querySelector('#add');
let sub = document.querySelector('#sub');
let text = document.querySelector('.display');
let count = 0;

add.addEventListener('click', function () {
    count++;
    text.textContent = count;
});

sub.addEventListener('click', function () {
    count--;
    text.textContent = count;
});