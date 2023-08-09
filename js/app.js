const listContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");
const deteleListButton = document.querySelector("[data-delete-list-button]");
const listDisplayContainer = document.querySelector(
  "[data-list-display-container]"
);
const lisTitleElement = document.querySelector("[data-list-title]");
const listCountElement = document.querySelector("[data-list-count]");
const taskContainer = document.querySelector("[data-task]");
const taskTemplate = document.getElementById("task-template");
const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");
const clearCompleteTaskButton = document.querySelector(
  "[data-clear-complete-tasks-button]"
);

//list TODO create objec id and name
// let lists = [{
//     id: Date.now(),
//     name: 'name'
// }, {
//     id: Date.now(),
//     name: 'todo'
// }];
//namespace prevent collision or overwriting
const local_storage_list_key = "task.list";
const local_storage_selected_list_id_key = "task.selectedListId";

//get list from localstorage
let lists = JSON.parse(localStorage.getItem(local_storage_list_key)) || [];
let selectedListId = localStorage.getItem(local_storage_selected_list_id_key);

listContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedListId = e.target.dataset.listId;
    saveAndRender();
  }
});

taskContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedList = lists.find((list) => list.id === selectedListId);
    console.log(selectedList);
    const selectTask = selectedList.task.find(
      (task) => task.id === e.target.id
    );
    selectTask.complete = e.target.checked;
    console.log(selectTask);
    save();
    renderTaskCount(selectedList);
  }
});

clearCompleteTaskButton.addEventListener("click", (e) => {
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.task = selectedList.task.filter((task) => !task.complete);
  saveAndRender();
});

deteleListButton.addEventListener("click", (e) => {
  lists = lists.filter((list) => list.id !== selectedListId);
  selectedListId = null;
  saveAndRender();
});


newListForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const listName = newListInput.value;
  if (listName == null || listName === "") return;
  const list = createList(listName);
  newListInput.value = null;
  lists.push(list);
  saveAndRender();
});

function createList(name) {
  return {
    id: Date.now().toString(),
    name: name,
    task: [],
  };
}

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName == null || taskName === "") return;
  const task = createtask(taskName);
  newTaskInput.value = null;
  const selectedList = lists.find((list) => list.id === selectedListId);
  selectedList.task.push(task);
  saveAndRender();
});

function createtask(taskName) {
  return {
    id: Date.now().toString(),
    name: taskName,
    complete: false,
  };
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(local_storage_list_key, JSON.stringify(lists));
  localStorage.setItem(local_storage_selected_list_id_key, selectedListId);
}

function render() {
  //<li class="list-name">Grocery</li>

  clearElement(listContainer);
  renderList();
  const selectedList = lists.find((list) => list.id === selectedListId);
  if (selectedListId === null || selectedListId === "null") {
    listDisplayContainer.style.display = "none";
  } else {
    listDisplayContainer.style.display = "";
    lisTitleElement.innerText = selectedList.name;
    renderTaskCount(selectedList);
    clearElement(taskContainer);
    renderTasks(selectedList);
  }
}

function renderTasks(selectedList) {
  selectedList.task.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    taskContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedList) {
  const incompleteTasksCount = selectedList.task.filter(
    (task) => !task.complete
  ).length;
  const traskString = incompleteTasksCount === 1 ? "Task" : "Tasks";
  listCountElement.innerText = `${incompleteTasksCount} ${traskString} remaining`;
}

function renderList() {
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    if (list.id === selectedListId) {
      listElement.classList.add("active-list");
    }
    listContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  //delete html original
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();
console.log(listContainer);
