import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'No results for your query were found 🙈. Please try again! 🙉';
    _message = 'Start by searching for a recipe!.';

    _generateMarkup(){
        //console.log(this._data);
        return this._data.map(result => previewView.render(result,false)).join('');
    };

    // _generateMarkupPriview(result){

    //     const id = window.location.hash.slice(1);

    //     return `
    //     <li class="preview">
    //         <a class="preview__link ${result.id === id ? 'preview__link--active' : ''}" href="#${result.id}">
    //         <figure class="preview__fig">
    //             <img src="${result.image}" alt="${result.title}" />
    //         </figure>
    //         <div class="preview__data">
    //             <h4 class="preview__title">${result.title}</h4>
    //             <p class="preview__publisher">${result.publisher}</p>
    //         </div>
    //         </a>
    //     </li>
    //     `;
    // };
};
export default new ResultsView();