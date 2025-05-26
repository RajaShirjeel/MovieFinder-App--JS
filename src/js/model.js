import { API_KEY, RESULTS_PER_PAGE } from "./config"

export const state = {
    newMovies: [],
    genreMovies: [],
    genre: [],
    searchMovies: [],
    movie: {},
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
}

export const getNewMovies = async function() {
    try {
        const res = await fetch(`https://api.watchmode.com/v1/releases/?apiKey=${API_KEY}`);
        if (!res.ok) throw new Error('Server did not respond please try again!')
        let {releases} = await res.json();
        releases = releases.filter(ob => ob.poster_url !== "")
        .map(ob => ({
        id: ob.id,
        posterUrl: ob.poster_url,
        }))
        state.newMovies = releases;
    }
    catch(err) {
        throw err;
    }

}

export const getGenre = async function() {
    try {
        const res = await fetch(`https://api.watchmode.com/v1/genres/?apiKey=${API_KEY}`);
        if (!res.ok) throw new Error('Server did not respond please try again!')
        const data = await res.json();
        state.genre = data;
    }

    catch(err) {
        throw err;
    }

}

export const loadGenreMovies = async function(id) {
    try {
        const res = await fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=${API_KEY}&genres=${id}`);
        if (!res.ok) throw new Error('Server did not respond please try again!')
        const data = await res.json();
        state.genreMovies = data.titles;
    }

    catch (err) {
        throw err;
    }

}

export const getGenreMovies = function(page = state.page) {
    state.page = page;
    const start = (page - 1) * state.resultsPerPage;
    const end = page * state.resultsPerPage;
    return state.genreMovies.slice(start, end);
}

export const getSearchMovies = async function(query) {
    try {
        const res = await fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${API_KEY}&search_value=${query}&search_type=3`);
        if (!res.ok) throw new Error('Server did not respond please try again!')
        const {results} = await res.json();
        state.searchMovies = results;
    }

    catch(err) {
        throw err;
    }
}

export const getMovie = async function(movieId) {
    try {
        const res = await fetch(`https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${API_KEY}&append_to_response=cast-crew`);
        if (!res.ok) throw new Error('Server did not respond please try again!')
        const data = await res.json();
        const movie = {
            title: data.title,
            cast: data.cast.length > 0 ? data.cast : null,
            rating: data.user_rating,
            plot: data.plot_overview,
            genre: data.genre_names[0],
            year: data.release_date.split('-')[0],
            trailer: data.trailer,
            poster: data.poster
        }

        state.movie = movie;
    }

    catch (err) {
        throw err;
    }

}
