class ResultTemplate {
    #container = document.querySelector('.container');
    

    render(data) {
        const markup = `
        <div class="all--movies--container">
            <h2 class="heading-all-movies">${data.length} results</h2>
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