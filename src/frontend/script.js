document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskText}</span>
        <button onclick="deleteTask(this)">❌</button>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
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
            text: li.querySelector("span").innerText,
            completed: li.querySelector("span").classList.contains("completed"),
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
            <span onclick="toggleTask(this)" class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="deleteTask(this)">❌</button>
        `;
        taskList.appendChild(li);
    });
}
