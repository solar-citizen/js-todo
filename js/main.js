"use strict";

const addTaskBtn = document.querySelector(".add-task__btn"),
  taskInput = document.querySelector(".add-task__input"),
  tasksList = document.querySelector(".tasks-list");

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
  if (tasks.length < 3) {
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
      <span class="task__name"
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
};

const finishedTask = (i) => {
  tasks[i].completed = !tasks[i].completed;

  if (tasks[i].completed) {
    todoItemElements[i].classList.add("finished");
  } else {
    todoItemElements[i].classList.remove("finished");
  }
  updateFill();
};

addTaskBtn.addEventListener("click", () => {
  tasks.push(new Task(taskInput.value));
  updateFill();
  taskInput.value = "";
});

const deleteTask = (i) => {
  todoItemElements[i].classList.add("delete");

  setTimeout(() => {
    tasks.splice(i, 1);
    updateFill();
  }, 750);
};

createInitialTemplate();
fillHtmlList();
