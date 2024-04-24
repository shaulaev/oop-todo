import Folder from "./folder.js"
import Todo from "./todo.js"

class DOMRender {
    renderFolders(arr) {
        const foldersWrapper = document.querySelector('aside ul')

        foldersWrapper.innerHTML = "";
        arr.folders.forEach(el => {
            const li = `<li data-id='${el.id}'><span>${el.name}</span> <img class="folder__remove" src='https://endocrinemsc.github.io/todo-list-top/b4a7b26be64c05d0f239.svg'></li>`
            foldersWrapper.insertAdjacentHTML('beforeend',li)

        })

        this.folderClick(arr);
        this.renderTodos(arr.folders[0]);
        foldersWrapper.querySelector('li') && foldersWrapper.querySelector('li').classList.add('active')
    }

    renderTodos(arr) {
        const todosWrapper = document.querySelector('.todos .todos__wrapper');
        if(arr && arr.todos) {
            todosWrapper.innerHTML = ""
            arr.todos.sort((a, b) => b.priority - a.priority).forEach(el => {
                const div = `<div data-id='${el.id}' class='todo'><span>${el.title}</span> <img class="todo__remove" src='https://endocrinemsc.github.io/todo-list-top/b4a7b26be64c05d0f239.svg'></div>`
    
                todosWrapper.insertAdjacentHTML('beforeend',div);
            })
        } else {
            todosWrapper.innerHTML = ""
        }
        this.todoClick(arr);
    }

    folderClick(arr) {
        const folders = document.querySelectorAll('aside li');
        const foldersRemove = document.querySelectorAll('aside li .folder__remove');

        folders.forEach(item => {
            item.querySelector('span').addEventListener('click', function(e) {
                folders.forEach(el => {
                    el.classList.remove('active')
                })

                item.classList.add('active')
                arr.switchFolders(+item.getAttribute('data-id'))
            })
        })

        foldersRemove.forEach(item => {
            item.addEventListener('click', function() {
                arr.removeFolder(+item.parentElement.getAttribute('data-id'))
            })
        })
    }

    todoClick(arr) {
        const todo = document.querySelectorAll('.todo');
        const todosRemove = document.querySelectorAll('.todo__remove');

        todo.forEach(item => {
            item.addEventListener('click', () => {
                const activeTodo = arr.getTodoById(+item.getAttribute('data-id'))
                const editTodoHTML = `<h4>Edit Todo</h4><input value="${activeTodo.title}" type="text" placeholder="Title" name="title"><input value="${activeTodo.description}" type="text" placeholder="Description" name="desc"><input value="${activeTodo.dueDate}" type="date" placeholder="Duedate" name="date"><select value="${activeTodo.priority}" name="priority"><option value="0">Low</option><option value="1">Mid</option><option value="2">High</option></select><button class="btn save">Save</button>`;
                this.openModal(editTodoHTML, arr, 'editTodo', +item.getAttribute('data-id'));
                document.querySelector('select').value = activeTodo.priority
            })
        })

        todosRemove.forEach(item => {
            item.addEventListener('click', function() {
                arr.removeTodo(+item.parentElement.getAttribute('data-id'))
            })
        })
    }

    openModal(content, arr, type, id) {
        const modal = document.querySelector('.modal');
        const modalBg = document.querySelector('.modal-bg');

        modal.querySelector('.modal__content').innerHTML = content;

        modal.classList.add('active');
        modalBg.classList.add('active');

        if('folder' === type) {
            this.addFolder(arr)
        } else if('editTodo' === type) {
            this.editTodo(arr, id)
        } else {
            this.addTodo(arr)
        }
    }

    
    closeModal() {
        const modal = document.querySelector('.modal')
        const modalBg = document.querySelector('.modal-bg');

        modal.classList.remove('active');
        modalBg.classList.remove('active');

        modal.querySelector('.modal__content').innerHTML = ''
    }
    
    addFolder(arr) {
        const addBtn = document.querySelector('.modal__content .add')
        const input = document.querySelector('.modal__content input')

        addBtn.addEventListener('click', () => {
            if(input.value.length) {
                arr.addFolder(new Folder(input.value))
                this.closeModal();
            } else {
                alert('You should name your folder')
            }
        })
        
    }

    addTodo(arr) {
        const addBtn = document.querySelector('.modal__content .add');
        const title = document.querySelector('.modal__content input[name=title]');
        const desc = document.querySelector('.modal__content input[name=desc]');
        const activeFolder = document.querySelector('li.active');
    
        addBtn.addEventListener('click', () => {
            if(title.value.length) {
                const fold = arr.filterFolderById(+activeFolder.getAttribute('data-id'));
                fold.addTodo(new Todo(title.value, desc.value))
                this.closeModal();
            } else {
                alert('You should name your task');
            }
        })
    }

    editTodo(arr, id) {
        const saveBtn = document.querySelector('.modal__content .save');
        const title = document.querySelector('.modal__content input[name=title]');
        const desc = document.querySelector('.modal__content input[name=desc]');
        const date = document.querySelector('.modal__content input[name=date]');
        const priority = document.querySelector('.modal__content select[name=priority]');
        const activeFolder = document.querySelector('li.active');

        saveBtn.addEventListener('click', () => {
            const data = {todoId: id, title: title.value, desc: desc.value, date: date.value, priority: +priority.value, completed: 0}
            if(title.value.length) {
                arr.editTodo(data)
                this.closeModal();
                this.renderTodos(arr)
            } else {
                alert('You should name your task')
            }
        })
    }
}

export default new DOMRender()
