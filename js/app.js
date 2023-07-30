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
let lists = [{
    id: 1,
    name: 'name'
}, {
    id: 2,
    name: 'todo'
}];

newListForm.addEventListener('submit', e=> {
    e.preventDefault();
}) 


function render() {
  //<li class="list-name">Grocery</li>
  
  clearElement(listContainer);
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.dataset.listId = list.id
    listElement.classList.add("list-name");
    listElement.innerText = list.name;
    listContainer.appendChild(listElement)
  });
}

function clearElement(element) {
    //delete html original
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

render();
console.log(listContainer);
