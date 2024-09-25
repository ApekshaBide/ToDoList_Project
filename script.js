

document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add-Btn');
    const todoInput = document.querySelector('.todo-input');
    const tasksContainer = document.getElementById('tasks');
    const errorMessage = document.getElementById('error');
    const pendingTasks = document.querySelector('.count-value');
    const clearAllBtn = document.getElementById('clear-all-Btn');
    const completedCount = document.querySelector('.completed-count');
    const incompleteCount = document.querySelector('.incomplete-count');

    let tasks = [];
    function updateTaskCount() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const incompleteTasks = tasks.length - completedTasks;

        pendingTasks.textContent = `${tasks.length}`;
        completedCount.textContent = completedTasks;
        incompleteCount.textContent = incompleteTasks;
    }

    function displayError() {
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 2000);
    }

   
    function createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        const taskName = document.createElement('span');
        taskName.textContent = task.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete';
        deleteBtn.textContent = 'Delete';

        
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            taskElement.remove();
            updateTaskCount();
        });
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            taskElement.classList.toggle('completed', task.completed);
            updateTaskCount();
        });

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskName);
        taskElement.appendChild(deleteBtn);

        tasksContainer.appendChild(taskElement);
    }

    function addTask() {
        const taskName = todoInput.value.trim();
        if (taskName === '') {
            displayError();
            return;
        }
        const task = { name: taskName, completed: false };
        tasks.push(task);
        createTaskElement(task);
        updateTaskCount();
        todoInput.value = '';
    }

   
    function clearAllTasks() {
        tasks = [];
        tasksContainer.innerHTML = '<div class="task-info"><p id="pending-tasks">You have <span class="count-value">0</span> task(s) - <span class="incomplete-count">0</span> incomplete / <span class="completed-count">0</span> completed</p><button id="clear-all-Btn">Clear All</button>';
        updateTaskCount();
    }

  

    
    addBtn.addEventListener('click', addTask);

   
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

   
    clearAllBtn.addEventListener('click', clearAllTasks);

   
});
