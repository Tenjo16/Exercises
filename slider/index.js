const knob = document.querySelector('#slider-knob');
const track = document.querySelector('#slider-track');
const valueDisplay = document.querySelector('#slider-value');

let isDragging = false;

knob.addEventListener('mousedown', function () {
    isDragging = true;
    console.log(isDragging);
});

window.addEventListener('mouseup', function () {
    isDragging = false;
    console.log(isDragging);
});

window.addEventListener('mousemove', function (event) {
    if (isDragging) {
        const rect = track.getBoundingClientRect();
        const trackWidth = rect.width;
        let offsetX = event.clientX - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, trackWidth));

        knob.style.left = offsetX + 'px';

        const value = Math.round((offsetX / trackWidth) * 100);
        valueDisplay.textContent = value;

        track.dispatchEvent(new CustomEvent('change', { detail: { value: value } }));
    }
});
track.addEventListener('change', function (event) {
    console.log('Custom Event Value:', event.detail.value);
});