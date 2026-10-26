let taskForm = document.querySelector(".task-input");
let taskInput = document.querySelector(".task-input input");
let taskList = document.querySelector("#tasks");
let checkmark = document.querySelector(".checkmark");
let tasksLeft = document.querySelector("#tasks-left");
let progressBar = document.querySelector("#progress-bar");
let progressText = document.querySelector("#progress-text");

function updateTaskCount() {
    let allTasks = taskList.querySelectorAll("li");
    let totalTasks = allTasks.length;

    let completedTasks = taskList.querySelectorAll(
        'input[type="checkbox"]:checked'
    ).length;

    // Update task counters
    checkmark.querySelector("h1").innerText =
        `${completedTasks}/${totalTasks}`;

    tasksLeft.innerText = totalTasks - completedTasks;

    // Calculate progress percentage
    let percentage = totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    // Update progress bar and text
    progressBar.style.width = `${percentage}%`;
    progressText.innerText = `${percentage}% completed`;
}


taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let taskText = taskInput.value.trim();

    if (taskText !== "") {
       
let taskItem = document.createElement("li");

let checkbox = document.createElement("input");
checkbox.type = "checkbox";

let taskLabel = document.createElement("span");
taskLabel.innerText = taskText;

taskItem.appendChild(checkbox);
taskItem.appendChild(taskLabel);

taskList.appendChild(taskItem);

        taskInput.value = "";
         updateTaskCount();
    }
});
taskList.addEventListener("change", function(event) {
    if (event.target.type === "checkbox") {
        updateTaskCount();
    }
});

let filterButtons = document.querySelectorAll(".task-filters button");

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let filter = button.dataset.filter;
        let allTasks = taskList.querySelectorAll("li");

        allTasks.forEach(function(task) {
            let checkbox = task.querySelector('input[type="checkbox"]');

            if (filter === "all") {
                task.style.display = "flex";
            } else if (filter === "active") {
                task.style.display = checkbox.checked ? "none" : "flex";
            } else if (filter === "completed") {
                task.style.display = checkbox.checked ? "flex" : "none";
            }
        });
    });
});

let clearCompletedButton = document.querySelector("#clear-completed");

clearCompletedButton.addEventListener("click", function() {
    let completedTasks = taskList.querySelectorAll(
        'input[type="checkbox"]:checked'
    );

    completedTasks.forEach(function(checkbox) {
        checkbox.closest("li").remove();
    });

    updateTaskCount();
});
