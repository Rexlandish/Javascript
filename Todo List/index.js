const listContainer = document.querySelector(".todo-list-container");

function addTask(obj) {

    const taskDescriptionText = obj.previousElementSibling.value;
    if (taskDescriptionText == "") {
        alert("No text provided");
        return;
    }
    
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task", "pill");
    
    // Load task description from input value
    const taskDescription = document.createElement("p")
    obj.previousElementSibling.value = "";

    taskDescription.textContent = taskDescriptionText;
    
    const deleteButton = document.createElement("button");
    deleteButton.onclick = function () { deleteTask(this) };

    const innerIcon = document.createElement("i");
    innerIcon.classList.add("fa-solid", "fa-trash");

    deleteButton.appendChild(innerIcon);

    taskContainer.appendChild(taskDescription);
    taskContainer.appendChild(deleteButton);

    
    listContainer.appendChild(taskContainer);

    setTimeout(() => {
        taskContainer.classList.add("appear");
    }, 1);
    

}

function deleteTask(obj) {
    obj.parentElement.classList.add("disappear");
    setTimeout(() => {
        obj.parentElement.remove();  
    }, 300);
}