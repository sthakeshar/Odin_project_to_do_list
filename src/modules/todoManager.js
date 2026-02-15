import { Project } from '../model/project.js';
import { Todo } from '../model/todo.js';

export let projects = [];

// Load from LocalStorage or Create Default
const savedData = localStorage.getItem('todoAppData');
if (savedData) {
    const rawData = JSON.parse(savedData);
    projects = rawData.map(pData => {
        const proj = new Project(pData.name, pData.id);
        proj.tasks = pData.tasks.map(t => new Todo(t.title, t.description, t.dueDate, t.priority, t.id, t.completed));
        return proj;
    });
} else {
    projects.push(new Project('Default'));
}

export let activeProject = projects[0];

export function saveToLocalStorage() {
    localStorage.setItem('todoAppData', JSON.stringify(projects));
}

export function createProject(name) {
    const newProj = new Project(name);
    projects.push(newProj);
    saveToLocalStorage();
    return newProj;
}

export function setActiveProject(projectId) {
    activeProject = projects.find(p => p.id === projectId);
}

export function addTaskToActive(title, date, priority) {
    const newTask = new Todo(title, "No description", date, priority);
    activeProject.addTask(newTask);
    saveToLocalStorage();
}

export function deleteTodoFromActive(id) {
    activeProject.removeTask(id);
    saveToLocalStorage();
}

export function sortByPriority() {
    const weights = { high: 3, medium: 2, low: 1 };
    activeProject.tasks.sort((a, b) => weights[b.priority] - weights[a.priority]);
    saveToLocalStorage();
}

export function deleteProject(projectId) {
    // Don't allow deleting the last project
    if (projects.length <= 1) {
        alert("You must have at least one project!");
        return;
    }

    // Filter out the project
    projects = projects.filter(p => p.id !== projectId);

    // If we deleted the project we were currently looking at,
    // set the active project to the first one available
    if (activeProject.id === projectId) {
        activeProject = projects[0];
    }

    saveToLocalStorage();
}

export function renameProject(projectId, newName) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.name = newName;
        saveToLocalStorage();
    }
}