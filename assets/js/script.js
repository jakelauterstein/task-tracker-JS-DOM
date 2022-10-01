let formEl = document.querySelector('#task-form')
let tasksToDoEl = document.getElementById('tasks-to-do');

const taskFormHandler = function(event) {
  event.preventDefault();

  let taskNameInput = document.querySelector("input[name='task-name']").value;
  let taskTypeInput = document.querySelector("select[name='task-type']").value;

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
//create div to hold task info and add to list item and give class name
let taskInfoEl = document.createElement('div');
taskInfoEl.className = 'task-info';

//add html content to div
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

listItemEl.appendChild(taskInfoEl);
// add entire list item to list
tasksToDoEl.appendChild(listItemEl);

}


formEl.addEventListener('submit', taskFormHandler)
