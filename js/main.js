"use strict";

const addTaskBtn = document.querySelector(".add-task__btn"),
  taskInput = document.querySelector(".add-task__input"),
  tasksList = document.querySelector(".tasks-list"),
  emptyMessage = document.querySelector(".empty-message");

let tasks;
let todoItemElements = [];

!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

function Task(description, completed) {
  this.description = description;
  this.completed = completed;
  completed = false;
}

const createInitialTemplate = () => {
  if (tasks.length == 0) {
    tasks.push(new Task("Wake up", true));
    tasks.push(new Task("Pay bills", true));
    tasks.push(new Task("Read a book", false));
  }
};

// Wake up (green) // Pay bills (green) // Read a book (red)
const createTemplate = (task, i) => {
  return `
    <li class="tasks-list__task ${task.completed ? "finished" : ""}">
      <input
        onclick="finishedTask(${i})"
        class="task__check"
        type="checkbox"
        ${task.completed ? "checked" : ""}
      />
      <span class="task__description"
        >${task.description}
        <div onclick="deleteTask(${i})" class="task__delete"></div>
      </span>
    </li>
  `;
};

const fillHtmlList = () => {
  tasksList.innerHTML = "";

  if (tasks.length > 0) {
    tasks.forEach((item, i) => {
      tasksList.innerHTML += createTemplate(item, i);
    });

    todoItemElements = document.querySelectorAll(".tasks-list__task");
  }
};

const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const updateFill = () => {
  updateLocalStorage();
  fillHtmlList();
  displayIfEmptyTasks();
};

// if task completed
const finishedTask = (i) => {
  tasks[i].completed = !tasks[i].completed;

  if (tasks[i].completed) {
    todoItemElements[i].classList.add("finished");
  } else {
    todoItemElements[i].classList.remove("finished");
  }

  updateFill();
};

const deleteTask = (i) => {
  todoItemElements[i].classList.add("delete");

  setTimeout(() => {
    tasks.splice(i, 1);
    updateFill();
  }, 750);
};

const displayIfEmptyTasks = () => {
  if (!tasks.length) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
};

addTaskBtn.addEventListener("click", (element) => {
  element.preventDefault();

  if (taskInput.value) {
    tasks.push(new Task(taskInput.value));
    updateFill();
  }

  taskInput.value = "";
});

createInitialTemplate();
fillHtmlList();
displayIfEmptyTasks();
