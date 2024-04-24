import dom from "./dom.js";
import Folder from "./folder.js";
import localStore from "./localStorage.js";

class FolderArr {
    constructor() {
        this.folders = localStore.getDataFromStore() ? localStore.getDataFromStore().folders : [new Folder('First folder')]
    }

    addFolder(folder) {
        this.folders.push(folder);
        dom.renderFolders(this);
        localStore.saveDataToStore({folders: this.folders})
    }

    removeFolder(folderId) {
        this.folders = this.folders.filter(folder => folder.id !== folderId);
        dom.renderFolders(this);
        dom.renderTodos(this.folders.length ? this.folders[0] : null);
        localStore.saveDataToStore({folders: this.folders})
    }

    filterFolderById(folderId) {
        return this.folders.filter(folder => folder.id === folderId)[0];
    }

    switchFolders(id) {
        dom.renderTodos(this.filterFolderById(id));
    }
}
export default new FolderArr();