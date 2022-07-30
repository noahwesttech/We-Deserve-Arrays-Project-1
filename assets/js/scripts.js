//variables
let likedArray = []
let currentFavorite = ""
const slideshow = document.querySelector("#slideshow")

//save and load functions
function save() {
    window.localStorage.setItem('friends', JSON.stringify(likedArray))
}

function load() {
    const stored = window.localStorage.getItem('friends')
    if (stored) {
        likedArray = JSON.parse(stored)
    }
}
//if no favorites, stop
function rollSlide() {
    if (likedArray.length===0) {
        return
    }
    for (let i = 0; i < likedArray.length; i++) {
        if (currentFavorite===likedArray[i] && i===likedArray.length - 1) {
            currentFavorite = likedArray[0] //if you are at end of list, go back to first
            return
        }
        //if current, go to next
        else if (currentFavorite===likedArray[i]){
            currentFavorite = likedArray[i + 1]
            return
        }

    }
}
function rollBack() {
    if (likedArray.length===0) {
        return
    }
    for (let i = 0; i < likedArray.length; i++) {
        if (currentFavorite===likedArray[i] && i === 0) {
            currentFavorite = likedArray[likedArray.length - 1] //if at start of array, go back
            return
        }
        //if current, go to previous
        else if (currentFavorite===likedArray[i]){
            currentFavorite = likedArray[i - 1]
            return
        }

    }
}
//making the slideshow. if nothing, show nada
function showSlideshow() {
    if (likedArray.length === 0){
        return
    }
    if (currentFavorite === "") {
        rollSlide()
    }
    displayImg() 
    
}

function displayImg() {
    slideshow.children[0].remove()
    const newSlide = document.createElement("img") //create space for img
    newSlide.setAttribute("src", currentFavorite) //puts source in
    newSlide.setAttribute("alt", "Your Current Favorite") //adds alts to your images
    slideshow.appendChild(newSlide) //attached img. YAY!
}

function addFavorite(event) { //pull source from img, append to favorite img array
    
}
//remove favorite?
//pull source from img, splice from array