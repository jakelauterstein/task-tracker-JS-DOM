let taskIdCounter = 0;
let pageContentEl = document.querySelector('#page-content')

let formEl = document.querySelector('#task-form')
let tasksToDoEl = document.getElementById('tasks-to-do');

const taskFormHandler = function(event) {
  event.preventDefault();

  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

  //check if valid value was input
  if(!taskNameInput || !taskTypeInput) {
    alert('you need to fill out the task form!');
    return false;
  }

  formEl.reset();

  //package up data as object
  let taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  createTaskEl(taskDataObj);
  
}

const createTaskEl = function(taskDataObj) {

//create list item
let listItemEl = document.createElement('li');
listItemEl.className = 'task-item';

// add task id as custom attribute
listItemEl.setAttribute('data-task-id', taskIdCounter);

//create div to hold task info and add to list item and give class name
let taskInfoEl = document.createElement('div');
taskInfoEl.className = 'task-info';

//add html content to div
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

listItemEl.appendChild(taskInfoEl);

let taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);

// add entire list item to list
tasksToDoEl.appendChild(listItemEl);

//increase task counter for next unique id
taskIdCounter++;

}

const createTaskActions = function(taskId) {

let actionContainerEl = document.createElement('div');
actionContainerEl.className = 'task-actions';

//create edit button

let editButtonEl = document.createElement('button');
editButtonEl.textContent = 'Edit';
editButtonEl.className = 'btn edit-btn';
editButtonEl.setAttribute('data-task-id', taskId);

actionContainerEl.appendChild(editButtonEl);

//create delete btn

let deleteButtonEl = document.createElement('button');
deleteButtonEl.textContent = 'Delete';
deleteButtonEl.className = 'btn delete-btn';
deleteButtonEl.setAttribute('data-task-id', taskId);

actionContainerEl.appendChild(deleteButtonEl);

let statusSelectEl = document.createElement('select');
statusSelectEl.className= 'select-status';
statusSelectEl.setAttribute('name', 'status-change');
statusSelectEl.setAttribute('data-task-id', taskId);

let statusChoices = ['To Do', 'In Progress', 'Completed'];

for (i=0; i<statusChoices.length; i++) {
  //create option el
  let statusOptionEl = document.createElement('option');
  statusOptionEl.textContent = statusChoices[i];
  statusOptionEl.setAttribute('value', statusChoices[i]);

  //append to select el
  statusSelectEl.appendChild(statusOptionEl);
}

actionContainerEl.appendChild(statusSelectEl);

return actionContainerEl;
};

const deleteTask = function(taskId) {
  let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);
  taskSelected.remove();
}

const editTask = function(taskId) {
  console.log(`editing task # ${taskId}`);

  //get task list item el
  let taskSelected = document.querySelector(`.task-item[data-task-id='${taskId}']`);

  // get content from task
  let taskName = taskSelected.querySelector('h3.task-name').textContent;

  let taskType = taskSelected.querySelector('span.task-type').textContent;

  document.querySelector(`input[name='task-name']`).value = taskName;
  document.querySelector(`select[name='task-type']`).value = taskType;

  document.querySelector('#save-task').textContent = "Update Task";

  formEl.setAttribute('data-task-id', taskId);

}

const taskButtonHandler = function(event) {
  console.log(event.target);

  let targetEl = event.target;
  let taskId = targetEl.getAttribute('data-task-id');


  //edit btn clicked
  if(targetEl.matches('.edit-btn')) {
    editTask(taskId);
  } else if (targetEl.matches('.delete-btn')) {
    deleteTask(taskId);
  }

}





formEl.addEventListener('submit', taskFormHandler)

pageContentEl.addEventListener('click', taskButtonHandler);
