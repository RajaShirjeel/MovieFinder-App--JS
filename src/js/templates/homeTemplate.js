class HomeTemplate {
    __containerMovies = document.querySelector('.movie--container-wrapper');

    renderMoviesLoader() {
        const markup = `
            <div class="loader--container--movie">
                <div class="loader"></div>
            </div>
        `
        this.__containerMovies.insertAdjacentHTML('afterbegin', markup);
    }

    renderMovies(data) {
        const markup = data.map(ob => {
            return `
                <div class="movie">
                    <a href="#${ob.id}" class="movie-link">
                        <img src="${ob.posterUrl}" alt="" class="movie--poster" alt='movie poster'>
                    </a>
                </div>
            `
        }).join('\n')

        this.__containerMovies.innerHTML = '';
        this.__containerMovies.insertAdjacentHTML('afterbegin', markup);
    }
}

export default new HomeTemplate();