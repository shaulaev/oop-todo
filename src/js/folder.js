import dom from "./dom.js";
import localStore from "./localStorage.js";
import foldersArr from "./folderArr.js";

export default class Folder {
    constructor(name) {
        this.id = Math.random()
        this.name = name
        this.todos = []
    }

    addTodo(todo) {
        this.todos.push(todo);
        dom.renderTodos(this);
        localStore.saveDataToStore(foldersArr)
    }

    removeTodo(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
        dom.renderTodos(this);
        localStore.saveDataToStore(foldersArr)
    }

    editTodo(data) {
        this.getTodoById(data.todoId).edit(data)
        localStore.saveDataToStore(foldersArr)
    }

    getTodoById(todoId) {
        return this.todos.filter(todo => todo.id === todoId)[0];
    }
}