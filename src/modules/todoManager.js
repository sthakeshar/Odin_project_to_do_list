import { Project } from './project.js';
import {Todo} from './todo.js'

export let projects = [new Project('Default')]; 
export let activeProject = projects[0];

export function createProject(name) {
    const newProject = new Project(name);
    projects.push(newProject);
    return newProject;
}

export function setActiveProject(projectId) {
    activeProject = projects.find(p => p.id === projectId);
}

export function addTaskToActive(title, date, priority) { 
    const newTask = new Todo(title, "No description", date, priority);
    activeProject.addTask(newTask);
}

export function deleteTodoFromActive(id) {
    activeProject.removeTask(id);
}

export function sortByPriority() {
    const weights = { high: 3, medium: 2, low: 1 };
    activeProject.tasks.sort((a, b) => weights[b.priority] - weights[a.priority]);
}