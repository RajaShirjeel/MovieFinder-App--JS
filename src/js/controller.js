import { getNewMovies, state } from "./model";
import homeTemplate from "./templates/homeTemplate";

const leftArrowGenre = document.querySelector('.left-genre');
const rightArrowGenre = document.querySelector('.right-genre');
const containerGenre = document.querySelector('.genre--container-wrapper');
const leftArrowMovie = document.querySelector('.left-movie');
const rightArrowMovie = document.querySelector('.right-movie');
const containerMovie = document.querySelector('.movie--container-wrapper');


const scrollAmount = 300;

leftArrowGenre.addEventListener('click', () => {
    containerGenre.scrollBy({left: -scrollAmount, behavior: "smooth"});
})

rightArrowGenre.addEventListener('click', () => {
    containerGenre.scrollBy({left: scrollAmount, behavior: "smooth"});
})


leftArrowMovie.addEventListener('click', () => {
    containerMovie.scrollBy({left: -scrollAmount, behavior: "smooth"});
})

rightArrowMovie.addEventListener('click', () => {
    containerMovie.scrollBy({left: scrollAmount, behavior: "smooth"});
})

const newMoviesController = async function() {
    homeTemplate.renderMoviesLoader();
    await getNewMovies();
    homeTemplate.renderMovies(state.newMovies)
} 

const init = function() {
    newMoviesController()
}

init()