let POP_UP_KEY = "pop-up"

function closePopUp(){
    let popUpElement = document.getElementById(POP_UP_KEY)
    document.body.removeChild(popUpElement)
}

function renderContent(child){
    let template = `
        <div class="pop-up">
            <div class="btn-close">
                <svg onclick="closePopUp()" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="41.756px" height="41.756px" viewBox="0 0 41.756 41.756" style="enable-background:new 0 0 41.756 41.756;" xml:space="preserve"><g>	<path d="M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465   c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071   C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343   c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z"></path></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
            </div>
            <div class="content">
                ${child}
            </div>
        </div>
    `
    return template
}

const BOOK_ADD = "add"
const BOOK_EDIT = "edit"
function showBookPopUp(action=BOOK_EDIT,dataEdit=null){
    let popUpElement = document.createElement("div")
    popUpElement.classList.add("pop-up-overlay")
    popUpElement.setAttribute("id",POP_UP_KEY)

    let content = `
        <form id="form-add">
            <input type="text" name="title" id="title" placeholder="Masukkan Judul">
            <label id="title-error" class="error-text"></label>
            <input type="text" name="author" id="author" placeholder="Masukkan Author">
            <label id="author-error" class="error-text"></label>
            <input type="text" name="year" id="year" placeholder="Masukkan Tahun">
            <label id="year-error" class="error-text"></label>
            <input type="checkbox" name="complete" id="complete">
            <label for="complete">Selesai Dibaca</label>
            <input type="submit" value="Simpan">
        </form> 
    `
    let template = renderContent(content)
    popUpElement.innerHTML= template
    document.body.appendChild(popUpElement)

    if(action===BOOK_EDIT && dataEdit.id!== null){
        document.getElementById("title").value = dataEdit.title
        document.getElementById("author").value = dataEdit.author
        document.getElementById("year").value = dataEdit.year
        document.getElementById("complete").checked = dataEdit.isComplete
    }

    document.getElementById("title").addEventListener("input",(e)=>{
        validateTitle(e.target.value)
    })
    document.getElementById("author").addEventListener("input",(e)=>{
        validateAuthor(e.target.value)
    })
    document.getElementById("year").addEventListener("input",(e)=>{
        validateYear(e.target.value)
    })
    document.getElementById("form-add").addEventListener("submit",(e)=>{
        e.preventDefault()
        let title = document.getElementById("title").value
        let author = document.getElementById("author").value
        let year = document.getElementById("year").value
        let isComplete = document.getElementById("complete").checked

        let isTitleValid = validateTitle(title)
        let isAuthorValid = validateAuthor(author)
        let isYearValid = validateYear(year)

        if(isTitleValid && isAuthorValid && isYearValid){
            const obj = {title,author,year,isComplete}
            if(action===BOOK_ADD) {
                obj.id = +new Date()
                addBook(obj)
            }
            if(action===BOOK_EDIT){
                obj.id = dataEdit.id
                editBook(dataEdit.key, obj)
            }
        } 
    })
}

function showDeleteConfirmation(book){
    let popUpElement = document.createElement("div")
    popUpElement.classList.add("pop-up-overlay")
    popUpElement.setAttribute("id",POP_UP_KEY)
    
    let content = `
        <section class="delete-confirmation">
            <h3>Apakah anda yakin ingin menghapus</h3>
            <h2>${book.title}</h2>
            <div id=${book.id}>
                <div onclick="closePopUp()" id="delete-conf-no" class="delete-conf-btn">Tidak</div>
                <div onclick="deleteBook(this)" id="delete-conf-yes" class="delete-conf-btn">Ya</div>
            </div>
        </section>
    `
    let template = renderContent(content)
    popUpElement.innerHTML= template
    document.body.appendChild(popUpElement)
}

