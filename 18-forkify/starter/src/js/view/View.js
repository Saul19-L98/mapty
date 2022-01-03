import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';

export default class View {
    _data;

    /**
     * Render he received object to the DOM
     * @param {Object | Object[]} data The data to be rendered (e.g recipe) 
     * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM.
     * @returns {undefined | string} A markup string is returned if render=false
     * @this {Object} View instance
     * @author Saul Lainez
     * @todo finish implementation
     */ 

    render(data,render = true){
        if(!data || Array.isArray(data) && data.length === 0) return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();

        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    };

    renderSpinner() {
        const markup = `
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
            `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    };

    renderError(message = this._errorMessage) {
        const markup = `
        <div class="error">
            <div>
            <svg>
                <use href="${icons}#icon-alert-triangle"></use>
            </svg>
            </div>
            <p>${message}</p>
        </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    };

    renderMessage(message = this._message) {
        const markup = `
        <div class="recipe">
            <div class="message">
            <div>
                <svg>
                <use href="${icons}#icon-smile"></use>
                </svg>
            </div>
            <p>${message}</p>
        </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin',markup);
    };

    update(data){
        // if(!data || Array.isArray(data) && data.length === 0) return this.renderError();
        this._data = data;
        const newMarkup = this._generateMarkup();
        const newDom = document.createRange().createContextualFragment(newMarkup);
        const newElement = Array.from(newDom.querySelectorAll('*'));
        const curElement = Array.from(this._parentElement.querySelectorAll('*'));
        
        newElement.forEach((newEl,i) => {
            const curEl = curElement[i];
            //console.log(curEl, newEl.isEqualNode(curEl));

            //Update changed TEXT.

            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ''){
                // console.log('👌😯',newEl.firstChild.nodeValue.trim());
                curEl.textContent = newEl.textContent;
            };

            //Update changed ATRIBUTES.

            if(!newEl.isEqualNode(curEl)){
                // console.log(Array.from(newEl.attributes));
                Array.from(newEl.attributes).forEach(
                    attr => curEl.setAttribute(attr.name,attr.value));
            };
        });
    };

    addHandlerRender(handler) {
        ['hashchange','load'].forEach(ev => window.addEventListener(`${ev}`,handler));
    };

    _clear(){
        this._parentElement.innerHTML = '';
    };
};