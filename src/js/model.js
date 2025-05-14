import { API_KEY } from "./config"

export const state = {
    newMovies: [],
    movie: {},
    genre: []
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
    console.log(state.newMovies)
}

getNewMovies()