import View from './View';
import icons from 'url:../../img/icons.svg';

class paginationView extends View{
    _parentElement = document.querySelector('.pagination');

    addHandlerClick(handler){
        this._parentElement.addEventListener('click',function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            // console.log(btn);

            const goToPage = +btn.dataset.goto;
            // console.log(goToPage);

            handler(goToPage);
        });
    };
    
    _generateMarkupButton(type, currentPage) {
    return `
        <button data-goto="${type === 'next' ? currentPage + 1 : currentPage - 1}" class="btn--inline pagination__btn--${type}">
        ${type === 'next' ? `<span>Page ${currentPage + 1}</span>` : ''}
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${type === 'next' ? 'right' : 'left'}"></use>
        </svg>
        ${type === 'prev' ? `<span>Page ${currentPage - 1}</span>` : ''}
        </button>
    `
    };

    _generateMarkup(){
        const curPage = this._data.page;
        const numPage = Math.ceil(this._data.result.length / this._data.resultPerPage);
        // console.log(numPage)

        //Page 1, and there are other pages.
        if(curPage === 1 && numPage > 1){
            return this._generateMarkupButton('next', curPage);
        };

        //Last page
        if(curPage === numPage && numPage > 1){
            return this._generateMarkupButton('prev', curPage);
            
        };
        
        //Other page
        if(curPage < numPage){
            return  `${this._generateMarkupButton('next', curPage)}${this._generateMarkupButton('prev', curPage)}`;
        };

        //Page 1, and there are NO other pages.
        return ``
    };
};

export default new paginationView();