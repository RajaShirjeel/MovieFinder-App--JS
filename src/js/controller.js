import { getMovie, getNewMovies, getSearchMovies, state } from "./model";
import { debounce } from "./helper";
import homeTemplate from "./templates/homeTemplate";

const newMoviesController = async function() {
    homeTemplate.renderMoviesLoader();
    await getNewMovies();
    homeTemplate.renderMovies(state.newMovies)
} 

const searchMoviesController = debounce((query) => {
    getSearchMovies(query);
    homeTemplate.renderSearchMovies(state.searchMovies);
}, 250);

const renderMovieController = async function() {
    const movieId = window.location.hash.slice(1);

    if (!movieId) return;
    getMovie(movieId);
}


const init = function() {
    newMoviesController();
    homeTemplate.addMovieScrollHandler();
    homeTemplate.addGenreScrollHandler();
    homeTemplate.addSearchMovieHandler(searchMoviesController);
    homeTemplate.addRenderMovieHandler(renderMovieController);
}

// init();