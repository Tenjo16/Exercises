let inventory = [
    "Passerby's Rejuvenating Wooden Wand",
    "Musketeer's Wild Wheat Felt Hat"
];

let march7Equipments = [];

const inventoryList = document.getElementById('inventory-list');
const equipmentList = document.getElementById('equipment-list');

function renderInventory() {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item, index) {
        inventoryList.innerHTML += `<li data-item-index="${index}">${item}</li>`;
    });
}

inventoryList.addEventListener('click', function (event) {
    const index = event.target.dataset.itemIndex;

    if (index !== undefined) {
        console.log(index);
        equippedItem = inventory.splice(index, 1)[0];
        march7Equipments.push(equippedItem);
        console.log(inventory, march7Equipments);
        renderInventory();
        renderEquipment();
    }
});

equipmentList.addEventListener('click', function () {
    const index = event.target.dataset.itemIndex;

    if (index !== undefined) {
        unequippedItem = march7Equipments.splice(index, 1)[0];
        inventory.push(unequippedItem);
        renderInventory();
        renderEquipment();
    }
});

function renderEquipment() {
    equipmentList.innerHTML = '';
    march7Equipments.forEach(function (item, index) {
        equipmentList.innerHTML += `<li data-item-index="${index}">${item}</li>`;
    });
}

renderInventory();
renderEquipment();