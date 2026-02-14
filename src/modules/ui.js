import { projects, activeProject } from './todoManager.js';

export function renderApp() {
    renderProjectSidebar();
    renderTaskList();
}

function renderProjectSidebar() {
    const sidebar = document.getElementById('project-list');
    sidebar.innerHTML = projects.map(proj => `
        <button class="project-btn ${proj.id === activeProject.id ? 'active' : ''}" data-id="${proj.id}">
            ${proj.name}
        </button>
    `).join('');
}

function renderTaskList() {
    const container = document.getElementById('todo-container');
    const titleHeader = document.getElementById('current-project-title');
    
    titleHeader.textContent = activeProject.name;
    container.innerHTML = activeProject.tasks.map(task => `
        <div class="task-item ${task.priority} ${task.completed ? 'done' : ''}" data-id="${task.id}">
            <input type="checkbox" ${task.completed ? 'checked' : ''} class="toggle-check">
            <span>${task.title} (${task.dueDate})</span>
            <button class="delete-btn">Delete</button>
        </div>
    `).join('');
}