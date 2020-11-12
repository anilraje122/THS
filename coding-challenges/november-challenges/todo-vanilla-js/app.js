/* Import UI elements */
const task = document.querySelector("#task");
const addTask = document.querySelector("#addTask");
const todoList = document.querySelector("#todo-list");

/* Add all event listeners */
addEventListeners = () => {
  document.addEventListener("DOMContentLoaded", getTasks);
  addTask.addEventListener("click", addNewTask);
  todoList.addEventListener("click", editOrRemoveTask);
};

/* Fetch all tasks from LS */
getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    // Add tasks to UI
    tasks.forEach((task) => {
      addNewTaskToUI(task.taskName);
    });
  }
};

/* Add new task to UI and LS */
addNewTask = (e) => {
  if (task.value === "") {
    alert("Task name is required");
  } else {
    addNewTaskToUI(task.value);
    addNewTaskToLS(task.value);
    task.value = "";
  }
  e.preventDefault();
};

/* Add new task to UI */
addNewTaskToUI = (taskName) => {
  // Create new list item
  const li = document.createElement("li");
  li.className = "border p-3 mt-2";

  const p = document.createElement("p");
  p.className = "text-left";
  p.textContent = taskName;

  const btnWrapper = document.createElement("div");
  btnWrapper.className = "text-right mt-1";

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-warning mr-2 editTask";
  editBtn.innerHTML = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger mr-2 deleteTask";
  deleteBtn.innerHTML = "Delete";

  // Append new list item to task list
  btnWrapper.appendChild(editBtn);
  btnWrapper.appendChild(deleteBtn);
  li.appendChild(p);
  li.appendChild(btnWrapper);
  todoList.appendChild(li);
};

/* Add new task to LS */
addNewTaskToLS = (task) => {
  let newTask = {
    taskName: task,
  };
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  if (!tasks) {
    tasks = [];
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

/* Update or Remove task */
editOrRemoveTask = (e) => {
  const targetClasses = Array.from(e.target.classList);
  if (targetClasses.includes("deleteTask")) {
    // Remove from UI
    e.target.parentElement.parentElement.remove();

    // Remove from LS
    console.log(e.target.parentElement.parentElement.firstChild.innerHTML);
    removeTaskfromLS(e.target.parentElement.parentElement.firstChild.innerHTML);
  }

  if (targetClasses.includes("editTask")) {
    // Get values of all elements related to the task which is being modied
    const editBtn = e.target;
    const buttonWrapper = e.target.parentElement;
    const li = e.target.parentElement.parentElement;
    const p = e.target.parentElement.parentElement.firstChild;
    const currentTask = p.innerHTML;
    if (editBtn.textContent === "Update") {
      // Update the new task in UI and LS,
      // also remove the textbox and show hidden p tag with new value
      let et = document.getElementById("editing");
      const newTask = et.value;
      if (newTask == "") {
        alert("Task name is required");
      } else {
        et.remove();
        p.style.display = "block";
        p.innerHTML = newTask;
        editBtn.textContent = "Edit";
        updateTaskInLS(currentTask, newTask);
      }
    } else {
      // Display the task in textbox and hide p element when edit button is clicked
      const editTextbox = document.createElement("input");
      editTextbox.setAttribute("type", "text");
      editTextbox.setAttribute("id", "editing");
      editTextbox.value = currentTask;
      editTextbox.className = "form-control mb-3";
      p.style.display = "none";
      editBtn.textContent = "Update";
      li.insertBefore(editTextbox, buttonWrapper);
    }
  }

  e.preventDefault();
};

/* Remove a task from LS */
removeTaskfromLS = (t) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task, index) => {
      if (task.taskName === t) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

/* Update a task in LS */
updateTaskInLS = (currentTask, newTask) => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
      if (task.taskName === currentTask) {
        task.taskName = newTask;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
};

/* Invoke all event listeners */
addEventListeners();
