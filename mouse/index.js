const follower = document.getElementById('follower');

window.addEventListener('mousemove', function (event) {
    console.log(event.clientX, event.clientY);
    follower.style.left = event.clientX + `px`;
    follower.style.top = event.clientY + `px`;
});