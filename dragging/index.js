const fruit = document.querySelectorAll('.fruit')

// Create hold item function.
fruit.forEach(function (fruits) {
    fruits.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', event.target.id)
        /*dragstart works by grabbing data from what was dragged until
it's dropped*/
    })
})

const plate = document.querySelectorAll('.plate')

plate.forEach(function (plates) {
    plates.addEventListener('dragover', function (event) {
        event.preventDefault()
    })
    plates.addEventListener('drop', function (event) {
        event.preventDefault()
        const fruitId = event.dataTransfer.getData('text/plain')
        const fruitElement = document.getElementById(fruitId)
        plates.appendChild(fruitElement)
    })
})

