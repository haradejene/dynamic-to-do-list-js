document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            createTaskElement(taskText, false);
        });
    }

    function createTaskElement(taskText, saveToStorage = true) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            updateLocalStorageAfterRemoval(taskText);
        };
        
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (saveToStorage) {
            updateLocalStorageAfterAddition(taskText);
        }
    }

    function updateLocalStorageAfterAddition(newTask) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function updateLocalStorageAfterRemoval(taskToRemove) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskToRemove);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        createTaskElement(taskText);
        taskInput.value = '';
        taskInput.focus();
    }

    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});