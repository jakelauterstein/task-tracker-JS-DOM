// BEGIN GLOBAL VARIABLES
let taskIdCounter = 0;
let pageContentEl = document.querySelector('#page-content')
let tasksInProgressEl = document.querySelector('#tasks-in-progress')
let tasksCompletedEl = document.querySelector('#tasks-completed')
let formEl = document.querySelector('#task-form')
let tasksToDoEl = document.getElementById('tasks-to-do');
let tasks = [];

// BEGIN GENERAL FUNCTIONS
const completeEditTask = function(name, type, id) {
  let taskSelected = document.querySelector(`.task-item[data-task-id='${id}']`);
  taskSelected.querySelector('h3.task-name').textContent = name;
  taskSelected.querySelector('span.task-type').textContent = type;

  // loop thru tasks array and task obj with new content
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(id)) {
      tasks[i].name = name;
      tasks[i].type = type
    }
  }
  saveTasks();
  
  formEl.removeAttribute('data-task-id');
  document.querySelector("#save-task").textContent = "Add Task";
  alert('task updated!')
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
taskDataObj.id = taskIdCounter;

tasks.push(taskDataObj);
saveTasks();

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
//create new array to hold updated list of tasks
  var updatedTaskArr = [];
//loop thru current tasks
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }
//reassign tasks array to be the same as updatedTaskArray
tasks = updatedTaskArr;
saveTasks();
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

// ++++++++++  BEGIN EVENT LISTENER FUNCTIONS +++++++++++++

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

  let isEdit = formEl.hasAttribute('data-task-id');

  // has data attr, so get task id and call function to complete edit process
  if (isEdit){
    let taskId = formEl.getAttribute('data-task-id');
    completeEditTask(taskNameInput, taskTypeInput, taskId);

  }
  // no data attr, so create object as normal and pass to createTaskEl func
  else{
 //package up data as object
    let taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: 'to do'
    };

    createTaskEl(taskDataObj);
  }
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

const taskStatusChangeHandler = function(event) {
  // get the task item's id
  var taskId = event.target.getAttribute('data-task-id');

  // get slect option's value and convert to lower
  let statusValue = event.target.value.toLowerCase();

  // find parent task item element based on the id
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  
  saveTasks();
}



const saveTasks = function() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

formEl.addEventListener('submit', taskFormHandler)

pageContentEl.addEventListener('click', taskButtonHandler);
pageContentEl.addEventListener('change', taskStatusChangeHandler);
