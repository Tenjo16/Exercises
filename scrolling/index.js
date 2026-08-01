

// Select all card elements from the page
const cards = document.querySelectorAll('.card');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScroll;

    // 1. Remove .active class from all cards first
    cards.forEach(card => card.classList.remove('active'));

    // 2. Check thresholds and activate the target card
    if (scrollFraction < 0.25) {
        cards[0].classList.add('active'); // Stage 1 (0% - 25%)
    } else if (scrollFraction < 0.50) {
        cards[1].classList.add('active'); // Stage 2 (25% - 50%)
    } else if (scrollFraction < 0.75) {
        cards[2].classList.add('active'); // Stage 3 (50% - 75%)
    } else {
        cards[3].classList.add('active'); // Stage 4 (75% - 100%)
    }
});