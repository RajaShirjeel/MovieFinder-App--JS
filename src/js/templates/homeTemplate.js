class HomeTemplate {
    #body = document.querySelector('body');
    #containerMovies = document.querySelector('.movie--container-wrapper');
    #containerGenre = document.querySelector('.genre--container-wrapper');
    #leftArrowGenre = document.querySelector('.left-genre');
    #rightArrowGenre = document.querySelector('.right-genre');
    #leftArrowMovie = document.querySelector('.left-movie');
    #rightArrowMovie = document.querySelector('.right-movie');
    #searchbar = document.querySelector('.searchbar'); 
    #searchItemOverlay = document.querySelector('.searchbar--search-items--overlay');
    #searchMoviesContainer = document.querySelector('.search-items--container');
    #scrollAmount = 300;


    addRenderMovieHandler(handler) {
        window.addEventListener('hashchange', handler);
        window.addEventListener('load', handler);
    }

    addGenreScrollHandler() {
        this.#leftArrowGenre.addEventListener('click', () => {
            this.#containerGenre.scrollBy({left: -this.#scrollAmount, behavior: "smooth"});
        })

        this.#rightArrowGenre.addEventListener('click', () => {
            this.#containerGenre.scrollBy({left: this.#scrollAmount, behavior: "smooth"});
        })
    }

    addSearchMovieHandler(handler) {
        this.#searchbar.addEventListener('input', () =>{
            this.#searchItemOverlay.style.display = 'block';
            handler(this.#searchbar.value);
        })

        this.#body.addEventListener('click', () => {
            this.#searchItemOverlay.style.display = 'none';
        })
    }

    addMovieScrollHandler() {
        this.#leftArrowMovie.addEventListener('click', () => {
            this.#containerMovies.scrollBy({left: -this.#scrollAmount, behavior: "smooth"});
        })

        this.#rightArrowMovie.addEventListener('click', () => {
            this.#containerMovies.scrollBy({left: this.#scrollAmount, behavior: "smooth"});
        })

    }

    renderGenre(data) {
        const markup = data.map(obj => {
            return `
                <div class="genre" data-id="${obj.id}">
                        <div class="genre-icon--container">
                            <ion-icon name="videocam-outline" class="genre-icon"></ion-icon>
                        </div>
                        <p class="genre-txt">${obj.name}</p>
                </div>
            `
        }).join('\n');

        this.#containerGenre.insertAdjacentHTML('afterbegin', markup);
    }

    renderSearchMovies(data) {
        const markup = data.map(ob => {
            return `
                <a href="#${ob.id}" class="search-item">${ob.name}</a>
            `
        }).join('\n');
        this.#searchMoviesContainer.innerHTML = '';
        this.#searchMoviesContainer.insertAdjacentHTML('afterbegin', markup);
    }

    renderMoviesLoader() {
        const markup = `
            <div class="loader--container--movie">
                <div class="loader"></div>
            </div>
        `
        this.#containerMovies.insertAdjacentHTML('afterbegin', markup);
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

        this.#containerMovies.innerHTML = '';
        this.#containerMovies.insertAdjacentHTML('afterbegin', markup);
    }
}

export default new HomeTemplate();