let text = document.querySelector('h1');
let btn = document.querySelector('button');
let dd = document.querySelector('img');
let count = 10;

btn.addEventListener('click', function () {
    count -= 1;
    console.log(count);
    if (count == 0) {
        dd.src = "./images/angy.jpeg";
        text.innerText = "Look what you did... He will destroy us all";
    }
});

console.log(count);