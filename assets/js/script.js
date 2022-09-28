let buttonEl = document.querySelector('#save-task')
let tasksToDoEl = document.getElementById('tasks-to-do');

const createTaskHandler = function() {
  let taskItemEl = document.createElement('li');
  taskItemEl.textContent = 'kitty litter';
  taskItemEl.className = 'task-item'
  tasksToDoEl.appendChild(taskItemEl);
}


buttonEl.addEventListener('click', createTaskHandler)
