 //1.create task block 
//2.create task with data 
//3.delete one task 
//4.clear all tasks 
//5.save task data 
//6.load task data  
//7.clear form 
// Variables to store task data
var taskList = [];

// onLoad
function onLoad() {
    taskList = loadData();
    createTask();
}

// 1. Create the task block
let createTask = () => {
    let taskNote = document.getElementById("wrapper");
    taskNote.innerHTML = "";
    for (let i = 0; i < taskList.length; i++) {
        task += `
    <li class="task">
        <div class="btn">
          <button onclick="deleteTask(${i})" class="btn"><i class="bi bi-x"></i></button>
        </div>
        <div class="task-content">
          <span>${taskList[i].content}</span>
          <div>${taskList[i].date}</div>
          <div>${taskList[i].time}</div>
        </div>
      </li>
    `;
    }
    taskNote.innerHTML = task;
    saveTasks(taskList);
};

// 2. Create task with data
function dataTask() {
    let content = document.getElementById("content").value;
    let time = document.getElementById("time").value;
    let date = document.getElementById("date").value;
    addTasks(content, time, date);
    createTask();

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

// 3. Create a new JSON to represent a new task
function addTasks(content, date, time) {
    const task = {
        content,
        date,
        time,
    };
    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

// 4. Delete one task
function deleteTask(offset) {
    let removeConfirm = confirm("Delete?");
    if (!removeConfirm) return;
    const tasks = getTasks();
    tasks.splice(offset, 1);
    saveTasks(tasks);
}

// 5. Delete - clear all tasks
function clearAll() {
    let removeAllConfirm = confirm("Clear all?");
    if (!removeAllConfirm) return;
    taskList.splice(0); // Clears the array
    saveTasks([]);
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
