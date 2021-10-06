let input = document.querySelector('.todo_input');
let todoList = document.querySelector('.todo_list');
let AddItemBtn = document.querySelector('.todo_button');
let trashbinSvg = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    width="24" height="24"
                    viewBox="0 0 172 172"
                    style=" fill:#000000;"><g transform=""><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><path d="" fill="none"></path><g fill="#000000"><path d="M73.90625,6.71875c-1.85538,0 -3.35937,1.50433 -3.35937,3.35938v10.07813h-36.95312c-1.85538,0 -3.35937,1.50433 -3.35937,3.35938v16.79688c0,1.85505 1.50399,3.35938 3.35938,3.35938h6.71875v109.51563c0,6.29816 5.12372,11.42188 11.42188,11.42188h71.21875c6.29816,0 11.42188,-5.12372 11.42188,-11.42187v-109.51562h6.71875c1.85505,0 3.35938,-1.50433 3.35938,-3.35937v-16.79687c0,-1.85505 -1.50433,-3.35937 -3.35937,-3.35937h-36.95312v-10.07812c0,-1.85505 -1.50433,-3.35937 -3.35937,-3.35937zM77.26563,13.4375h20.15625v6.71875h-20.15625zM36.95313,26.875h100.78125v10.07813h-100.78125zM47.03125,43.67188h80.625v109.51563c0,2.59344 -2.10969,4.70313 -4.70312,4.70313h-71.21875c-2.59344,0 -4.70312,-2.10969 -4.70312,-4.70312zM67.1875,63.82813c-1.85538,0 -3.35937,1.50433 -3.35937,3.35938v67.1875c0,1.85505 1.50399,3.35938 3.35938,3.35938c1.85538,0 3.35938,-1.50433 3.35938,-3.35937v-67.1875c0,-1.85505 -1.50399,-3.35937 -3.35937,-3.35937zM87.34375,63.82813c-1.85538,0 -3.35937,1.50433 -3.35937,3.35938v67.1875c0,1.85505 1.50399,3.35938 3.35938,3.35938c1.85505,0 3.35938,-1.50433 3.35938,-3.35937v-67.1875c0,-1.85505 -1.50433,-3.35937 -3.35937,-3.35937zM107.5,63.82813c-1.85505,0 -3.35937,1.50433 -3.35937,3.35938v67.1875c0,1.85505 1.50433,3.35938 3.35938,3.35938c1.85505,0 3.35938,-1.50433 3.35938,-3.35937v-67.1875c0,-1.85505 -1.50433,-3.35937 -3.35937,-3.35937z"></path></g></g></g></svg>`;
let data = [];

getDataFromLS();
renderItemsFromLS();

function getDataFromLS() {
    if(localStorage.length == 0) return;

    let tasks = localStorage.getItem('todoItems');
    data = JSON.parse(tasks);
}

function renderItemsFromLS() {
    if(!data.length) return;

    data.forEach(({task, state}) => renderItem(task, state));
}

function renderItem(text, state) {
    let closebtn = document.createElement('button');
    let li = document.createElement('li');
 
    closebtn.classList.add('item_delete-btn');
    li.classList.add('list_item');
    if(state == 'completed') {
        li.classList.add('list_item--completed');
    }

    li.textContent = text;
    closebtn.innerHTML = trashbinSvg;

    li.append(closebtn);
    todoList.append(li);
}

function addItem(text) {
    renderItem(text, null);
    input.value = '';
    data.push({
        task: text,
        state: 'active',
    });
}

function removeItem(task) {
    let index = findTaskIndex(task);
    
    task.remove();
    data.splice(index, 1);
}

function changeTaskState(task) {
  task.classList.toggle('list_item--completed');
  let index = findTaskIndex(task);

  if(task.classList.contains('list_item--completed')) {
   data[index].state = 'completed';
  } else {
   data[index].state = 'active';
  }
}

function findTaskIndex(task) {
    return Array.from(todoList.children).indexOf(task);
}

AddItemBtn.addEventListener('click', function(event) {
    if(input.value == '') return;
    addItem(input.value.trim());
    input.focus();
})

input.addEventListener('keydown', function(event) {
  if(event.key == 'Enter') AddItemBtn.click();
  return;
})

todoList.addEventListener('click', function(event) {
    let target = event.target;
    if(!target.closest('.item_delete-btn')) return;
    let listItem = target.closest('.list_item');
    
    removeItem(listItem);
    event.stopPropagation();
})

todoList.addEventListener('click', function(event) {
  let target = event.target;
  if(!target.classList.contains('list_item')) return;

  changeTaskState(target);
})

window.addEventListener('beforeunload', function(event) {
    localStorage.setItem('todoItems', JSON.stringify(data));
    return;
})


