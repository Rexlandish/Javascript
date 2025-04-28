class Task {
    constructor(task, isDone) {
        this.taskTitle = task;
        this.isDone = isDone;
    }
}

let taskList = []
function addTask () {
    const taskName = document.querySelector("input.task-name").value;
    if (taskName == "") return; // If no task name provided, ignore

    taskList.push(new Task(taskName));
    updateTaskDisplay();
}

function updateTaskDisplay() {

    // Delete all visuals
    const taskDisplay = document.querySelector(".task-display");

    while (taskDisplay.firstElementChild) {
        taskDisplay.removeChild(taskDisplay.firstElementChild);
    }

    console.log(taskList);
    // Loop over taskList tasks

    for (let i = 0; i < taskList.length; i++) {
        const currentTask = taskList[i];
     
        
        let taskContainer = document.createElement("div");
        taskContainer.classList.add("task")
    
        let taskName = document.createElement("h3");
        taskName.textContent = currentTask.taskTitle;
        if (currentTask.isDone){
            taskName.style.textDecoration = "line-through";
        }
        
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if (currentTask.isDone){
            checkbox.checked = true;
        }

        checkbox.addEventListener("change", ev => {
            setTaskChecked(i, ev.currentTarget.checked);
        });

        let removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            removeTask(i);
        });
        
        taskContainer.appendChild(taskName);
        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(removeButton);
    
        taskDisplay.appendChild(taskContainer);

    }
}

// Set the corresponding task as checked
function setTaskChecked(index, isChecked)
{
    console.log(index, isChecked);
    taskList[index].isDone = isChecked;
    updateTaskDisplay();
}

function removeTask(index) {
    taskList.splice(index, 1);
    updateTaskDisplay();
}

document.querySelector("#add-task").addEventListener("click", addTask);