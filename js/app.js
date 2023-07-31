const listContainer = document.querySelector("[data-lists]");
const newListForm = document.querySelector("[data-new-list-form]");
const newListInput = document.querySelector("[data-new-list-input]");

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

let lists = JSON.parse(localStorage.getItem(local_storage_list_key)) || [];

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

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(local_storage_list_key, JSON.stringify(lists));
}

function render() {
  //<li class="list-name">Grocery</li>

  clearElement(listContainer);
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id;
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
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
