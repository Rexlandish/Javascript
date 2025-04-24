let buttonContainer;
let cpmText;
var buttonCount = 0;

let clickTimes = [];
const queryTime = 500; // How many milliseconds of data to store
let startTime; // Time of first button press

// Get necessary references
function getElementReferences() {
    buttonContainer = document.getElementById("button-container");
    cpmText = document.getElementById("clicks-per-second");
    console.log("Finished preparing!")
}

function UpdateCPS() {

    // Don't calculate clicks per second if there aren't two clicks registered.
    // Two are neededd to define a period of time to calculate over
    if (clickTimes.length < 2)
        return;
    
    // Calculate clicks per second. Click Times automatically removes any click times that are outside of the query time.
    const clickCount = clickTimes.length;
    const elapsedTime = (timeSinceStart() - clickTimes[0]) / 1000; // Time between last click and last click within query time.

    const clicksPerSecond = clickCount / elapsedTime;

    cpmText.textContent = clicksPerSecond.toFixed(2) + " clicks per second";
}

function beginCPMUpdateLoop()
{
    // Record the time the button was first clicked.
    startTime = Date.now();
    setInterval(UpdateCPS, 100);
}

function timeSinceStart() {
    return Date.now() - startTime; // Saves on having to store large numbers
}

// Check if all recorded click times are within a period of time.
// Delete them if not.
function UpdateClickTimes() {
    for (let i = clickTimes.length; i >= 0; i--) {
        // If the clicktime stored is past the query time, delete it
        if (timeSinceStart() - clickTimes[i] > queryTime)
        {
            console.log(timeSinceStart() - clickTimes[i]);
            const indexToRemove = clickTimes.indexOf(clickTimes[i]);
            clickTimes.splice(indexToRemove, 1);
        }
    }    
}

// Increase button count on click and update visuals
function increaseButtonCount() {

    if (buttonCount == 0)
    {
        beginCPMUpdateLoop();
    }

    buttonCount ++;
    clickTimes.push(Date.now() - startTime);
    console.log(Date.now() - startTime);
    console.log(clickTimes);

    UpdateClickTimes();
    UpdateButtonText();
    UpdateCPS();
}

function UpdateButtonText() {
    finalMessage = `Clicked ${buttonCount} times! `;

    // Add different messages based on what multiple of 20 the click count has passed
    let progressCounter = Math.floor(buttonCount / 20);
    console.log(progressCounter);
    switch (progressCounter) {
        case 0:
            ShowMessage("You're on your way...");
            break;
        case 1:
            ShowMessage("Look at those clicks!");
            break;
        case 2:
            ShowMessage("You're on a clickathon!!");
            break;
        case 3:
            ShowMessage("There's no stopping you!!!");
            break;
        case 4:
            ShowMessage("You're the master of clicking!!!!!!!");
            break;
        case 5:
            ShowMessage("Wow...!!!!!!!!!!!!!!!!!!");
            break;
        default:
            ShowMessage("INCONCEIVABLE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            break;
    }

}

// Function to create two new h1 elements to display click data
const ShowMessage = function (message) {

    while (buttonContainer.firstChild) {
        buttonContainer.removeChild(buttonContainer.firstChild);
    }

    const clickCount = document.createElement("h1")
    clickCount.textContent = `Clicked ${buttonCount} times!`;

    // Create a second h1 with message
    const newMessage = document.createElement("h1")
    newMessage.textContent = message;

    buttonContainer.appendChild(clickCount);
    buttonContainer.appendChild(newMessage);
}


getElementReferences();
