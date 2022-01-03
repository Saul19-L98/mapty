import * as model from './model';
import recipeView from './view/recipeView';
import searchView from './view/searchView';
import resultsView from './view/resultsView';
import bookmarksView from './view/bookmarksView';
import paginationView from './view/paginationView';
import addRecipeView from './view/addRecipeView';

// import icons from '../img/icons.svg'; //Parcel 1
// import icons from 'url:../img/icons.svg'; //Parcel 
import { MODAL_CLOSE_SEC } from './config';
import 'core-js/stable';
import 'regenerator-runtime/runtime'
import View from './view/View';

// const recipeContainer = document.querySelector('.recipe');

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// const renderSpinner = function(parentEl){
//   const markup = `
//     <div class="spinner">
//       <svg>
//         <use href="${icons}#icon-loader"></use>
//       </svg>
//     </div>
//   `;
//   parentEl.innerHTML = '';
//   parentEl.insertAdjacentHTML('afterbegin',markup);
// };

//NOTE: This cames form parcel (Not real js).
if(module.hot){
  module.hot.accept();
}

const controlRecipes = async function(){
  try {

    const id = window.location.hash.slice(1);
    // console.log(id);
    if(!id) return;

    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result.
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1) Loading recipe.
    await model.loadRecipe(id);

    // 2) Rendering recipe.

    recipeView.render(model.state.recipe);

  } catch(err){
      // console.error(`Something went wrong: ${err.message} 😣👀`);
      // alert(err);
      // recipeView.renderError(`${err.message} 😣👀`);
      recipeView.renderError();
      console.error(err);
    };
};

// ['hashchange','load'].forEach(ev => window.addEventListener(`${ev}`,controlRecipes));
// window.addEventListener('hashchange',Recipe);
// window.addEventListener('load',showRecipe);

const controlSearchResults = async function(){
  try{

    resultsView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if(!query) return;

    // 2) Load search results.
    await model.loadSearchResult(query);

    // 3) Render results.
    //console.log(model.state.search.result);
    //resultsView.render(model.state.search.result);
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons.
    paginationView.render(model.state.search);

  }catch(err){
    recipeView.renderError();
    // console.error(err);
  }
};

const controlPagination = function(goToPage){
  // 1) Render NEW results.
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW initial pagination buttons.
  paginationView.render(model.state.search);
};

const controlServings = function(updateTo){
  
  //Update the recipe servings( in state )
  model.updateServings(updateTo);

  //Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function(){
  // 1) Add / remove bookmark
  if(!model.state.recipe.bookmarked) 
    model.addBookMark(model.state.recipe);
  else
    model.deleteBookmark(model.state.recipe.id);

  // 2) Update bookmarks
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlLoadBookmarked = function(){
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe){
  try {
      //console.log(newRecipe);

      //Show loading spinner.
      addRecipeView.renderSpinner();

      //Upload the new recipe data.
      await model.uploadRecipe(newRecipe);
      // console.log(model.state.recipe);

      //Add recipe.
      addRecipeView.render(model.state.recipe);

      //Success message.
      addRecipeView.renderMessage();

      //Render bookmark view.
      bookmarksView.render(model.state.bookmarks);

      //Change ID in URL.
      window.history.pushState(null,'',`#${model.state.recipe.id}`);

      //Close from window.
      setTimeout(function(){
        addRecipeView.toggleWindow();
      },MODAL_CLOSE_SEC);

  }catch(err){
    console.error(err);
    addRecipeView.renderError(err.message);
  };

};

const init = function(){
  bookmarksView.addHandlerBookmarks(controlLoadBookmarked);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerBookMark(controlAddBookmark);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  addRecipeView.addHandlerUploadWindow(controlAddRecipe);
}; 
init();