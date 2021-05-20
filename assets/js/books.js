function deleteBook(e){
    let id = e.parentNode.id;
    finishedBookList = finishedBookList.filter(obj => obj.id != id)
    unfinishedBookList = unfinishedBookList.filter(obj => obj.id != id)
    saveAllData()
    closePopUp()
}

function editBookAction(e){
    let id = e.parentNode.id;
    let data = finishedBookList.filter(obj => obj.id == id)
    let data2 = unfinishedBookList.filter(obj => obj.id == id)
    let obj = null

    if(data.length != 0) obj = {...data[0],key: FINISHED_ID_KEY}
    else if(data2.length != 0) obj = {...data2[0],key: UNFINISHED_ID_KEY}
    showBookPopUp(BOOK_EDIT,obj)
}

function moveBookStatus(key, newData){
    let isMoved = false
    if(key == FINISHED_ID_KEY && newData.isComplete == false) isMoved = true
    else if(key == UNFINISHED_ID_KEY && newData.isComplete == true) isMoved = true

    if(isMoved){
        if(key == FINISHED_ID_KEY) {
            finishedBookList = finishedBookList.filter(obj => obj.id != newData.id)
            unfinishedBookList.push(newData)
        }
        else if(key == UNFINISHED_ID_KEY) {
            unfinishedBookList = unfinishedBookList.filter(obj => obj.id != newData.id)
            finishedBookList.push(newData)
        }
        return true
    }
    return false
}

function editBook(key,newData){
    if(moveBookStatus(key,newData) == false){
        if(key == FINISHED_ID_KEY) finishedBookList = finishedBookList.map(obj => {
            if(obj.id === newData.id) obj = newData
            return obj
        })
        if(key == UNFINISHED_ID_KEY) unfinishedBookList = unfinishedBookList.map(obj => {
            if(obj.id === newData.id) obj = newData
            return obj
        })
    }
    saveAllData()
    closePopUp()
}

function deleteBookConfirmation(e){
    let id = e.parentNode.id;
    let books = [...finishedBookList,...unfinishedBookList]
    
    let data = books.filter(obj => obj.id == id)
    if(data.length ==0) return

    showDeleteConfirmation(data[0])
}

function addBook(newBook){
    if(newBook.isComplete) finishedBookList.push(newBook)
    else if(!newBook.isComplete) unfinishedBookList.push(newBook)
    saveAllData()
    closePopUp()
}