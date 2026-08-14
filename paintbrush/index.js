let currentColor = 'black';
const buttons = document.querySelectorAll('.color-btn');
isDrawing = false;
buttons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        currentColor = event.target.dataset.color;
        console.log(currentColor);

    });
});

document.addEventListener('mousedown', function () {
    isDrawing = true;
    console.log(isDrawing);
});

document.addEventListener('mouseup', function () {
    isDrawing = false;
    console.log(isDrawing);
});

document.addEventListener('mousemove', function (event) {
    if (isDrawing && canvas.contains(event.target)) {
        const dot = document.createElement('div');
        dot.style.position = 'absolute';
        dot.style.left = event.clientX + 'px';
        dot.style.top = event.clientY + 'px';
        dot.style.width = '10px';
        dot.style.height = '10px';
        dot.style.borderRadius = '50%';
        dot.style.backgroundColor = currentColor;
        document.body.appendChild(dot);
    }
});