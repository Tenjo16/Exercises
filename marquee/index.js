const marqueeArray = ['h', 'a', 'p', 'p', 'y', ' ', 'b', 'i', 'r', 't', 'h', 'd', 'a', 'y'];
const container = document.getElementById('marquee-container');

function render() {
    container.innerHTML = '';
    marqueeArray.forEach(function (char) {
        const span = document.createElement('span');
        span.textContent = char;
        container.appendChild(span);
    });
}
render();

function rotateRight() {
    marqueeArray.push(marqueeArray.shift());
    render();
}

setInterval(rotateRight, 200);