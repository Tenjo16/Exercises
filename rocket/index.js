const rockets = []

document.addEventListener('click', function (event) {
    const rocket = document.createElement('div')
    rocket.textContent = '🚀'
    rocket.style.position = 'absolute';
    rocket.style.left = event.clientX + 'px';
    rocket.style.top = event.clientY + 'px';
    document.body.appendChild(rocket)

    const flame = document.createElement('span');
    flame.textContent = '🔥';
    flame.style.display = 'block';
    flame.style.fontSize = '0.7em';
    flame.style.textAlign = 'center';
    rocket.appendChild(flame);

    const rocketData = {
        element: rocket,
        flame: flame,
        y: event.clientY,
        speed: Math.floor(Math.random() * 31) + 10
    };
    rockets.push(rocketData)
    console.log(rockets)
})

setInterval(function () {
    // Loop through every rocket object in our array
    rockets.forEach(function (rocket) {
        // 1. Decrease y by speed to move the rocket upward
        rocket.y = rocket.y - Math.round(rocket.speed / 10)

        // 2. Apply the updated position to the DOM element
        rocket.element.style.top = rocket.y + 'px';
    });

    for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i]
        rocket.element.style.top = rocket.y + 'px'
        if (rocket.y <= 0) {
            rocket.element.remove()
            rockets.splice(i, 1)
        }

        rocket.flame.style.transform = 'scale(' + (0.8 + Math.random() * 0.4) + ')';
    }
}, 100); // Ticks once every 1000 milliseconds (1 second)