addEventListener("keypress", function(event)
{
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("PasswordBtn").click();
    }
});

const correctPassword = "0000";

function checkPassword(inputPassword){
    if(inputPassword === correctPassword){
        return true;
    }
}

document.getElementById("PasswordBtn").addEventListener("click", function () {
    const userInput = document.getElementById("myInput").value; // Get the input value
    const correctPassword = "0000"; // Define the correct password

    if (userInput === correctPassword) {
        document.getElementById("PBox").style.display = "none";
        document.getElementById("VBox").style.display = "contents";
        document.getElementById("AddBtn").style.display = "contents";
    } else {
        alert("Incorrect password. Please try again.");
    }
});

function addGroup() {
        // Select the VBox container
        const vBox = document.getElementById('VBox');
        
        // Create a new group div
        const newGroup = document.createElement('div');
        newGroup.classList.add('group');

        // Add the content of the new group
        newGroup.innerHTML = `
          <select name="category">
            <option value="" disabled selected>Select a category</option>
            <option value="Food">Food</option>
            <option value="Beverage">Beverage</option>
            <option value="Drink">Drink</option>
            <option value="Goody">Goody</option>
            <option value="Misc">Misc</option>
          </select>
          <input type="text" minlength="2" placeholder="Enter Item Name" class="password-input">
          <input type="number" minlength="1" placeholder="Enter Item Amount" class="password-input">
          <input type="checkbox" name="isHidden">
          <label> Hidden</label><br>
          <button class="RemoveButton" onclick="removeGroup(this)">Remove</button>
        `;
  
        // Append the new group to the VBox
        vBox.appendChild(newGroup);
}

function removeGroup(button) {
        const group = button.parentElement;
        group.remove();
}

//ADD IF CLICKED AWAY FROM MANAGER NEED TO LOG IN AGAIN


