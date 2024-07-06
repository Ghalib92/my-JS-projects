const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add');
const taskList = document.getElementById('task-list');
const clearList = document.getElementById('clear-button');

let tasks= [];
function loadTasks(){

    const storedTasks = localStorage.getItem('tasks')
         
        if(storedTasks){
            tasks = JSON.parse(storedTasks);
            displayTasks();
        }
    
    }

    function saveTasks(){
localStorage.setItem('tasks', JSON.stringify(tasks));


    }


function addTask(){
   
const task = taskInput.value.trim();
if(task){
    tasks.push(task);
    taskInput.value = '';
    displayTasks();
    saveTasks();

 
}


}
function displayTasks(){
 taskList.innerHTML = '';
 tasks.forEach( ( task, index) => {
    const li = document.createElement('li');
    li.textContent = task;
    const dateAdded = document.createElement('date');
    dateAdded.textContent = 'Date: ' +  new Date().toLocaleDateString();
     const removeButton = document.createElement('button');
     removeButton.textContent =   '  Remove task';
      removeButton.addEventListener('click',()=>{
removeTasks(index);
 });

 li.appendChild( dateAdded);
li.appendChild(removeButton);
taskList.appendChild(li);


});
  
if(tasks.length > 0){
    clearList.style.display = 'inline-block';

 }else {
    clearList.style.display = 'none';
 }
    
}
function removeTasks(index){
    tasks.splice(index, 1);
    localStorage.removeItem('tasks');
    displayTasks();
    saveTasks();
}




taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
}); 
function clearTasks(){
    tasks = [];
    displayTasks();
    saveTasks();
}
loadTasks();
addTaskButton.addEventListener('click', addTask);
clearList.addEventListener('click', clearTasks);