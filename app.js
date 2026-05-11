const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

let tasks = [];

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const task = {
    id: Date.now(),
    text,
    done: false,
  };

  tasks.push(task);
  renderTasks();
  taskInput.value = "";
}

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// STEP C
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    if (task.done) {
      li.classList.add("done");
    }

    li.innerHTML = `
    <span>${task.text}</span>
    <div class="actions">
      <button class="done-btn" onclick="toggleDone(${task.id})">
        ${task.done ? "Undo" : "Done"}
      </button>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    </div>
    `;

    taskList.appendChild(li);
  });

  updateCount();
}

// STEP D
function toggleDone(id) {
  tasks = tasks.map((task) => {
    return task.id === id ? { ...task, done: !task.done } : task;
  });
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function updateCount() {
  const remaining = tasks.filter((task) => !task.done).length;
  taskCount.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} remaining`;
}
