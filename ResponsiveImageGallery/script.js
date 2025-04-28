const addImageButton = document.querySelector("button#add-image-button");
const addExamplesButton = document.querySelector("button#add-examples-button");
const urlInput = document.querySelector("#url-input");
const imageDisplay = document.querySelector("#image-display");

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)) };

function addImage() {
    const imageUrl = urlInput.value;

    console.log(imageUrl);
    if (imageUrl) {
        let imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        
        let image = document.createElement("img");
        image.src = imageUrl;
        image.classList.add("image");

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");

        removeButton.addEventListener("click", () => {
            imageContainer.classList.add("hidden");
            setTimeout(function () { imageDisplay.removeChild(imageContainer)}, 200);
        });

        imageContainer.appendChild(image);
        imageContainer.appendChild(removeButton);

        imageDisplay.append(imageContainer);

        imageContainer.addEventListener("mouseover", function () {
            removeButton.style.opacity = 1;
            removeButton.style.pointerEvents = "initial";
        })

        imageContainer.addEventListener("mouseleave", function () {
            removeButton.style.opacity = 0;
            removeButton.style.pointerEvents = "none";
        })


        image.addEventListener("load", function() {
        
            // Find aspect ratio of image
            let aspectRatio = image.naturalHeight / image.naturalWidth;
            let roundedAspectRatio;

            // Round the aspect ratio to the nearest whole numeber to fit neatly in the grid.
            if (aspectRatio < 1) { // Handle less-than-1 aspect ratios
                roundedAspectRatio = Math.ceil(1 / aspectRatio);
                imageContainer.style.gridColumn = `span ${roundedAspectRatio}`;
            }
            else {
                roundedAspectRatio = Math.round(aspectRatio);
                imageContainer.style.gridRow = `span ${roundedAspectRatio}`;
            }
                        
            
            

        })

    }
}


let placeholderImageList = [
    "images/catnip-ball.jpg",
    "images/listening-cat.jpg",
    "images/silent-contempt.jpg",
    "images/cat-sitting.jpg",
    "images/two-cats.jpg"
]
async function addExampleImages() {

    for (let j = 0; j < 2; j++) {
        
        for (let i = 0; i < placeholderImageList.length; i++) {
            const element = placeholderImageList[i];
            
            urlInput.value = element;
            console.log("Adding image", element);
            addImage();
            
        }
    }

    urlInput.value = "";
}

addImageButton.addEventListener("click", addImage);
addExamplesButton.addEventListener("click", addExampleImages);