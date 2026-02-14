export class Todo {
    constructor(title, description, dueDate, priority, id = crypto.randomUUID()) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = id;
        this.completed = false;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}