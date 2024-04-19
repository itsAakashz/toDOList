// script.js
// Get references to DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Fetch all to-dos from the server and render them
async function fetchTodos() {
  const response = await fetch("/api/todos");
  const todos = await response.json();
  renderTodos(todos);
}

// Add a new to-do by sending a POST request to the server
async function addTodo() {
  const task = todoInput.value.trim();
  if (task !== "") {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });
    const newTodo = await response.json();
    todoInput.value = "";
    fetchTodos();
  }
}

// Remove a to-do by sending a DELETE request to the server
async function removeTodoById(id) {
  await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });
  fetchTodos();
}

// Render to-dos to the DOM
function renderTodos(todos) {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.task;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove");
    removeButton.addEventListener("click", () => removeTodoById(todo._id));
    li.appendChild(removeButton);
    todoList.appendChild(li);
  });
}

// Event listener for form submission
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

// Fetch initial to-dos when page loads
fetchTodos();
