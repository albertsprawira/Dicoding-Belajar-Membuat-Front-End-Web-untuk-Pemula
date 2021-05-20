function renderReverseArrow(element){
    let activateSvg = element.children[0].classList.contains("d-block") ? [".left",".right"] : [".right",".left"]
    
    let currentCursor = element.querySelector(activateSvg[0])
    let activateCursor = element.querySelector(activateSvg[1])
    activateCursor.classList.remove("d-none")
    activateCursor.classList.add("d-block")

    currentCursor.classList.remove("d-block")
    currentCursor.classList.add("d-none")
}
function slideController(element){
    let rightPosition = element.style.right.includes("0rem") ? "-6.25rem" : "0rem"
    element.style.right = rightPosition
}
function handleControl(e){
    let parentElement = e;
    renderReverseArrow(parentElement)
    let itemControlElement = parentElement.parentNode;
    slideController(itemControlElement)
}

function renderDictionary(container,key){
    let dict = container.querySelector(".dictionary")
    if(typeof(dict) == undefined || dict == null) return;
    for(let i='A'.charCodeAt(0); i<='Z'.charCodeAt(0);i++){
        let letter = String.fromCharCode(i);
        let newElement = document.createElement("a")
        newElement.setAttribute("href",`#${key}-${letter}`)
        newElement.classList.add("item")
        newElement.innerText = letter;
        dict.appendChild(newElement)
    }
}

function fetchBooksWithLetter(list,letter){
    return list.filter(obj => (obj.title).startsWith(letter))
}

function fetchBooksWithQuery(list,query){
    let queryUpper = query.toUpperCase();
    return list.filter(obj => (obj.title.toUpperCase()).includes(queryUpper))
}

function renderBookElement(container,key,letter=null,query=null){
    let data = []


    if(letter!=null){
        if(key === FINISHED_ID_KEY){
            data = fetchBooksWithLetter(finishedBookList,letter)
        }
        else{
            data = fetchBooksWithLetter(unfinishedBookList,letter)
        }
    }
    if(query!=null){
        if(key === FINISHED_ID_KEY){
            data = fetchBooksWithQuery(finishedBookList,query)
        }
        else{
            data = fetchBooksWithQuery(unfinishedBookList,query)
        }
    }

    if(data.length == 0) {
        let template = document.createElement("div")
        template.classList.add("no-data")
        template.innerHTML = "No Data"
        container.appendChild(template)
    }
    else{
        data.map( obj => {
            let template = document.createElement("div")
            template.classList.add("card-item")
            let content = `
                <div class="card-data">
                    <h3>${obj.title}</h3>
                    <p>Oleh : ${obj.author}</p>
                    <p>Tahun : ${obj.year}</p>
                </div>
                <div class="item-control">
                    <div class="pointer-control" onclick="handleControl(this)">
                        <svg class="left d-block" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="451.847px" height="451.847px" viewBox="0 0 451.847 451.847" style="enable-background:new 0 0 451.847 451.847;" xml:space="preserve"><g>	<path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0   c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744   c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                        <svg class="right d-none"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="451.846px" height="451.847px" viewBox="0 0 451.846 451.847" style="enable-background:new 0 0 451.846 451.847;" xml:space="preserve"><g>	<path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744   L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284   c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                    </div>
                    <div id=${obj.id}>
                        <div class="control-btn edit" onclick="editBookAction(this)">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="528.899px" height="528.899px" viewBox="0 0 528.899 528.899" style="enable-background:new 0 0 528.899 528.899;" xml:space="preserve"><g>	<path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981   c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611   C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069   L27.473,390.597L0.3,512.69z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                            <span>Edit</span>
                        </div>
                        <div class="control-btn delete" onclick="deleteBookConfirmation(this)">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="900.5px" height="900.5px" viewBox="0 0 900.5 900.5" style="enable-background:new 0 0 900.5 900.5;" xml:space="preserve"><g>	<path d="M176.415,880.5c0,11.046,8.954,20,20,20h507.67c11.046,0,20-8.954,20-20V232.487h-547.67V880.5L176.415,880.5z    M562.75,342.766h75v436.029h-75V342.766z M412.75,342.766h75v436.029h-75V342.766z M262.75,342.766h75v436.029h-75V342.766z"/>	<path d="M618.825,91.911V20c0-11.046-8.954-20-20-20h-297.15c-11.046,0-20,8.954-20,20v71.911v12.5v12.5H141.874   c-11.046,0-20,8.954-20,20v50.576c0,11.045,8.954,20,20,20h34.541h547.67h34.541c11.046,0,20-8.955,20-20v-50.576   c0-11.046-8.954-20-20-20H618.825v-12.5V91.911z M543.825,112.799h-187.15v-8.389v-12.5V75h187.15v16.911v12.5V112.799z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                            <span>Hapus</span>
                        </div>
                    </div>
                </div>

            `
            template.innerHTML = content
            container.appendChild(template)
        })
    }
}

function renderBookList(container, key){
    let bookListContainer = container.querySelector(".book-list")
    bookListContainer.innerHTML=""
    for(let i='A'.charCodeAt(0); i<='Z'.charCodeAt(0);i++){
        let letter = String.fromCharCode(i);
        let newElement = document.createElement("div")
        newElement.setAttribute("id",`${key}-${letter}`)
        newElement.classList.add("letter")
        newElement.innerText = letter;
        bookListContainer.appendChild(newElement)
        renderBookElement(bookListContainer,key,letter)
    }
}


function renderBookListQuery(container, key, query){
    let bookListContainer = container.querySelector(".book-list")
    bookListContainer.innerHTML=""
    let newElement = document.createElement("div")
    renderBookElement(bookListContainer,key,null,query)
}

function renderAllBooks(){
    renderBookList(finishedElement,FINISHED_ID_KEY)
    renderBookList(unfinishedElement,UNFINISHED_ID_KEY)
}

function handleSearchView(action){
    let dictionary = document.getElementsByClassName("dictionary")
    let bookList = document.getElementsByClassName("book-list")
    let style = action=="hide" ? {"display":"none","flexBasis":"100%"} :  {"display":"flex","flexBasis":"93%"} 

    for(let element of dictionary){
        element.style.display = style.display
    }
    for(let element of bookList){
        element.style.flexBasis = style.flexBasis
    }
}
