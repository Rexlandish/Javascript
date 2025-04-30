const screenCover = document.querySelector(".cover");

const input1Display = document.querySelector(".input-1 p");
const operationDisplay = document.querySelector(".operation p");
const input2Display = document.querySelector(".input-2 p");
const outputDisplay = document.querySelector(".display p");


const delay = ms => new Promise(res => setTimeout(res, ms));

function begin() {
    loopify("Audio/BG.ogg",function(err,loop) {

        // If something went wrong, `err` is supplied
        if (err) {
            return console.err(err);
        }
        // Play it whenever you want
        loop.play();
    });

    screenCover.style.opacity = "0";
    screenCover.style.pointerEvents = "none";
}





let equalsVersion = 0;
let equalsSounds = ["Audio/Equals/Equals-1.ogg", "Audio/Equals/Equals-2.ogg", "Audio/Equals/Equals-3.ogg", "Audio/Equals/Equals-4.ogg"]

async function EqualsProcedure() {

        
        let result;
        result = operationFunctions[currentOperation](calculatorInputs[0], calculatorInputs[1]);
        /*
        if (calculatorInputs[1] != 0) {
        }
        else {
            result = "No dividing by zero."
        }
            */

        equalsVersion++;
        if (equalsVersion >= 4) equalsVersion = 0;

        await delay(500);
        
        playNumber(result);
}

function press(button) {

    playSound(button);
    process(button);

}

// Play sound associated with the button
function playSound(button) {
        // Play the next equals sound every time the button is pressed
        if (button == "=") {
            new Audio(equalsSounds[equalsVersion]).play();
        }
    
        else if (button == "^") {
            new Audio("Audio/MoveUp.ogg").play();
        }
    
        else if (button == "v") {
            new Audio("Audio/MoveDown.ogg").play();
        }
    
        else if (button == "C") {
            new Audio("Audio/C.ogg").play();
        }
    
        else if (button == "CE") {
            new Audio("Audio/CE.ogg").play();
        }
    
        // If button is a digit or "decimal"
        else if (!isNaN(parseInt(button)) || button == "decimal")
        {
            new Audio(`Audio/Numbers/${button}.ogg`).play();
        }
    
        // Operations
        else if (button == "+"){
            new Audio(`Audio/Operations/Add.ogg`).play();
        }
    
        else if (button == "-"){
            new Audio(`Audio/Operations/Sub.ogg`).play();
        }
    
        else if (button == "/"){
            new Audio(`Audio/Operations/Div.ogg`).play();
        }
    
        else if (button == "*"){
            new Audio(`Audio/Operations/Mul.ogg`).play();
        }
    
}

let calculatorInputs = [0, 0];
let selectedInput = 0;

// These can be part of a single class
const operationFunctions = {
    "+": (a, b) => {return a + b},
    "-": (a, b) => {return a - b},
    "*": (a, b) => {return a * b},
    "/": (a, b) => {return a / b}
}

const operationNames = {
    "+": "To this number, add...",
    "-": "From this number, subtract...",
    "*": "Multiply this number by...",
    "/": "Divide this number by..."
}

let currentOperation = undefined;

// Process the button press
function process(button) {

    // Process input switching buttons
    switch (button) {
        case "^":
            selectedInput = 0;
            break;
        case "v":
            selectedInput = 1;
            break;
    }


    // Process digit buttons
    if (!isNaN(parseInt(button)) || button == "decimal")
    {
        // Add the pressed button to the end of the selected input
        if (button == "decimal")
        {
            // Removed
        }
        else
        {
            calculatorInputs[selectedInput] *= 10
            calculatorInputs[selectedInput] += button;
        }
    }

    // Process operation buttons
    if (Object.keys(operationFunctions).find(_ => _ == button) != undefined) // If the button is a key in operationFunctions
    {
        currentOperation = button; // Save it under currentOperation

        operationDisplay.innerHTML = operationNames[button];

        // If the user was on the first input, automatically move to the second.
        if (selectedInput == 0)
            selectedInput = 1;

    }

    if (button == "CE")
    {
        calculatorInputs[selectedInput] = 0;
    }

    if (button == "C")
    {
        calculatorInputs[0] = 0
        calculatorInputs[1] = 0;
        operationDisplay.innerHTML = "";
        calculatorInputs[selectedInput] = 0;
        currentOperation = undefined;
        outputDisplay.innerHTML = 0;
    }

    console.log(`${calculatorInputs[0]} ${currentOperation} ${calculatorInputs[1]}`);
    
    if (button == "=")
    {
        EqualsProcedure();
        
        calculatorInputs[0] = 0
        operationDisplay.innerHTML = "";
        calculatorInputs[1] = 0;
        selectedInput = 0;
        currentOperation = undefined;

    }

    updateVisuals();

}

function updateVisuals() {
    input1Display.textContent = calculatorInputs[0].toString();
    input2Display.textContent = calculatorInputs[1].toString();
    
    // Update currently selected input

    let displayList = [input1Display, input2Display];

    displayList.forEach( (inputDisplay) => { // Unselect both inputs
        inputDisplay.parentElement.classList.remove("selected");
    })
    
    displayList[selectedInput].parentElement.classList.add("selected");
}


async function playNumber(number) {
    const numberText = number.toString();

    let finalDisplay = "";

    for (let index = 0; index < numberText.length; index++) {
        const element = numberText[index];   
        

        await delay(75);

        // Play sound and wait
        let digitAudio;
        if (element == ".")
            digitAudio = new Audio(`Audio/Digits/decimal.ogg`);
        else
            digitAudio = new Audio(`Audio/Digits/${element}.ogg`);
        digitAudio.playbackRate = 4;
        digitAudio.preservesPitch = false;
        digitAudio.play();

        finalDisplay += element;
        UpdateResultDisplay(finalDisplay);
        console.log(finalDisplay);
    
    }

    

}

function UpdateResultDisplay(val) {
    outputDisplay.textContent = val;
}

updateVisuals();