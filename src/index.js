import './style.css';
import { initTheme } from './modules/theme.js';
import { projects, setActiveProject, createProject, addTaskToActive, deleteTodoFromActive, sortByPriority, activeProject, saveToLocalStorage,deleteProject,renameProject } from './modules/todoManager.js';
import { renderApp,renderTaskList } from './ui/ui.js';

// Elements
const form = document.getElementById('todo-form');
const projectList = document.getElementById('project-list');
const newProjectBtn = document.getElementById('add-project-btn');
const sortBtn = document.getElementById('sort-priority-btn');
const todoContainer = document.getElementById('todo-container');
const searchInput = document.getElementById('task-search');

// Init
initTheme();
renderApp();

searchInput.addEventListener('input', (e) => {
    renderTaskList(e.target.value);
});
// Form Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTaskToActive(
        document.getElementById('title').value,
        document.getElementById('date').value,
        document.getElementById('priority').value
    );
    renderApp();
    form.reset();
});

// Sidebar Click (Switch Project)
projectList.addEventListener('click', (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains('project-btn')) {
        setActiveProject(id);
        renderApp();
    }
    
    if (e.target.classList.contains('rename-project-btn')) {
        const currentProject = projects.find(p => p.id === id);
        const newName = prompt("Rename project to:", currentProject.name);
        if (newName && newName.trim() !== "") {
            renameProject(id, newName.trim());
            renderApp();
        }
    }

    if (e.target.classList.contains('delete-project-btn')) {
        if (confirm("Delete this project and all its tasks?")) {
            deleteProject(id);
            renderApp();
        }
    }
});

// New Project
newProjectBtn.addEventListener('click', () => {
    const name = prompt("Project Name:");
    if (name) {
        createProject(name);
        renderApp();
    }
});

// Task Interactions (Delete / Toggle)
todoContainer.addEventListener('click', (e) => {
    const taskEl = e.target.closest('.task-item');
    if (!taskEl) return;
    const id = taskEl.dataset.id;

    if (e.target.classList.contains('delete-btn')) {
        deleteTodoFromActive(id);
    } else if (e.target.classList.contains('toggle-check')) {
        const task = activeProject.tasks.find(t => t.id === id);
        task.toggleComplete();
        saveToLocalStorage();
    }
    renderApp();
});

sortBtn.addEventListener('click', () => {
    sortByPriority();
    renderApp();
});