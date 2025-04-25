const meanDiv = document.querySelector(".mean");
const medianDiv = document.querySelector(".median");;
const modeDiv = document.querySelector(".mode");;

const stdDevDiv = document.querySelector(".std-dev");;
const varianceDiv = document.querySelector(".variance");;
const iqrDiv = document.querySelector(".iqr");

function calculateValues() {
    
    // Extract float values from input textarea...
    let valueText = document.querySelector("textarea").value.trim(); // Remove trailing spaces
    valueText = valueText.split(" ");

    // Turn each split string into a number
    let values = [];
    valueText.forEach(element => {
        const parsedFloat = parseFloat(element);

        if (isNaN(parsedFloat))
        {
            alert("Error parsing input data!");
            throw new Error("Error parsing data");
        }

        values.push(parsedFloat);
    });


    // ...and sort the list.
    values.sort();

    console.log(values);
    
    // Calculate the values necessary to calculate the final results
    let listSum = 0;
    values.forEach( val => listSum += val );
    
    let listCount = values.length;
    const mean = (listSum/listCount).toFixed(2);
    // Mean
    meanDiv.querySelector(".value h1").innerHTML = mean;

    // Mode
    let countDict = {}
    values.forEach(num => {
        if (countDict[num] == undefined)
            countDict[num] = 0;
        else
            countDict[num]++;
    });
    console.log(countDict);
    // Iterate over the countDict for the maximum value...
    let maxCountKey;
    let maxCount = 0;
    for (var key in countDict) {
        if (countDict[key] > maxCount)
            maxCount = countDict[key];
    }

    // Then find the numbers with the maximum count.
    let modes = []
    for (var key in countDict) {
        if (countDict[key] == maxCount)
        {
            modes.push(parseFloat(key));
        }
    }

    // If all the numbers are at the maximum count, there is no mode.
    if (modes.length == values.length)
        modeDiv.querySelector(".value h1").innerHTML = "N/A";
    else
        modeDiv.querySelector(".value h1").innerHTML = modes.join(", ");
    


    // Median
    let middleIndex = Math.round(listCount/2) - 1;
    medianDiv.querySelector(".value h1").innerHTML = values[middleIndex];

    // Standard Deviation
    let squareOfMean = mean * mean;
    let meanOfSquares = 0
    values.forEach( val => {
        meanOfSquares += val * val;
    });
    meanOfSquares /= values.length;
    const variance = meanOfSquares - squareOfMean;

    varianceDiv.querySelector(".value h1").innerHTML = variance.toFixed(2);
    stdDevDiv.querySelector(".value h1").innerHTML = Math.sqrt(variance).toFixed(2);

    // IQR

    // Find difference between first and third quartiles
    const Q1 = Math.round(listCount * 0.25) - 1;
    const Q3 = Math.round(listCount * 0.75) - 1;
    const IQR = values[Q3] - values[Q1];
    iqrDiv.querySelector(".value h1").innerHTML = IQR;
}