// store task data
var taskList = [];

// onLoad
function onLoad() {
    taskList = loadData();
    createTask();
}

// 1. Create the task block
let createTask = () => {
    let taskContainer = document.getElementById("container");
    taskContainer.innerHTML = "";
    taskContainer.style.display = "flex"; // Set the display to flex

    for (let i = 0; i < taskList.length; i++) {
        let taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        // note background
        let imageUrl = taskList[i].image;
        taskDiv.style.backgroundImage = `url(${imageUrl})`;


        let deleteButton = document.createElement("button");
        deleteButton.innerText = "x";
        deleteButton.onclick = () => deleteTask(i); // i is the offset

        let taskContent = document.createElement("div");
        taskContent.classList.add("task-content");
        let contentSpan = document.createElement("span");
        contentSpan.innerText = taskList[i].content;
        let dateDiv = document.createElement("div");
        dateDiv.innerText = "Date: " + taskList[i].date;
        let timeDiv = document.createElement("div");
        timeDiv.innerText = "Time: " + taskList[i].time;

        taskContent.appendChild(contentSpan);
        taskContent.appendChild(dateDiv);
        taskContent.appendChild(timeDiv);

        taskDiv.appendChild(deleteButton);
        taskDiv.appendChild(taskContent);

        taskContainer.appendChild(taskDiv);
    }
    saveTasks(taskList);
};

// 2. Create task with data
function dataTask() {
    let content = document.getElementById("content").value;
    let time = document.getElementById("time").value;
    let date = document.getElementById("date").value;
    // Check if any of the fields are empty
    if (content === "" || time === "" || date === "") {
        alert("Please fill in all the fields before adding a task.");
        return; // Exit the function if any field is empty
    }

    //creating the task if all fields are filled
    addTask(content, date, time);

    // Reset the form after submit
    document.getElementById("taskForm").reset();

    // Display the task note below the form
    const taskNote = document.getElementById("taskNote");
    taskNote.innerHTML = `Task: ${content}<br>Date: ${date}<br>Time: ${time}`;

    // Fade in the added note
    taskNote.classList.toggle("fadeIn-task");

    // Remove the fadeIn class after a delay
    setTimeout(function () {
        taskNote.classList.remove("fadeIn-task");
    }, 2000);
}

// 3. Add a new task
function addTask(content, date, time) {
    const task = {
        content,
        date,
        time,
    };
    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
    taskList = tasks;
    createTask();
}

//note image background
let addTasks = (content, date, time) => {

    let imageUrl = "assets/notebg.png";

    let task = {
        content,
        date,
        time,
        image: imageUrl,
    };
    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    // Refresh the task list
    createTask();
}




// 4. Delete one task
function deleteTask(offset) {
    let removeConfirm = confirm("Delete?");
    if (!removeConfirm) return;
    const tasks = getTasks();
    tasks.splice(offset, 1);
    saveTasks(tasks);
    taskList = tasks; // Update the taskList variable
    createTask();
}

// 5. Delete - clear all tasks
function clearAll() {
    let removeAllConfirm = confirm("Clear all?");
    if (!removeAllConfirm) return;
    // Clear the taskList array
    taskList = [];
    // Clear the tasks stored in local storage
    localStorage.removeItem("tasks");
    // Update the task display
    createTask();
}

// 6. Save tasks array to local storage
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 7. Load/retrieve - get tasks as JSON object
function getTasks() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
        return JSON.parse(tasks);
    }
    return [];
}

// 8. Clear form
function clearForm(event) {
    event.preventDefault();
    document.getElementById("taskForm").reset();
}