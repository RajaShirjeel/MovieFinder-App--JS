import { getGenre, getGenreMovies, loadGenreMovies, getMovie, getNewMovies, getSearchMovies, state } from "./model";
import { debounce } from "./helper";
import homeTemplate from "./templates/homeTemplate";
import movieTemplate from "./templates/movieTemplate";
import resultTemplate from "./templates/resultTemplate";
import paginationTemplate from "./templates/paginationTemplate";
import { DEBOUNCE_DELAY } from "./config";

const renderHomepageController = async function() {
    try {
        homeTemplate.renderMoviesLoader();
        homeTemplate.renderGenreLoader();
        await getNewMovies();
        homeTemplate.renderMovies(state.newMovies)
        await getGenre();
        homeTemplate.renderGenre(state.genre);
        homeTemplate.addGenreHandler(renderGenreMovies);
    }

    catch (err) {
        homeTemplate.renderErrorMovie(err.message);
        homeTemplate.renderErrorGenre(err.message);
    }

}

const renderMovieController = async function() {
    try {
        const movieId = window.location.hash.slice(1);

        if (!movieId) return;
        movieTemplate.renderLoader();
        await getMovie(movieId);
        movieTemplate.render(state.movie);
        movieTemplate.addRatingHandler(state.movie.rating);
    }

    catch (err) {
        movieTemplate.renderError(err.message);
    }
}

const renderPaginationController = function(goToPage) {
    resultTemplate.render(getGenreMovies(goToPage));
    paginationTemplate.render(state);
    paginationTemplate.addPaginationHandler(renderPaginationController);
}

const renderGenreMovies = async function(genreId) {
    try {
        resultTemplate.renderLoader();
        await loadGenreMovies(genreId);
        resultTemplate.render(getGenreMovies(1));
        paginationTemplate.render(state);
        paginationTemplate.addPaginationHandler(renderPaginationController);
    }

    catch (err) {
        resultTemplate.renderError(err.message);
    }
}

const searchMoviesController = debounce(async (query) => {
    try {
        await getSearchMovies(query);
        homeTemplate.renderSearchMovies(state.searchMovies);
    }

    catch (err) {
        console.log(err)
    }

}, DEBOUNCE_DELAY);

const init = function() {
    renderHomepageController();
    homeTemplate.addMovieScrollHandler();
    homeTemplate.addGenreScrollHandler();
    homeTemplate.addSearchMovieHandler(searchMoviesController);
    homeTemplate.addRenderMovieHandler(renderMovieController);
}

init();