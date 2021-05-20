function validateTitle(title){
    let element = document.getElementById("title-error");
    let errorMsg = ""
    if(title == undefined || title === null || title === ""){
        errorMsg = "Nama tidak Boleh Kosong"
    }
    element.innerText = errorMsg
    if(errorMsg!=="") return false
    return true;
}
function validateAuthor(author){
    let element = document.getElementById("author-error");
    let errorMsg = ""
    if(author == undefined || author === null || author === ""){
        errorMsg = "Author tidak Boleh Kosong"
    }
    element.innerText = errorMsg
    if(errorMsg!=="") return false
    return true;
}
function validateYear(year){
    let element = document.getElementById("year-error");
    let errorMsg = ""
    if(year == undefined || year === null || year === ""){
        errorMsg = "Tahun tidak Boleh Kosong"
    }
    else if(isNaN(year)){
        errorMsg = "Tahun harus berupa angka"
    }

    element.innerText = errorMsg
    if(errorMsg!=="") return false
    return true;
}