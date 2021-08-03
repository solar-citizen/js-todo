"use strict";

// tasks list
const tasksList = document.querySelector(".tasks-list"),
  taskItem = tasksList.querySelector(".tasks-list__task"),
  taskName = taskItem.querySelector(".task__name"),
  checkbox = taskItem.querySelector(`[type="checkbox"]`),
  // form
  addForm = document.querySelector("form.add-task"),
  submitBtn = addForm.querySelector(".add-task__btn"),
  taskInput = addForm.querySelector(".add-task__input");

const addToTaskList = (task, parent) => {
  parent.innerHTML += `
      <li class="tasks-list__task">
        <input onclick="finishedTask()" class="task__check" type="checkbox" />
        <span class="task__name"
          >${task}
          <div class="task__delete"></div>
        </span>
      </li>
      `;

  deleteFromTaskList();
};

function deleteFromTaskList() {
  document.querySelectorAll(".task__delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.parentElement.parentElement.remove();
    });
  });
}

submitBtn.addEventListener("click", (e) => {
  const newTask = taskInput.value;
  e.preventDefault();

  if (newTask) {
    addToTaskList(newTask, tasksList);
  }

  taskInput.value = "";
});

const finishedTask = () => {
  const finished = checkbox.checked;

  if (finished) {
    checkbox.nextElementSibling.classList.add("finished");
  } else {
    checkbox.nextElementSibling.classList.remove("finished");
  }
};

deleteFromTaskList();
