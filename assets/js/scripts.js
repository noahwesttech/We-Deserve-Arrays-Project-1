//variables
let likedArray = []
let currentFavorite = ""
const slideshow = document.querySelector("#slideshow")
const showFav = document.querySelector("#favorite-btn")
const showModal = document.querySelector("#modal")
const closeBtn = document.querySelector("#closeBtn")
const previousFave = document.querySelector("#previousFave")
const nextFave = document.querySelector("#nextFave")
const clearFave = document.querySelector("#deleteBtn")

//save and load functions
showFav.addEventListener('click', modalToggle)
closeBtn.addEventListener('click', modalToggle)
previousFave.addEventListener('click', lastImg)
nextFave.addEventListener('click', nextImg)
clearFave.addEventListener('click', deleteFavorites)

function modalToggle() {
    if (welcomePage.style.display === "") {
        console.log('favorites button will not open on welcome page')       
    } else {
        showModal.classList.toggle("is-active")
        load()
        showSlideshow()
    } 
}

function saveDogs() {
    fav.push(favoriteDog)
    localStorage.setItem('favorite', JSON.stringify(fav))
}

function saveCats() {
    fav.push(favoriteCat)
    localStorage.setItem('favorite', JSON.stringify(fav))
}

function load() {
    console.log("loading")
    const stored = window.localStorage.getItem('favorite')
    console.log(stored)
    if (stored) {
        likedArray = JSON.parse(stored)
        currentFavorite = likedArray[0]
    }
}

function nextImg() {
    rollSlide()
    displayImg()
}

function lastImg() {
    rollBack()
    displayImg()
}

//if no favorites, stop
function rollSlide() {
    if (likedArray.length===0) {
        return
    }
    for (let i = 0; i < likedArray.length; i++) {
        console.log(`current: ${currentFavorite}, array: ${likedArray[i]}`)
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

 //Emptys arrays, clears the local storage, and replaces currrent favorite with empty string
function deleteFavorites(){
    likedArray.splice(0, likedArray.length)
    fav.splice(0, fav.length)
    localStorage.clear()
    currentFavorite = ""  
};

//Variables
var invisibleCol = document.getElementById('columnTwo');
var apiCallButton = document.getElementById('next-button');
var dogImage = document.getElementById('dogGen');
var catImage = document.getElementById('catGen');
var dogSaveBtn = document.getElementById('dog-picture');
var catSaveBtn = document.getElementById('cat-picture');
var startBtn = document.getElementById('start-btn');
var welcomePage = document.getElementById('welcome-page');
var picPage = document.getElementById('picture-page');
var dogUrl = "https://dog.ceo/api/breeds/image/random?api_key=2956d378-6020-4b69-9e28-da7f6fe497ea"
var catUrl = "https://api.thecatapi.com/v1/images/search?format=json&limit=1&mime_types=jpeg&api_key=14117caf-d563-42d7-9732-1db0619ab4b4"
var fav = JSON.parse(localStorage.getItem('favorite')) || []
let favoriteDog = ""
let favoriteCat = ""



//call Api images and save the image url to an empty string
function apiGenImages(){
    fetch(dogUrl)
    .then(res => res.json())
    .then(result => {
        console.log(result)
        dogImage.src = result.message
        favoriteDog = result.message
    })    
    .catch(err=>console.log(err))

    fetch(catUrl)
        .then(res => res.json())
        .then(result => {
            console.log(result)
            catImage.src = result[0].url
            favoriteCat = result[0].url
        })    
    .catch(err=>console.log(err))
};

//function to make next-button appear
function buttonAppear() {
    invisibleCol.removeAttribute('style');
};

//When next-button appears it will continously call images from both cat/dog apis
apiCallButton.addEventListener('click', apiGenImages)

//clicking the cat/dog images will save the api url to favorites
dogSaveBtn.addEventListener('click', saveDogs)
catSaveBtn.addEventListener('click', saveCats)

// Welcome Page with start button event listener. Will start the app to show the pictures
startBtn.addEventListener('click', function(){
    if (invisibleCol.style.display === "none") {
        welcomePage.style.display = "none";
        picPage.style.display = "block";
        apiGenImages()
        buttonAppear()
    }
});