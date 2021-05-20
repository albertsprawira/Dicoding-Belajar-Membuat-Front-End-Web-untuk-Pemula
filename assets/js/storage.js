const BOOK_KEY = "books"

function isStorageExist(){
    if(typeof(Storage) === undefined) {
        alert("Maaf, Browser tidak mendukung local storage")
        return false;
    }
    return true;
}

function getLocalStorageObject(key){
    if(isStorageExist==false) return []
    return localStorage.getItem(key)!= null ? JSON.parse(localStorage.getItem(key)) : []
}

function saveToLocalStorage(key,object){
    if(isStorageExist==false) return;
    return localStorage.setItem(key,JSON.stringify(object))
}

function getAllData(){
    let books = getLocalStorageObject(BOOK_KEY)
    finishedBookList = books.filter( obj => obj.isComplete == true)
    unfinishedBookList = books.filter( obj => obj.isComplete == false)
}
function saveAllData(){
    let books = [...finishedBookList, ...unfinishedBookList]
    saveToLocalStorage(BOOK_KEY,books)
    renderAllBooks()
}