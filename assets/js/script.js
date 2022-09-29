let bformEl = document.querySelector('#task-form')
let tasksToDoEl = document.getElementById('tasks-to-do');

const createTaskHandler = function(event) {
  event.preventDefault();

  let taskItemEl = document.createElement('li');
  taskItemEl.textContent = 'kitty litter';
  taskItemEl.className = 'task-item'
  tasksToDoEl.appendChild(taskItemEl);
}


formEl.addEventListener('submit', createTaskHandler)
