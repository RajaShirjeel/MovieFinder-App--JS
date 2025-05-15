import { API_KEY } from "./config"

export const state = {
    newMovies: [],
    genre: [],
    searchMovies: [],
    movie: {},
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

export const getSearchMovies = async function(query) {
    const res = await fetch(`https://api.watchmode.com/v1/autocomplete-search/?apiKey=${API_KEY}&search_value=${query}&search_type=3`);
    const {results} = await res.json();
    state.searchMovies = results;
}

export const getMovie = async function(movieId) {
    const res = await fetch(`https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${API_KEY}&append_to_response=cast-crew`);
    const data = await res.json();
    console.log(data);
}
