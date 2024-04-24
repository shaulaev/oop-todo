import Folder from "./folder.js";

class localStore {

    firstDataToStore() {
        !this.getDataFromStore() ? this.saveDataToStore({folderArr: [new Folder('First Evet Folder')]}) : ''
    }
    
    saveDataToStore(data) {
        localStorage.setItem('foldersArr', JSON.stringify(data))
    }

    getDataFromStore() {
        return JSON.parse(localStorage.getItem('foldersArr'))
    }
}

export default new localStore;