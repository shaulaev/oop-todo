import { format } from "date-fns";

export default class Todo {
    constructor(title, description) {
        this.id = Math.random()
        this.title = title
        this.description = description
        this.dueDate = format(new Date(),"yyyy-MM-dd");
        this.priority = 0;
        this.completed = false;
    }

    edit(data) {
        const {title, desc, date, priority, completed} = data
        this.title = title
        this.description = desc
        this.dueDate = date
        this.priority = priority
        this.completed = completed
    }
}