function createDancer(container, name, staticUrl, gifUrl) {
    let dancing = false;
    let image = document.createElement('img');


    image.src = staticUrl;
    image.alt = name;
    container.appendChild(image);

    function dance() {
        dancing = true;
        image.src = gifUrl;
    }

    function stop() {
        dancing = false;
        image.src = staticUrl;
    }

    function isDancing() {
        return dancing;
    }

    image.addEventListener('click', function () {
        if (dancing) {
            stop();
        } else {
            dance();
        }
        image.dispatchEvent(new CustomEvent('dancer:toggled', { bubbles: true }));
    });

    return {
        dance,
        stop,
        isDancing
    };
}

const danceFloor = document.getElementById('dance-floor'); // HTML element where dancers render

const crewControllers = [ // Array holding dancer control objects
    createDancer(danceFloor, 'Hamster', 'images/hamsterstill.jfif', 'images/hamster-dance.gif'),
    createDancer(danceFloor, 'Pug', 'images/pugstill.png', 'images/pug.gif'),
    createDancer(danceFloor, 'Dog', 'images/dogedancestill.png', 'images/dogedance.gif'),
];

const raveBtn = document.getElementById('rave-all-btn');
const freezeBtn = document.getElementById('freeze-btn');

raveBtn.addEventListener('click', function () {
    crewControllers.forEach(function (dancer) {
        dancer.dance();
        startFloorRave();
    });
    updateHypeMeter();
});

freezeBtn.addEventListener('click', function () {
    crewControllers.forEach(function (dancer) {
        dancer.stop();
        stopFloorRave();
    });
    updateHypeMeter();
});

const hypeMeter = document.getElementById('hype-meter');

function updateHypeMeter() {
    // 1. Filter the array to get only dancers currently dancing
    const dancingCrew = crewControllers.filter(function (dancer) {
        return dancer.isDancing();
    });

    // 2. Update the Hype Meter DOM element AFTER filtering is complete
    hypeMeter.textContent = `${dancingCrew.length} / ${crewControllers.length} Dancing`;
}

const staticFloorBg = 'images/rave.png';
const gifFloorBg = 'images/rave.gif';

function startFloorRave() {
    document.body.style.backgroundImage = `url('${gifFloorBg}')`;
}

function stopFloorRave() {
    document.body.style.backgroundImage = 'none';
}

document.addEventListener('dancer:toggled', function () {
    updateHypeMeter();

    const activeCount = crewControllers.filter(function (dancer) {
        return dancer.isDancing();
    }).length;

    if (activeCount === crewControllers.length) {
        startFloorRave(); // Turns on background GIF when all are raving
    } else {
        stopFloorRave();  // Drops back to static image if even one stops
    }
});
