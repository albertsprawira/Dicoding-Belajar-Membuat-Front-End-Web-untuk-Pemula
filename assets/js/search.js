let searchElement = document.getElementById("search")

function isLetter(letter){
    if(letter >="a" && letter<="z") return true
    if(letter >= "A" && letter <= "Z") return true
    return false
}

searchElement.addEventListener("input",(e)=>{
    let query = e.target.value

    if(query !== undefined && query.length >= 1){
        handleSearchView("hide")
        renderBookListQuery(finishedElement,FINISHED_ID_KEY, query)
        renderBookListQuery(unfinishedElement,UNFINISHED_ID_KEY, query)
    }
    else{
        handleSearchView("show")
        renderAllBooks()
    }
})