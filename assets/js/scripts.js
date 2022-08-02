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

//Variables
var invisibleCol = document.getElementById('columnTwo');
var apiCallButton = document.getElementById('next-button');
var dogImage = document.getElementById('dogGen');
var catImage = document.getElementById('catGen');
var dogSaveBtn = document.getElementById('dog-picture');
var catSaveBtn = document.getElementById('cat-picture');
var dogUrl = "https://dog.ceo/api/breeds/image/random?api_key=2956d378-6020-4b69-9e28-da7f6fe497ea"
var catUrl = "https://api.thecatapi.com/v1/images/search?format=json&limit=1&mime_types=jpeg&api_key=14117caf-d563-42d7-9732-1db0619ab4b4"
var fav = JSON.parse(localStorage.getItem('favorite')) || []
let favoriteDog = ''
let favoriteCat = ''

//call Api images
function apiGenImages(){
    fetch(dogUrl)
    .then(res => res.json())
    .then(result => {
        console.log(result)
        dogImage.src = result.message
        favoriteDog = result.message
        console.log('the last dog url was saved in a string')
        console.log(favoriteDog)
    })    
    .catch(err=>console.log(err))

    fetch(catUrl)
        .then(res => res.json())
        .then(result => {
            console.log(result)
            catImage.src = result[0].url
            favoriteCat = result[0].url
            console.log('the last cat url was saved in a string')
            console.log(favoriteCat)
        })    
    .catch(err=>console.log(err))
};

//function to make next-button appear after the cat or dog button is clicked for the first time
function buttonAppear() {
    invisibleCol.removeAttribute('style');
};

//When next-button appears it will continously call images from both cat/dog apis
apiCallButton.addEventListener('click', function() {
    apiGenImages()
});

//Makes the first click of the clickable cat/dog call images and reveal the next button, then clicking the cat/dog will save the api image id to favorites
dogSaveBtn.addEventListener('click', function(){
    if (invisibleCol.style.display === "none") {
        console.log('this is the very first click')
        apiGenImages()
        buttonAppear()
        
    } else {
        console.log('this should run every next time button is pressed')
        dogSaveBtn.onclick = function(){
            fav.push(favoriteDog)
            localStorage.setItem('favorite', JSON.stringify(fav))
            console.log('This Dog url was saved to favorites container')
            console.log(localStorage)
        }
    }
});

catSaveBtn.addEventListener('click', function(){
    if (invisibleCol.style.display === "none") {
        console.log('this is the very first click')
        apiGenImages()
        buttonAppear()
        
    } else {
        console.log('this should run every next time button is pressed')
        catSaveBtn.onclick = function(){
            fav.push(favoriteCat)
            localStorage.setItem('favorite', JSON.stringify(fav))
            console.log('This cat url was saved to favorites container')
            console.log(localStorage)
        }       
}});
