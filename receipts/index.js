const items = []
const itemForm = document.getElementById('item-form')
const receiptList = document.getElementById('receipt-list')

itemForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const name = document.getElementById('item-name').value
    const price = parseFloat(document.getElementById('item-price').value)
    const quantity = parseInt(document.getElementById('item-qty').value)

    const newItem = {
        name: name,
        price: price,
        quantity: quantity
    }
    items.push(newItem)
    render()
    console.log(items)
})

function render() {
    receiptList.innerHTML = ''
    let total = 0

    items.forEach(function (item, index) {
        const itemDiv = document.createElement('div')
        const itemTotal = item.price * item.quantity
        total += itemTotal
        itemDiv.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.dataset.index = index; // Stores index in HTML as data-index="..."
        deleteBtn.style.marginLeft = '10px';

        itemDiv.appendChild(deleteBtn);
        receiptList.appendChild(itemDiv);
    })

    const totalDiv = document.createElement('div');
    totalDiv.style.fontWeight = 'bold';
    totalDiv.style.marginTop = '10px';
    totalDiv.textContent = `Grand Total: $${total.toFixed(2)}`;
    receiptList.appendChild(totalDiv);
}
receiptList.addEventListener('click', function (event) {
    // Check using .dataset.index to match line 33
    if (event.target.dataset.index !== undefined) {
        const index = parseInt(event.target.dataset.index);

        // Remove item from state array
        items.splice(index, 1);

        // Re-render UI
        render();
    }
});