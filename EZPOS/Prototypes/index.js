const pickedItems = document.getElementById("pickedItems")
let totalPrice = 0
let selectedPickedItemDivs = []
let pickedItemsNames = new Set()

const totalCostSpan = document.getElementById("totalCostText")
document.addEventListener('DOMContentLoaded', () => {
    // Function to load saved groups and populate the shopItems grid
    function loadShopItems() {
        const shopItemsGrid = document.querySelector('.grid.shopItems');
        const savedGroups = JSON.parse(localStorage.getItem('groups')) || [];

        // Clear the shop items grid
        shopItemsGrid.innerHTML = '';

        // Loop through saved groups and create buttons for each
        savedGroups.forEach(group => {
            const { itemName, itemAmount, isHidden } = group;

            // Only create a button if the group is not hidden and has valid data
            if (itemName && itemAmount && !isHidden) {
                let color
                
                switch(group.category){
                    case "Food": 
                        color = "red" 
                        break;
                    case "Beverage": 
                        color = "darkblue"
                        break
                    case "Drink": 
                        color = "blue"
                        break
                    case "Goody": 
                        color = "green"
                        break
                    case "Misc": 
                        color = "yellow"
                        break
                    default: 
                        color = ""
                        break
                }
                
                
                const itemButton = document.createElement('button');
                itemButton.classList.add("itemButton");

                // Add button content
                itemButton.innerHTML = `
                    <div class="itemButtonColor ${color}">
                        <section class="sectionSplit">
                            <p class="itemName">${itemName}</p>
                            <section>
                                <p class="itemPrice">${itemAmount},-</p>
                            </section>
                        </section>
                    </div>
                `;
                itemButton.addEventListener("click", () => pickItem(itemName, parseFloat(itemAmount)))
                // Append the button to the grid
                shopItemsGrid.appendChild(itemButton);
            }
        });
    }

    // Load the shop items on page load
    loadShopItems();
});

function clearPickedItems(){
    pickedItems.innerHTML = ""
    totalPrice = 0
    setTotalPriceText()
    selectedPickedItemDivs = []
    pickedItemsNames.clear()
}

function setTotalPriceText(){
    totalCostSpan.innerHTML =  formatPrice(totalPrice)
}

function formatPrice(price){
    return `${price.toFixed(2).replace(".", ",")} KR.`
}

function pickItem(itemName, itemPrice){
    const pickedItemDiv = document.createElement("div")
    pickedItemDiv.classList.add("pickedItem")
    const pickedItemCheckBox = document.createElement("input")
    pickedItemCheckBox.setAttribute("type", "checkbox")
    pickedItemCheckBox.classList.add("pickeditemSelectedCheckBox")
    pickedItemCheckBox.addEventListener("click", () => selectPickedItem(pickedItemCheckBox, pickedItemDiv))
    
    if (pickedItemsNames.has(itemName)){
        let amount = document.querySelectorAll(".pickedItemName")
        Array.from(amount).forEach((element) => {
            if (element.innerHTML !== itemName){
                return
            }
            const parent = element.parentElement.parentElement
            const itemPriceSpan = parent.querySelector(".pickedItemPrice")
            itemPriceSpan.innerHTML = formatPrice(parseFloat(itemPriceSpan.innerHTML) + itemPrice)
            const itemAmountSpan = parent.querySelector(".itemAmount")
            itemAmountSpan.innerHTML = (parseInt(itemAmountSpan.innerHTML.replace("x")) + 1) + " x" 
        })
    }
    else{
        pickedItemDiv.innerHTML += `
            <span class="pickedItemNameAndAmount">
                <span class="itemAmount">1 x</span> 
                <span class="pickedItemName">${itemName}</span>
            </span>
            <span class="pickedItemPrice">${formatPrice(itemPrice)}</span>
        `

        pickedItemDiv.appendChild(pickedItemCheckBox)
        pickedItems.appendChild(pickedItemDiv)
    }
    totalPrice = calculateTotalCost()

    setTotalPriceText()
    pickedItemsNames.add(itemName)
}

function selectPickedItem(checkBox, div){
    console.log(1)
    div.classList = ""
    
    if (checkBox.checked){
        div.classList.add("pickedItem", "selected")
    }
    else{
        div.classList.add("pickedItem")
    }

    selectedPickedItemDivs.push(div)
}

function calculateTotalCost(){
    let cost = 0
    Array.from(document.getElementsByClassName("pickedItemPrice")).forEach((element) => {
        cost += parseFloat(element.innerHTML)
    })
    return cost
}

function deleteSelectedItems(){
    selectedPickedItemDivs.forEach((element) =>{
        try{
            pickedItems.removeChild(element)
            pickedItemsNames.delete(element.querySelector(".pickedItemName").innerHTML)
        }
        catch{
            document.getElementsByClassName("pickeditemSelectedCheckBox").checked = false
        }
        
    })

    pickedItemsNames.delete()
    totalPrice = calculateTotalCost()
    setTotalPriceText()
    selectedPickedItemDivs = []
}

function aprovePurchase(){
    clearPickedItems()
}