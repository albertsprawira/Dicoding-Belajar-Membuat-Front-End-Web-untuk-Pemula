let finishedButtonNav = document.getElementById("finished-nav-btn")
let unfinishedButtonNav = document.getElementById("unfinished-nav-btn")

finishedButtonNav.addEventListener("click",()=>{
    unfinishedElement.classList.remove("active")
    finishedElement.classList.add("active")
})
unfinishedButtonNav.addEventListener("click",()=>{
    unfinishedElement.classList.add("active")
    finishedElement.classList.remove("active")
})