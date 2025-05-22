import { API_KEY } from "./config"

export const state = {
    newMovies: [],
    genreMovies: [],
    genre: [],
    searchMovies: [],
    movie: {},
    currPage: 1,
}

export const getNewMovies = async function() {
    const res = await fetch(`https://api.watchmode.com/v1/releases/?apiKey=${API_KEY}`);
    let {releases} = await res.json();
    releases = releases.filter(ob => ob.poster_url !== "")
    .map(ob => ({
      id: ob.id,
      posterUrl: ob.poster_url,
    }))
    state.newMovies = releases;
}

export const getGenre = async function() {
    const res = await fetch(`https://api.watchmode.com/v1/genres/?apiKey=${API_KEY}`);
    const data = await res.json();
    state.genre = data;
}

export const getGenreMovies = async function(id) {
    const res = await fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=${API_KEY}&genres=${id}`);
    const data = await res.json();
    state.genreMovies = data.titles;
    console.log(state.genreMovies)
}

export const getSearchMovies = async function(query) {
    const res = await fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${API_KEY}&search_value=${query}&search_type=3`);
    const {results} = await res.json();
    state.searchMovies = results;
}

export const getMovie = async function(movieId) {
    const res = await fetch(`https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${API_KEY}&append_to_response=cast-crew`);
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
