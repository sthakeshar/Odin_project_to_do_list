import './style.css';
import { addTask, deleteTask, getTaskById,sortByPriority } from './modules/todoManager.js';
import { renderTodos } from './modules/ui.js';
import { initTheme } from './modules/theme.js'; 

const form = document.getElementById('todo-form');
const container = document.getElementById('todo-container');

initTheme();
// Handle adding new tasks
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const priority=document.getElementById('priority').value;
    
    addTask(title, "Description here", date, priority);
    renderTodos();
    form.reset();
});

// Handle clicking inside the list (Delete and Toggle)
container.addEventListener('click', (e) => {
    const id = e.target.closest('.task-item').dataset.id;

    if (e.target.classList.contains('delete-btn')) {
        deleteTask(id);
    } else if (e.target.classList.contains('toggle-check')) {
        const task = getTaskById(id);
        task.toggleComplete();
    }
    renderTodos();
});

const sortBtn = document.getElementById('sort-priority-btn');

sortBtn.addEventListener('click', () => {
    sortByPriority(); // Organize the data
    renderTodos();    // Update the screen
});