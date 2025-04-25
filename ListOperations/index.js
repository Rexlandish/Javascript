class ListElement {
    constructor(r, g, b) { // For determining constant background color
        this.r = r;
        this.g = g;
        this.b = b;
    }

    convertToHtml() {
        let numberContainer = document.createElement("div");
        numberContainer.classList.add("number-container");
        let rgbNumbers = document.createElement("p");
        rgbNumbers.innerHTML = `${this.r.toFixed(0)}<br>${this.g.toFixed(0)}<br>${this.b.toFixed(0)}`;
        rgbNumbers.style.color = "#00000033";
        numberContainer.style.padding = "1rem";
        numberContainer.style.backgroundColor = `rgb(${this.r}, ${this.g}, ${this.b})`

        numberContainer.appendChild(rgbNumbers);

        return numberContainer;
    }
}

let arrayElements = []

const arrayDisplay = document.querySelector(".array-elements");
const indexToRemoveAt = document.querySelector(".index-remove");

function updateList() {

    while (arrayDisplay.firstElementChild) {
        arrayDisplay.removeChild(arrayDisplay.firstElementChild);
    }

    let counter = 0;
    arrayElements.forEach(element => {    
        let elementHtml =  element.convertToHtml();
        
        // Add an overlay of the index over the list element
        let indexOverlay = document.createElement("p");
        indexOverlay.textContent = counter;
        indexOverlay.classList.add("number-overlay");
        counter++;

        elementHtml.appendChild(indexOverlay);
        
        arrayDisplay.appendChild(elementHtml);
    });
}

function newElement() {
    return new ListElement(Math.random() * 128 + 128, Math.random() * 128 + 128, Math.random() * 128 + 128);
}

function addFirst() {
    arrayElements.unshift(newElement());
    updateList();
}

function addLast() {
    arrayElements.push(newElement());
    updateList();
}

function removeFirst() {
    if (arrayElements.length <= 0) 
        alert("There's nothing to delete!");

    arrayElements.shift();
    updateList();
}

function removeLast() {
    if (arrayElements.length <= 0) 
        alert("There's nothing to delete!");
    
    arrayElements.pop();
    updateList();
}

function removeIndex() {

    // Return if index to remove is an invalid value

    if (indexToRemoveAt.value >= arrayElements.length) {
        alert(`Index ${indexToRemoveAt.value} is outside the list!`)
        return;
    }

    if (isNaN(parseInt(indexToRemoveAt.value))) {
        alert(`Invalid value! ${indexToRemoveAt.value}`)
        return;
    }

    arrayElements.splice(indexToRemoveAt.value, 1);
    updateList();
}
