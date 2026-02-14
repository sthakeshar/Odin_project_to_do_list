import './style.css';
import { projects, setActiveProject, createProject, addTaskToActive, deleteTodoFromActive, sortByPriority, activeProject } from './modules/todoManager.js';
import { renderApp } from './modules/ui.js';
import { initTheme } from './modules/theme.js';

// Elements
const form = document.getElementById('todo-form');
const projectList = document.getElementById('project-list');
const newProjectBtn = document.getElementById('add-project-btn');
const sortBtn = document.getElementById('sort-priority-btn');

// Initial Render
initTheme();
renderApp();

// Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const priority = document.getElementById('priority').value;

    addTaskToActive(title, date, priority);
    renderApp();
    form.reset();
});

projectList.addEventListener('click', (e) => {
    if (e.target.classList.contains('project-btn')) {
        setActiveProject(e.target.dataset.id);
        renderApp();
    }
});

newProjectBtn.addEventListener('click', () => {
    const name = prompt("New Project Name:");
    if (name) {
        createProject(name);
        renderApp();
    }
});

document.getElementById('todo-container').addEventListener('click', (e) => {
    const id = e.target.closest('.task-item')?.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('delete-btn')) {
        deleteTodoFromActive(id);
    } else if (e.target.classList.contains('toggle-check')) {
        const task = activeProject.tasks.find(t => t.id === id);
        task.toggleComplete();
    }
    renderApp();
});

sortBtn.addEventListener('click', () => {
    sortByPriority();
    renderApp();
});