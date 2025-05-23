class ResultTemplate {
    #container = document.querySelector('.container');
    
    renderLoader() {
        const markup = `
                <div class="loader--container--genre">
                    <div class="loader"></div>
                </div>
            `
        this.#container.innerHTML = '';
        this.#container.insertAdjacentHTML('afterbegin', markup);
    }

    render(data) {
        const markup = `
        <div class="all--movies--container">
            <ol class="movie--results">
                ${data.map(obj => {
                    return `
                    <li><a href="#${obj.id}" class="movie-result">${obj.title}</a></li>
                    `
                }).join('\n')}
            </ol>
        </div>
        `
        this.#container.innerHTML = '';
        this.#container.insertAdjacentHTML('afterbegin', markup);
    }
}

export default new ResultTemplate();