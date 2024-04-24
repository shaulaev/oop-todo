import folderArr from "./folderArr.js"
import Folder from "./folder.js";
import Todo from "./todo.js";

export default class PrototypeClass {
    constructor() {
        this.folderArrPr = folderArr.prototype;
        this.folderPr = Folder.prototype;
        this.todoPr = Todo.prototype;
    }

    setPrototype(data) {
        data.folders.forEach(item => {
            item.__proto__ = this.folderPr;
            item.todos.forEach(todo => {
                todo.__proto__ = this.todoPr;
            })
        });
    }
}