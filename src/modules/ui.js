import { todoList } from './todoManager.js';

export function renderTodos() {
    const container = document.getElementById('todo-container');
    container.innerHTML = ''; // Clear current list

    todoList.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = `task-item ${task.priority} ${task.completed ? 'done' : ''}`;
        taskDiv.dataset.id = task.id;
        
        taskDiv.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} class="toggle-check">
            <span>${task.title} - ${task.dueDate}</span>
            <button class="delete-btn">Delete</button>
        `;
        container.appendChild(taskDiv);
    });
}