import './src/css/global.css'
import './src/css/style.css'
import foldersArr from "./src/js/folderArr.js";
import localStore from "./src/js/localStorage.js";
import dom from "./src/js/dom.js"
import PrototypeClass from "./src/js/prototype.js";

const PrototypeCl = new PrototypeClass();
PrototypeCl.setPrototype(foldersArr);

dom.renderFolders(foldersArr)


// foldersArr.folders[0].addTodo(new Todo('Первая задачка', "Descr", new Date, 0))
// foldersArr.folders[0].addTodo(new Todo('2 задачка', "Descr", new Date, 0))
// foldersArr.folders[0].addTodo(new Todo('3 задачка', "Descr", new Date, 0))

localStore.saveDataToStore(foldersArr)

export const addFolderHTML = '<h4>Create folder</h4><input type="text" placeholder="Name" name="title"><button class="btn add">Add</button>';
export const addTodoHTML = '<h4>Create Todo</h4><input type="text" placeholder="Title" name="title"><input type="text" placeholder="Description" name="desc"><button class="btn add">Add</button>';

document.querySelector('.add-folder').addEventListener('click', () => dom.openModal(addFolderHTML, foldersArr, 'folder'));
document.querySelector('.add-todo').addEventListener('click', () => dom.openModal(addTodoHTML, foldersArr, 'todo'));

document.querySelector('.modal-bg').addEventListener('click', () => {
    dom.closeModal()
});