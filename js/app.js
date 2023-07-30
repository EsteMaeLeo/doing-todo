const listContainer = document.querySelector("[data-lists]");

//list TODO
let lists = ["name", "todo"];

function render() {
  //<li class="list-name">Grocery</li>
  console.log(listContainer);
  clearElement(listContainer);
  lists.forEach((list) => {
    const listElement = document.createElement("li");
    listElement.classList.add("list-name");
    listElement.innerText = list;
    listContainer.appendChild(listElement)
  });
}

function clearElement(element) {
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

render();
console.log(listContainer);
