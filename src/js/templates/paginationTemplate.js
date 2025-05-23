class PaginationTemplate {
    #container = document.querySelector('.container');

    addPaginationHandler(handler) {
        document.querySelectorAll('.pagination-btn').forEach(el => {
            el.addEventListener('click', (e) => {
            const target = e.target.closest('.pagination-btn');
            if (!target) return;
            const goToPage = +target.dataset.goto;
            handler(goToPage);
            })
        })
    }

    #generateMarkup(data) {
        let currPage = data.page;
        const totalPages = Math.ceil(data.genreMovies.length / data.resultsPerPage);

        if (currPage === 1 && totalPages > 1) {
            return `
                <p class="pagination-text">Page ${currPage} of ${totalPages}</p>
                <button class="pagination--right pagination-btn" data-goto="${currPage + 1}"><ion-icon name="arrow-forward-outline"></ion-icon></button>
            `
        }

        if (currPage === totalPages && totalPages > 1) {
            return `
            <button class="pagination--left pagination-btn" data-goto="${currPage - 1}"><ion-icon name="arrow-back-outline"></ion-icon></button>
            <p class="pagination-text">Page ${currPage} of ${totalPages}</p>
            `
        }

        if (currPage < totalPages) {

            return `
                <button class="pagination--left pagination-btn" data-goto="${currPage - 1}"><ion-icon name="arrow-back-outline"></ion-icon></button>
                <p class="pagination-text">Page ${currPage} of ${totalPages}</p>
                <button class="pagination--right pagination-btn" data-goto="${currPage + 1}"><ion-icon name="arrow-forward-outline"></ion-icon></button>
            `
        }

        return `<p class="pagination-text">Page ${currPage} of ${totalPages}</p>`
    }

    render(data) {

        const markup = `
        <div class="pagination--container">
            <div class="pagination">
                ${this.#generateMarkup(data)}
            </div>
        </div>
        `

        this.#container.insertAdjacentHTML('beforeend', markup);
    }
}

export default new PaginationTemplate();