let cookies = 0;
const display = document.getElementById('cookie-display');

function renderCookies() {
    display.textContent = `Cookies: ${cookies}`;
}

function updateCookies(amount) {
    cookies += amount;
    renderCookies();
    console.log(cookies);
}


function createClickStation(container) {
    let level = 1;
    let power = 1;
    let cost = 10;

    const station = document.createElement('div');
    station.classList = 'station';


    function renderStation() {
        station.innerHTML =
            `<p>
            Level: ${level},
            Power: ${power},
            Cost: ${cost}
            </p>
            <div>
            <button id="bake-btn">Bake!</button>
            <button id="upgrade-btn">Upgrade</button>
            </div>`;

        const bake = station.querySelector('#bake-btn');
        const upgrade = station.querySelector('#upgrade-btn');

        bake.addEventListener('click', function () {
            updateCookies(power);
        });

        upgrade.addEventListener('click', function () {
            if (cookies >= cost) {
                updateCookies(-cost);
                level += 1;
                power += 1;
                cost = Math.floor(cost * 1.5);
                renderStation();
            }
        });
    }

    renderStation();
    container.appendChild(station);
};

function createAutoStation(container) {
    let level = 0;
    let cps = 1;
    let cost = 15;

    const station = document.createElement('div');

    function renderStation() {
        station.innerHTML = `
            <h3>Grandma's Oven</h3>
            <p>Level: ${level} | CPS: ${cps} | Cost: ${cost}</p>
            <div>
              <button id="auto-upgrade-btn">Upgrade</button>
            </div>
        `;

        const autoUpgrade = station.querySelector('#auto-upgrade-btn');
        autoUpgrade.addEventListener('click', function () {
            if (cookies >= cost) {
                updateCookies(-cost);
                level += 1;
                cps += 1;
                cost = Math.floor(cost * 1.5);
                renderStation();
            }
        });
    }

    setInterval(function () {
        if (level > 0) {
            updateCookies(cps);
        }
    }, 1000);

    renderStation();
    container.appendChild(station);
}


const stationsContainer = document.getElementById('stations');
createClickStation(stationsContainer);
createAutoStation(stationsContainer);