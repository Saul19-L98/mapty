'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//NOTE: Class 244: Our First AJAX call: XMLHttpRequest

// const getCountryData = function(country){
//     const request = new XMLHttpRequest();
//     request.open('GET',`https://restcountries.eu/rest/v2/name/${country}`);
//     request.send();

//     request.addEventListener('load', function(){
//         // console.log(this.responseText);
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         const html = `
//         <article class="country">
//             <img class="country__img" src=${data.flag} />
//                 <div class="country__data">
//                     <h3 class="country__name">${data.name}</h3>
//                     <h4 class="country__region">${data.region}</h4>
//                     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//                     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//                     <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
//                 </div>
//         </article>
//         `;

//         countriesContainer.insertAdjacentHTML('beforeend',html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountryData('salvador');
// getCountryData('us');
// getCountryData('usa');

///////////////////////////////////////
//NOTE: Class 244: Our First AJAX call: XMLHttpRequest

const renderCountry = function(data,className = ''){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src=${data.flag} />
                <div class="country__data">
                    <h3 class="country__name">${data.name}</h3>
                    <h4 class="country__region">${data.region}</h4>
                    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
                    <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
                </div>
        </article>
        `;
        countriesContainer.insertAdjacentHTML('beforeend',html);
        // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////////////////////////////////////
//Added in class 250.
const renderError = function(msg){
    countriesContainer.insertAdjacentText('beforeend',msg);
    // countriesContainer.style.opacity = 1;
};
///////////////////////////////////////////////////////////////////////

const getCountryAndNeighborData = function(country){
    
    //AJAX call country 1.
    const request = new XMLHttpRequest();
    request.open('GET',`https://restcountries.eu/rest/v2/name/${country}`);
    request.send();

    request.addEventListener('load', function(){
        // console.log(this.responseText);
        const [data] = JSON.parse(this.responseText);
        console.log(data);

        //Render country 1.
        renderCountry(data);

        //Get neighbour country 2.
        const [...neighbour] = data.borders;
        if(!neighbour) return;
        console.log(neighbour);

         // -->AJAX call country 2.

        // const request2 = new XMLHttpRequest();
        // for(let i=0; i < neighbour.length; i++){
        //     const request2 = new XMLHttpRequest();
        //     request2.open('GET',`https://restcountries.eu/rest/v2/alpha/${neighbour[i]}`);
        //     request2.send();
        //     request2.addEventListener('load',function(){
        //         // console.log(this.responseText);
        //         const data2 = JSON.parse(this.responseText);
        //         renderCountry(data2,'neighbour');
        //     });
        // };
        neighbour.forEach(nei => {
            const request2 = new XMLHttpRequest();
            request2.open('GET',`https://restcountries.eu/rest/v2/alpha/${nei}`);
            console.log(nei)
            request2.send();
            request2.addEventListener('load',function(){
        
                const data2 = JSON.parse(this.responseText);
                renderCountry(data2,'neighbour');
            });
        });
    });
};

//getCountryAndNeighborData('salvador');
// getCountryAndNeighborData('us');
// getCountryAndNeighborData('usa');

//NOTE: Class 247: Promises and the Fetch API.

const requestF = fetch(`https://restcountries.eu/rest/v2/name/salvador`);

console.log(requestF);   

// const getCountryData = function(country){
//     fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(function(response){
//         console.log(response);
//         return response.json();
//     }).then(function(data){
//         console.log(data);
//         renderCountry(data[0]);
//     });
// };



const getCountryData = function(country){
    //Country 1.
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then((response) =>response.json())
    //Destructuring Array
    .then(([data]) => {
        renderCountry(data);
        const [...neighbour] = data.borders;
        // const neighbour = data.borders[0];
        if(!neighbour) return;
        console.log(neighbour);

        //Country 2.
        // return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);

        return neighbour;
    }).then((neighbour) => {
        neighbour.forEach(nei => {
            fetch(`https://restcountries.eu/rest/v2/alpha/${nei}`)
            .then((response) => response.json())
            .then((data) => renderCountry(data, 'neighbour'));
        });
    })
    .catch(err => {
        console.error(`${err} 🔥🔥🔥`)
        renderError(`Something went wrong 🔥🔥🔥 ${err.message}, try aganin!`)
    })
    .finally(() => {countriesContainer.style.opacity = 1;});
};


//NOTE: Class 250: Handing Rejected Promises
btn.addEventListener('click',function(){
    getCountryData('salvador');
});