export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = []; // Tasks specific to this project
        this.id = crypto.randomUUID();
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
    }
}