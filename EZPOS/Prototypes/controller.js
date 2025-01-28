addEventListener("keypress", function(event)
{
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("PasswordBtn").click();
    }
});

function checkPassword(inputPassword){
    if(inputPassword === correctPassword){
        return true;
    }
}

document.getElementById("PasswordBtn").addEventListener("click", function () {
    const userInput = document.getElementById("myInput").value; // Get the input value
    const correctPassword = ""; // Define the correct password

    if (userInput === correctPassword) {
        document.getElementById("PBox").style.display = "none";
        document.getElementById("VBox").style.display = "contents";
        document.getElementById("AddBtn").style.display = "contents";
    } else {
        alert("Incorrect password. Please try again.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Load saved groups from localStorage on page load
    loadGroups();
    updateShopItems();
});

function addGroup() {
    // Select the VBox container
    const vBox = document.getElementById('VBox');
    
    // Create a new group div
    const newGroup = document.createElement('div');
    newGroup.classList.add('group');

    // Generate unique ID for the group
    const groupId = `group-${Date.now()}`;
    newGroup.setAttribute('data-id', groupId);

    // Add the content of the new group
    newGroup.innerHTML = `
        <select name="category" onchange="saveGroups(); updateShopItems()">
            <option value="" disabled selected>Select a category</option>
            <option value="Food">Food</option>
            <option value="Beverage">Beverage</option>
            <option value="Drink">Drink</option>
            <option value="Goody">Goody</option>
            <option value="Misc">Misc</option>
        </select>
        <input type="text" minlength="2" placeholder="Enter Item Name" class="password-input" oninput="saveGroups(); updateShopItems()">
        <input type="number" minlength="1" placeholder="Enter Item Amount" class="password-input" oninput="saveGroups(); updateShopItems()">
        <input type="checkbox" name="isHidden" onchange="saveGroups(); updateShopItems()">
        <label> Hidden</label><br>
        <button class="RemoveButton" onclick="removeGroup(this)">Remove</button>
    `;

    // Append the new group to the VBox
    vBox.appendChild(newGroup);

    // Save the new group to localStorage
    saveGroups();

    // Update the shop items buttons
    updateShopItems();
}

function removeGroup(button) {
    // Remove the group div
    const groupDiv = button.parentElement;
    groupDiv.remove();

    // Save the updated groups to localStorage
    saveGroups();

    // Update the shop items buttons
    updateShopItems();
}

function saveGroups() {
    const vBox = document.getElementById('VBox');
    const groups = [];

    // Loop through all groups in VBox and collect their data
    vBox.querySelectorAll('.group').forEach(group => {
        const groupId = group.getAttribute('data-id');
        const category = group.querySelector('select[name="category"]').value;
        const itemName = group.querySelector('input[type="text"]').value.trim();
        const itemAmount = group.querySelector('input[type="number"]').value;
        const isHidden = group.querySelector('input[name="isHidden"]').checked;

        groups.push({
            id: groupId,
            category,
            itemName,
            itemAmount,
            isHidden
        });
    });

    // Save groups array to localStorage as a JSON string
    localStorage.setItem('groups', JSON.stringify(groups));
}

function loadGroups() {
    const vBox = document.getElementById('VBox');
    const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];

    // Clear VBox before loading
    vBox.innerHTML = '';

    // Recreate groups from saved data
    savedGroups.forEach(groupData => {
        const newGroup = document.createElement('div');
        newGroup.classList.add('group');
        newGroup.setAttribute('data-id', groupData.id);

        newGroup.innerHTML = `
            <select name="category" onchange="saveGroups(); updateShopItems()">
                <option value="" disabled>Select a category</option>
                <option value="Food" ${groupData.category === 'Food' ? 'selected' : ''}>Food</option>
                <option value="Beverage" ${groupData.category === 'Beverage' ? 'selected' : ''}>Beverage</option>
                <option value="Drink" ${groupData.category === 'Drink' ? 'selected' : ''}>Drink</option>
                <option value="Goody" ${groupData.category === 'Goody' ? 'selected' : ''}>Goody</option>
                <option value="Misc" ${groupData.category === 'Misc' ? 'selected' : ''}>Misc</option>
            </select>
            <input type="text" minlength="2" placeholder="Enter Item Name" class="password-input" value="${groupData.itemName}" oninput="saveGroups(); updateShopItems()">
            <input type="number" minlength="1" placeholder="Enter Item Amount" class="password-input" value="${groupData.itemAmount}" oninput="saveGroups(); updateShopItems()">
            <input type="checkbox" name="isHidden" ${groupData.isHidden ? 'checked' : ''} onchange="saveGroups(); updateShopItems()">
            <label> Hidden</label><br>
            <button class="RemoveButton" onclick="removeGroup(this)">Remove</button>
        `;

        vBox.appendChild(newGroup);
    });

    // Update the shop items buttons
    updateShopItems();
}

function updateShopItems() {
    const shopItemsGrid = document.querySelector('.grid.shopItems');
    const groups = document.querySelectorAll('.group');

    // Clear the shop items grid
    shopItemsGrid.innerHTML = '';

    // Loop through each group and create a button
    groups.forEach(group => {
        const itemName = group.querySelector('input[type="text"]').value.trim();
        const itemAmount = group.querySelector('input[type="number"]').value;
        const isHidden = group.querySelector('input[name="isHidden"]').checked;

        // Only create a button if the item is not hidden and has valid data
        if (itemName && itemAmount && !isHidden) {
            // Create a new button for the shop item
            const itemButton = document.createElement('button');
            itemButton.classList.add('itemButton');

            // Add the content for the button
            itemButton.innerHTML = `
                <section class="sectionSplit">
                    <p class="itemName">${itemName}</p>
                    <section>
                        <p class="itemPrice">${itemAmount},-</p>
                    </section>
                </section>
            `;

            // Append the button to the shop items grid
            shopItemsGrid.appendChild(itemButton);
        }
    });
}

    //IDEAS

    //WHEN STOCK FALLS UNDER 0, TICK HIDDEN ON THAT ITEM.
    //When trying to buy more than stock allows, indicate that there is only (amount) of items left in stock. Or Show Stock when its bellow 5.
    //

    //TODO

    //Prices Stack in Total
    //Show Items Selected
    //Delete Previous Item Button
    //Clear Order
