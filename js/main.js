"use strict";

// init elements
const addTaskBtn = document.querySelector(".add-task__btn"),
  taskInput = document.querySelector(".add-task__input"),
  tasksList = document.querySelector(".tasks-list"),
  emptyMessage = document.querySelector(".empty-message");

let tasks;
let todoItemElements = [];

// get tasks FROM local storage
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

// --- --- functions --- ---
//
// task constructor
const Task = class {
  constructor(description, completed) {
    this.description = description;
    this.completed = completed;
    completed = false;
  }
};

// pre-generated tasks template
const createInitialTemplate = () => {
  if (tasks.length == 0) {
    tasks.push(new Task("Wake up", true));
    tasks.push(new Task("Pay bills", true));
    tasks.push(new Task("Read a book", false));
  }
};

// task template
//
// tasks are based on local storage values
// new tasks are always red and unchecked
const createTemplate = (task, i) => {
  return `
    <li class="tasks-list__task ${task.completed ? "completed" : ""}">
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

// fill tasks list with task(-s)
const fillHtmlList = () => {
  tasksList.innerHTML = "";

  if (tasks.length > 0) {
    tasks.forEach((item, i) => {
      tasksList.innerHTML += createTemplate(item, i);
    });

    todoItemElements = document.querySelectorAll(".tasks-list__task");
  }
};

// send task(-s) TO local storage
const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// display message if task list is empty
const displayIfEmptyTasks = () => {
  if (!tasks.length) {
    emptyMessage.style.display = "block";
  } else {
    emptyMessage.style.display = "none";
  }
};

// 3 in 1
const updateFill = () => {
  updateLocalStorage();
  fillHtmlList();
  displayIfEmptyTasks();
};

// change styles of task if it's completed
const finishedTask = (i) => {
  tasks[i].completed = !tasks[i].completed;

  // add/remove class if task completed/uncompleted
  if (tasks[i].completed) {
    todoItemElements[i].classList.add("completed");
  } else {
    todoItemElements[i].classList.remove("completed");
  }

  updateFill();
};

// delete task from tasks list
const deleteTask = (i) => {
  todoItemElements[i].classList.add("delete");

  setTimeout(() => {
    tasks.splice(i, 1);
    updateFill();
  }, 750);
};

// delete task from tasks list
addTaskBtn.addEventListener("click", (element) => {
  element.preventDefault();

  // if theres something in input
  // create new task object
  // and put it to tasks array
  if (taskInput.value) {
    tasks.push(new Task(taskInput.value));
    updateFill();
  }

  taskInput.value = "";
});

// function calls
createInitialTemplate();
fillHtmlList();
displayIfEmptyTasks();
