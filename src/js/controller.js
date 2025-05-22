import { getGenre, getGenreMovies, getMovie, getNewMovies, getSearchMovies, state } from "./model";
import { debounce } from "./helper";
import homeTemplate from "./templates/homeTemplate";
import movieTemplate from "./templates/movieTemplate";
import resultTemplate from "./templates/resultTemplate";

const renderHomepageController = async function() {
    homeTemplate.renderMoviesLoader();
    await getNewMovies();
    homeTemplate.renderMovies(state.newMovies)
    await getGenre();
    homeTemplate.renderGenre(state.genre);
    homeTemplate.addGenreHandler(renderGenreMovies);
}

const renderMovieController = async function() {
    const movieId = window.location.hash.slice(1);

    if (!movieId) return;
    await getMovie(movieId);
    movieTemplate.render(state.movie);
    movieTemplate.addRatingHandler(state.movie.rating);
}

const renderGenreMovies = async function(genreId) {
    await getGenreMovies(genreId);
    resultTemplate.render(state.genreMovies);
}

const searchMoviesController = debounce((query) => {
    getSearchMovies(query);
    homeTemplate.renderSearchMovies(state.searchMovies);
}, 250);

const init = function() {
    renderHomepageController();
    homeTemplate.addMovieScrollHandler();
    homeTemplate.addGenreScrollHandler();
    homeTemplate.addSearchMovieHandler(searchMoviesController);
    homeTemplate.addRenderMovieHandler(renderMovieController);
}

init();