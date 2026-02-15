import { projects, activeProject } from '../modules/todoManager.js';

export function renderApp() {
    renderProjectSidebar();
    renderTaskList();
}

function renderProjectSidebar() {
    const sidebar = document.getElementById('project-list');
    sidebar.innerHTML = projects.map(proj => `
        <div class="project-item-container ${proj.id === activeProject.id ? 'active' : ''}">
            <button class="project-btn" data-id="${proj.id}">
                ${proj.name}
            </button>
            <div class="project-actions">
                <button class="rename-project-btn" data-id="${proj.id}" title="Rename">✎</button>
                <button class="delete-project-btn" data-id="${proj.id}" title="Delete">×</button>
            </div>
        </div>
    `).join('');
}

export function renderTaskList(searchTerm = "") {
    const container = document.getElementById('todo-container');
    const titleHeader = document.getElementById('current-project-title');
    
    titleHeader.textContent = activeProject.name;

    // Filter tasks based on the search term
    const filteredTasks = activeProject.tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredTasks.length === 0 && searchTerm !== "") {
        container.innerHTML = `<p class="empty-msg">No tasks match your search...</p>`;
        return;
    }

    container.innerHTML = filteredTasks.map(task => `
        <div class="task-item ${task.priority} ${task.completed ? 'done' : ''}" data-id="${task.id}">
            <input type="checkbox" ${task.completed ? 'checked' : ''} class="toggle-check">
            <span>${task.title} (${task.dueDate})</span>
            <button class="delete-btn">Delete</button>
        </div>
    `).join('');
}