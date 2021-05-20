const FINISHED_ID_KEY = "finish"
const UNFINISHED_ID_KEY = "unfinish"

let finishedBookList = []
let unfinishedBookList = []

let finishedElement = document.getElementById("finished")
let unfinishedElement = document.getElementById("unfinished")

getAllData()
renderDictionary(finishedElement,FINISHED_ID_KEY)
renderDictionary(unfinishedElement,UNFINISHED_ID_KEY)
renderAllBooks()

document.getElementById("add-button").addEventListener("click",()=>{
    showBookPopUp(BOOK_ADD);
})
