import { Todo } from './todo.js';

const priorityWeights = {
    high: 3,
    medium: 2,
    low: 1
};

export let todoList = [];

export function addTask(title, description, dueDate, priority) {
    const newTask = new Todo(title, description, dueDate, priority);
    todoList.push(newTask);
    return newTask;
}

export function deleteTask(id) {
    todoList = todoList.filter(task => task.id !== id);
}

export function getTaskById(id) {
    return todoList.find(task => task.id === id);
}

export function sortByPriority() {
    // Sorts the array in place: High (3) to Low (1)
    todoList.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority]);
}