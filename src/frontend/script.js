document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskTime = document.getElementById("taskTime");
    let taskText = taskInput.value.trim();
    let timeText = taskTime.value;

    if (taskText === "") return;

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text" onclick="toggleTask(this)">${taskText}</span>
        <span class="task-time">${timeText || "⏳ Pas d'heure"}</span>
        <button onclick="deleteTask(this)">❌</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
    taskTime.value = "";
}

function toggleTask(element) {
    element.classList.toggle("completed");
    saveTasks();
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").innerText,
            time: li.querySelector(".task-time").innerText,
            completed: li.querySelector(".task-text").classList.contains("completed"),
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text ${task.completed ? 'completed' : ''}" onclick="toggleTask(this)">${task.text}</span>
            <span class="task-time">${task.time}</span>
            <button onclick="deleteTask(this)">❌</button>
        `;
        taskList.appendChild(li);
    });
}
