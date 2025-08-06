// Array to store tasks
let toDoList = [];

// Current filter state: "all", "active", or "completed"
let currentFilter = "all";

// Render the to-do list based on current filter
function renderList() {
  const listElement = document.getElementById("todo-list");
  // Clear current list content
  listElement.innerHTML = "";

  // Filter tasks according to currentFilter
  const filteredTasks = toDoList.filter((task) => {
    if (currentFilter === "active") return !task.checked;
    if (currentFilter === "completed") return task.checked;
    return true; // "all" shows everything
  });

  // Render each filtered task
  filteredTasks.forEach((task) => renderToDo(task));
}

// Render a single task item in the list
function renderToDo(task) {
  const listElement = document.getElementById("todo-list");

  // Create list item and assign unique ID
  const listItem = document.createElement("li");
  listItem.setAttribute("data-id", task.id);

  // Create checkbox for completed status
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.checked;
  checkbox.addEventListener("change", () => {
    task.checked = checkbox.checked;
    renderList();
  });

  // Create span for task text
  const span = document.createElement("span");
  span.textContent = task.text;
  if (task.checked) {
    span.style.textDecoration = "line-through";
    span.style.color = "gray";
  }

  // Create Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    const newText = prompt("Edit task:", task.text);
    if (newText !== null && newText.trim() !== "") {
      task.text = newText.trim();
      renderList();
    }
  });

  // Create Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    toDoList = toDoList.filter((t) => t.id !== task.id);
    renderList();
  });

  // Append all elements to the list item
  listItem.appendChild(checkbox);
  listItem.appendChild(span);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);

  // Append the list item to the ul
  listElement.appendChild(listItem);
}

// Add new task to the list and render
function addTodo(text) {
  const todo = {
    text: text,
    checked: false,
    id: Date.now(),
  };
  toDoList.push(todo);
  renderList();
}

// Add task button event
document.getElementById("addTask").addEventListener("click", () => {
  const inputTask = document.getElementById("inputTask");
  const taskText = inputTask.value.trim();
  if (taskText === "") {
    alert("Please add something");
    return;
  }
  addTodo(taskText);
  inputTask.value = "";
  inputTask.focus();
});

// Delete last task button event
document.getElementById("deleteLast").addEventListener("click", () => {
  if (toDoList.length === 0) {
    alert("There are no tasks to remove!");
    return;
  }
  toDoList.pop();
  renderList();
});

// Delete all tasks button event (NEW)
document.getElementById("deleteAll").addEventListener("click", () => {
  if (toDoList.length === 0) {
    alert("There are no tasks to remove!");
    return;
  }
  toDoList = []; // Clear the entire array
  renderList();  // Re-render empty list
});

// Filter buttons event listeners
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update current filter value from data-filter attribute
    currentFilter = btn.getAttribute("data-filter");
    renderList();
    // Update active button styling
    document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});