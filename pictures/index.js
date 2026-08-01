// 1. Array storing image URLs
const images = [
    'images/DD (1).jpeg',
    'images/DD (2).jpeg',
    'images/DD (3).jpeg'
];

//
// 2. Track current active index
let currentIndex = 0;

// 3. Select DOM elements
const galleryImg = document.getElementById('gallery-img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function updateGallery() {
    galleryImg.src = images[currentIndex];
}

updateGallery();

// NEXT AND PREVIOUS FUNCTION
nextBtn.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % images.length;
    updateGallery();
});

prevBtn.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery();
});


// ADD IMAGE FUNCTION
// Select the input box and add button
const urlInput = document.getElementById('url-input');
const addBtn = document.getElementById('add-btn');

// Listen for clicks on the Add Image button
addBtn.addEventListener('click', function () {
    const newUrl = urlInput.value;

    // Check that the text box is not empty
    if (newUrl !== '') {
        images.push(newUrl);
        currentIndex = images.length - 1;
        updateGallery();
        urlInput.value = '';
    }
});