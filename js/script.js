document.addEventListener("DOMContentLoaded", loadTasks);

const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});

function addTask() {
    let taskText = input.value.trim();
    if (taskText === "") {
        showToast("Boş görev ekleyemezsiniz!", "error");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `${taskText} 
        <button class="done">✔</button>
        <button class="delete">✖</button>`;

    todoList.appendChild(li);
    saveTasks();
    input.value = "";

    li.querySelector(".done").addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    showToast("Görev eklendi!", "success");
}

function showToast(message, type) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 2000);
}

// ** Local Storage işlemleri **
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
        tasks.push({ text: li.innerText, completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        input.value = task.text;
        addTask();
        if (task.completed) {
            todoList.lastChild.classList.add("completed");
        }
    });
}
