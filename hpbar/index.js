const heroState = {
    name: 'Tony El DumDum',
    hp: 100,
    maxHP: 100,
    mp: 100,
    maxMP: 100,
    isDefeated: false
};
const hpBar = document.getElementById('hp-fill');
const mpBar = document.getElementById('mp-fill');
const health = document.getElementById('hp-text');
const mana = document.getElementById('mp-text');
const controls = document.querySelector('#controls');

function render() {
    hpPercent = (heroState.hp / heroState.maxHP) * 100;
    mpPercent = (heroState.mp / heroState.maxMP) * 100;

    hpBar.style.width = hpPercent + '%';
    mpBar.style.width = mpPercent + '%';

    health.textContent = `${heroState.hp} / ${heroState.maxHP}`;
    mana.textContent = `${heroState.mp} / ${heroState.maxMP}`;

    const isDead = heroState.hp === 0;
    document.getElementById('btn-damage').disabled = isDead;
    document.getElementById('btn-potion').disabled = isDead;
    document.getElementById('btn-spell').disabled = isDead;
}

controls.addEventListener('click', function (event) {
    if (event.target.id == 'btn-damage') {
        heroState.hp = Math.max(0, heroState.hp - 15);
        if (heroState.hp == 0 && !heroState.isDefeated) {
            heroState.isDefeated = true;
            window.dispatchEvent(new CustomEvent('heroDefeated', { detail: { heroName: heroState.name } }));
        }
    } else if (event.target.id == 'btn-potion') {
        heroState.hp = Math.min(heroState.maxHP, heroState.hp + 20);
    } else if (event.target.id == 'btn-spell') {
        if (heroState.mp >= 25) {
            heroState.mp -= 25;
        }
    } else if (event.target.id == 'btn-reset') {
        heroState.hp = 100;
        heroState.mp = 100;
        notifs.textContent = '';
        heroState.isDefeated = false;
    }
    render();
});

window.addEventListener('heroDefeated', function (event) {
    document.getElementById('notifs').textContent = `${event.detail.heroName} has been defeated! 💀`;
});