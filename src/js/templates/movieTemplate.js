class MovieTemplate {
    #container = document.querySelector('.container');
    
    #getEmbedUrl(youtubeUrl) {
      const videoId = youtubeUrl.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    addRatingHandler(ratingM) {
        const rating = ratingM;
        const maxRating = 10;
        const starsMax = 5;
        
        const ratingOutOfFive = (rating / maxRating) * starsMax;
        const rounded = Math.round(ratingOutOfFive * 2) / 2;
        const widthPercent = (rounded / starsMax) * 100;
        
        document.querySelector(".stars-inner").style.width = `${widthPercent}%`;
    }

    render(data) {
        const markup = `
        <div class="movie--poster--container" style="background-image: url('${data.poster}'">
            <div class="poster--overlay"></div>
            <div class="poster--text--container">
                <h1 class="movie--name">${data.title}</h1>
                <div class="movie--small--info">
                    <p class="movie--year">${data.year},</p>
                    <p class="movie--genre">${data.genre}</p>
                </div>
            </div> 
        </div>
        ${data.rating !== null ?  `
                    <div class="movie--rating--container">
            <p class="rating">${data.rating}</p>
            <div class="stars-outer">
                <div class="stars-inner">
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                </div>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
            </div>
        </div>
        `: ''}


        <div class="movie--info--container">
            <div class="movie--summary">
                <p class="summary">${data.plot}</p>
            </div>
            <div class="movie--cast--container">
                <p class="movie-info-heading">Cast</p>
                <div class="movie--cast">
                    ${data.cast.map(ob => {
                        return `
                        <div class="cast">
                            <div class="cast-img-container">
                                <img src="${ob.headshot_url}" alt="cast-img" class="cast-img">
                                <p class="cast-name">${ob.full_name}</p>
                                <p class="cast-role">${ob.role}</p>
                            </div>
                         </div>
                        `
                    }).join('\n')}
                </div>
            </div>
            ${data.trailer !== null ? `
            <div class="movie--trailer--container">
                <p class="movie-info-heading">Trailer</p>
                <div class="trailer">
                    <iframe width="1000" height="515" 
                        src=${this.#getEmbedUrl(data.trailer)}
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
                `: ''}

        </div>
        `

        this.#container.textContent = '';
        this.#container.insertAdjacentHTML('afterbegin', markup);
    }
}

export default new MovieTemplate();