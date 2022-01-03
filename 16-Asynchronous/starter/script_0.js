'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/////////////////////////////////////////////////////////////////

//NOTE: Class 245:Our first AJAX call.

// const getCountry = (countryName) => {
//     const request = new XMLHttpRequest();
//     request.open('GET',`https://restcountries.com/v2/name/${countryName}`);

//     request.send();

//     request.addEventListener('load', function(){
//         const data = JSON.parse(this.responseText);
//         console.log(data);
//         const html = `
//         <article class="country">
//             <img class="country__img" src="${data[0].flag}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data[0].name}</h3>
//                 <h4 class="country__region">${data[0].subregion}</h4>
//                 <p class="country__row"><span>👫</span>${data[0].population}</p>
//                 <p class="country__row"><span>🗣️</span>${data[0].languages[0].name}</p>
//                 <p class="country__row"><span>💰</span>${data[0].currencies[0].name}</p>
//             </div>
//         </article>
//         `;
//         countriesContainer.insertAdjacentHTML('beforeend',html);
//         countriesContainer.style.opacity = 1;
//     });
// };

// getCountry('salvador');
// getCountry('china');
// getCountry('germany');

//NOTE: Class 247: Welcome to Callback Hell.

const renderCountry = function(data,className = ''){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.subregion}</h4>
                <p class="country__row"><span>👫</span>${data.population}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
        </article>
        `;
        countriesContainer.insertAdjacentHTML('beforeend',html);
        // countriesContainer.style.opacity = 1;
};

// const getCountryAndNeighbour = (countryName) => {

//     //AJAX call country;

//     const request = new XMLHttpRequest();
//     request.open('GET',`https://restcountries.com/v2/name/${countryName}`);

//     request.send();

//     request.addEventListener('load', function(){
//         const [data] = JSON.parse(this.responseText);
//         console.log(data);

//         //Render country 1.
//         renderCountry(data);

//         //AJAX call country 2.
//         if(!data.borders) return;
//         const [...neighbour] = data.borders;
//         console.log(neighbour);

//         //Render country 2.
//         neighbour.forEach(nei => {
//             const request2 = new XMLHttpRequest();
//             request2.open('GET',`https://restcountries.com/v2/alpha/${nei}`);
//             request2.send();
//             request2.addEventListener('load',function(){
//                 // console.log(this.responseText);
//                 const neighbourData = JSON.parse(this.responseText);
//                 console.log(neighbourData);
                
//                 renderCountry(neighbourData,'neighbour');
//             });
//         });
        
//     });
// };
// getCountryAndNeighbour('Republic of India');

// const requestF = fetch(`https://restcountries.com/v2/name/salvador`);
// console.log(requestF);


//NOTE: Class 249: Consuming Promises.

const renderError = function (msg){
    countriesContainer.insertAdjacentText('beforeend',msg);
    countriesContainer.style.opacity = 1;
};

const getJSON = function(url,errorMsg = 'Something went wrong 😪'){
    return fetch(url).then(
        response => {
            console.log(response);
            if (!response.ok) 
                throw new Error(`${errorMsg} 🙄 ${response.status}`)
            return response.json();
        });
};

// const getCountryAndNeighbour = function(countryName){
//     fetch(`https://restcountries.com/v2/name/${countryName}`)
//     .then(response => {
//         console.log(response);
//         if (!response.ok) 
//             throw new Error(`Country not found ${response.status}`)
//         return response.json();
//     })
//     .then(([data]) => {
//         renderCountry(data);

//         console.log(data);

//         // if(!data.borders) return;
//         // const [...neighbour] = data.borders;
        
//         // console.log(neighbour);

//         const neighbour = ['sip','ddfa'];

//         return neighbour;
//     })
//     .then((neighbour) => {
//             neighbour.forEach(nei => {
                
//             console.log(nei);

//             fetch(`https://restcountries.com/v2/alpha/${nei}`)
//             .then((response) => {
//                 console.log(response);
//                 if(!response.ok)
//                     throw new Error(`Country not found ${response.status}`)
//                 return response.json()
//             })
//             .then((data) => {

//                 console.log(data);

//                 renderCountry(data, 'neighbour')}
//             );
//         });
//     })
//     .catch(err => {
//         console.error(`${err} 🔥🔥🔥`);
//         renderError(`Something went wrong 🔥🔥🔥 ${err.message}. Try Again! 😉 `);
//     })
//     .finally(() => countriesContainer.style.opacity = 1);
// };

// const getCountryAndNeighbour = function(countryName){
//     getJSON(`https://restcountries.com/v2/name/${countryName}`,'Country not found')
//     .then(([data]) => {
//         renderCountry(data);

//         console.log(data);

//         // if(!data.borders) return;
//         if(!data.borders) throw new Error('No neighbour found!.');
//         const [...neighbour] = data.borders;
        
//         console.log(neighbour);

//         // const neighbour = ['sip','ddfa'];

//         return neighbour;
//     })
//     .then((neighbour) => {
//             neighbour.forEach(nei => {
                
//             console.log(nei);

//             getJSON(`https://restcountries.com/v2/alpha/${nei}`,'Country not found')
//             .then((data) => {

//                 console.log(data);

//                 renderCountry(data, 'neighbour')}
//             );
//         });
//     })
//     .catch(err => {
//         console.error(`${err} 🔥🔥🔥`);
//         renderError(`Something went wrong 🔥🔥🔥 ${err.message}. Try Again! 😉 `);
//     })
//     .finally(() => countriesContainer.style.opacity = 1);
// };

// getCountryAndNeighbour('china');

// btn.addEventListener('click',function(){
//     getCountryAndNeighbour('aust');
    
// });
// getCountryAndNeighbour('daldkf');

// Challenge: #1.

// const mapApp = function(lat,long){
//     fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
//     .then(response => {
//         console.log(response);
//         if(!response.ok) throw new Error(`Something went wrong. 😨`)
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data.state,`Yuo are in ${data.country} 😁`);
//         return fetch(`https://restcountries.com/v2/name/${data.country}`)
//     })
//     .then((response)=>{
//         if(!response.ok) throw new Error (`Country not found ${response.status}`);
//         return response.json();
//     })
//     .then(([dataCard]) => {
//         console.log(dataCard);
//         renderCountry(dataCard)
//         const [...neighbour] = dataCard.borders;
//         return neighbour;
//     })
//     .then((nei)=>{
//         nei.forEach(element => {
//             getJSON(`https://restcountries.com/v2/alpha/${element}`,'Country not found')
//             .then((data) => {
            
//                 console.log(data);
            
//                 renderCountry(data, 'neighbour')}
//             );
//         });
//     })
//     .catch(err=>console.error(`${err} 🔥🤬`))
//     .finally(()=>{
//         countriesContainer.style.opacity = 1;
//     })
// };

// btn.addEventListener('click',function(){
//     //mapApp(13.704828, -89.146317)
//     mapApp(34.438251, -117.350247);
//     // mapApp(53.329740, -6.259435);
// });

// NOTE: Class 258.The Event Loop in Practice

// console.log('Test start');
// setTimeout(() => console.log('0 sec tiemr'),0);
// Promise.resolve('Resolve promise 1').then( res => console.log(res));

// Promise.resolve('Resolved promise 2').then( res => {
//     for(let i = 0;i<100; i++){
//     }
//     console.log(res);
// })

// console.log('Test end');

//NOTE: Class 259: Building a Simple Promise.

// const lotteryPromise = new Promise(function(resolve,reject){
//     console.log('Lotter draw is hapening 🔥')
//     setTimeout(()=>{
//         if(Math.random() >= 0.5){
//             resolve('You win 💲');
//         }else{
//             reject(new Error('You lost your money 💩'));
//         }
//     },2000)
// });

// lotteryPromise.then(res => console.log(res)).catch(err=>console.error(err));

// //Promisifying setTimeout
// const wait = function(seconds){
//     return new Promise(function(resolve){
//         setTimeout(resolve,seconds*1000);
//     });
// };

// wait(2).then(()=>{
//     console.log('I waited for 2 seconds');
//     return wait(1);
// }).then(()=> console.log('I waited for 1 second'));

// Promise.resolve('abc').then((x)=>console.log(x));
// Promise.reject(new Error('abc')).catch((x)=>console.error(x));

//NOTE: Class 260. Promisifying the Geolocation API.


// console.log('Getting position:');
// const getPosition = function(){
//     return new Promise(function(resolve,reject){
//         // navigator.geolocation.getCurrentPosition(position =>resolve(position),err=>reject(err));
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };

// getPosition().then(x=>console.log(x));

// const mapApp = function(){
//         getPosition().then((pos) => {
//             const {latitude: lat,longitude: lng} = pos.coords;
//             console.log(lat,lng)
//             return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//         })
//         .then(response => {
//             console.log(response);
//             if(!response.ok) throw new Error(`Something went wrong. 😨`)
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data.state,`Yuo are in ${data.country} 😁`);
//             return fetch(`https://restcountries.com/v2/name/${data.country}`)
//         })
//         .then((response)=>{
//             if(!response.ok) throw new Error (`Country not found ${response.status}`);
//             return response.json();
//         })
//         .then(([dataCard]) => {
//             console.log(dataCard);
//             renderCountry(dataCard)
//             const [...neighbour] = dataCard.borders;
//             return neighbour;
//         })
//         .then((nei)=>{
//             nei.forEach(element => {
//                 getJSON(`https://restcountries.com/v2/alpha/${element}`,'Country not found')
//                 .then((data) => {
                
//                     console.log(data);
                
//                     renderCountry(data, 'neighbour')}
//                 );
//             });
//         })
//         .catch(err=>console.error(`${err} 🔥🤬`))
//         .finally(()=>{
//             countriesContainer.style.opacity = 1;
//         })
//     };
    
// btn.addEventListener('click',mapApp);

//Promisifying the Geolocation API
// const getPosition = function () {
//     return new Promise(function (resolve, reject) {
//         // navigator.geolocation.getCurrentPosition(
//         //   position => resolve(position),
//         //   err => reject(err)
//         // );
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };
// getPosition().then(pos => console.log(pos));

// const whereAmI = function () {
//     getPosition()
//       .then(pos => {
//         const { latitude: lat, longitude: lng } = pos.coords;
  
//         return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//       })
//       .then(res => {
//         if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
//         return res.json();
//       })
//       .then(data => {
//         console.log(data.prov);
//         console.log(`You are in ${data.city}, ${data.country}`);
  
//         return fetch(`https://restcountries.eu/rest/v2/name/${data.prov}`);
//       })
//       .then(res => {
//         if (!res.ok) throw new Error(`Country not found (${res.status})`);
  
//         return res.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(err => console.error(`${err.message} 💥`));
// };

// btn.addEventListener('click', whereAmI);

//Challenge #2

// let currentImg;
// const imageContainer = document.querySelector('.images');

// const wait = function(seconds){
//     return new Promise(function(resolve){
//         setTimeout(resolve,seconds*1000);
//     });
// };

// const handResolve = (img,resolve) => {
//     imageContainer.append(img);
//     resolve(img);
// };

// const renderE = function (msg){
//     countriesContainer.insertAdjacentText('beforeend',msg);
// };


// const createImage = function(imgPath){
//     return new Promise(function(resolve, reject){
//         // img = new Image();
//         const img = document.createElement('img')
//         img.src = imgPath;
//         img.addEventListener('load',handResolve.bind(null,img,resolve));
//         img.addEventListener('error',function(){
//             reject(new Error('Image not found 🤔'));
//         });
//     });
// };

// createImage('./img/img-1.jpgs')
// .then( img => {
//     currentImg = img;
//     console.log('Image 1 is loaded.');
//     return wait(2);
// })
// .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('./img/img-2.jpg');
// })
// .then(img => {
//     currentImg = img;
//     console.log('Image 2 is loaded.');
//     return wait(2);
// })
// .then(() => {currentImg.style.display = 'none'})
// .catch(err => {
//     console.error(`${err.message} 💥`);
//     renderError(`Something went wrong 🔥🔥🔥 ${err.message}. Try Again! 😉 `);
// })
// .finally(() => countriesContainer.style.opacity = 1);

//NOTE: Class 262: Consuming Promises with Async/Await.

// const getPosition = function(){
//     return new Promise(function(resolve,reject){
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };

// const whereAmI = async function(){
//     try {//Geolocation
//     const pos = await getPosition();
//     const {latitude: lat, longitude: lng} = pos.coords;

//     //Reverse geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if(!resGeo.ok) throw new Error('Failed getting geo-data 😯.');
//     const dataGeo = await resGeo.json();
//     // console.log(dataGeo);
//     // fetch(`https://restcountries.com/v2/name/${country}`).then(res => console.log(res));

//     const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
//     if(!res.ok) throw new Error('Failed getting country name 😯.');
//     // console.log(res);
//     const data = await res.json();
//     // console.log(data);
//     renderCountry(data[0]);
//     return `You are in ${dataGeo.city}, ${dataGeo.country}`
// } catch(err){
//         console.error(`${err} 👀`);
//         renderError(`Something went wrong 💣: ${err.message}`);

//         //Reject promise returned from async function
//         throw err;
//     }
// };

// // whereAmI('salvador')
// // .then(city => console.log(city))
// // .catch(err => console.error(`2: ${err.message} 🤡`))
// // .finally(() => {
// //     console.log('Finished getting the location.');
// // })

// (async function(){
//     // const getCountry = await whereAmI();
//     // console.log(getCountry);
//     // if(getCountry === undefined)(err)=>console.error(`2: ${err.message} 😣`);
//     // console.log('Finished getting the location.');

//     try{
//         const city = await whereAmI();
//         console.log(city);
//     }catch(err){ 
//         console.error(`2: ${err.message} 🤡`);
//     }
//     console.log('Finished getting the location.');
// })();

//NOTE: Class 265: Runing Promises in Parallel.

// const get3Countries = async function(c1,c2,c3){
//     try{
//         // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//         // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//         // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

//         // console.log([data1.capital,data2.capital,data3.capital]);

//         const data = await Promise.all( 
//             [getJSON(`https://restcountries.com/v2/name/${c1}`),
//             getJSON(`https://restcountries.com/v2/name/${c2}`),
//             getJSON(`https://restcountries.com/v2/name/${c3}`)]);
        
//         console.log(data.map(d => d[0].capital));

//     }catch(err){
//         console.error(err);
//     };
// };

// get3Countries('salvador','usa','mexico');

//NOTE: Class 266: Other Promise Combinators: race, allSettled and any.

// //Promise.race
// (async function(){
//     const res = await Promise.race([
//         getJSON(`https://restcountries.com/v2/name/guatemala`),
//         getJSON(`https://restcountries.com/v2/name/japan`),
//         getJSON(`https://restcountries.com/v2/name/germany`)
//     ]);
//     console.log(res[0].name);
// })();

// const timeout = function(sec){
//     return new Promise(function(_,reject){
//         setTimeout(function(){
//             reject(new Error('Request took too long!'));
//         },sec * 1000);
//     });
// };

// Promise.race([
//     getJSON(`https://restcountries.com/v2/name/germany`),
//     timeout(1),
// ])
// .then(res => console.log(res[0]))
// .catch(err => console.error(`${err}`));

// //Promise.allSettled

// Promise.allSettled([
//     Promise.resolve('Success'),
//     Promise.reject('Error'),
//     Promise.resolve('Another sucess'),
// ])
// .then(res => console.log(res))
// .catch(err => console.error(err));

// //Promise.any
// Promise.any([
//     Promise.resolve('Success XD'),
//     Promise.reject('Error'),
//     Promise.resolve('Another sucess'),
// ])
// .then(res => console.log(res))
// .catch(err => console.error(err));

//Challenge #3

let currentImg;
const imageContainer = document.querySelector('.images');

const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve,seconds*1000);
    });
};

const handResolve = (img,resolve) => {
    imageContainer.append(img);
    resolve(img);
};

const renderE = function (msg){
    countriesContainer.insertAdjacentText('beforeend',msg);
};


const createImage = function(imgPath){
    return new Promise(function(resolve, reject){
        // img = new Image();
        const img = document.createElement('img')
        img.src = imgPath;
        img.addEventListener('load',handResolve.bind(null,img,resolve));
        img.addEventListener('error',function(){
            reject(new Error('Image not found 🤔'));
        });
    });
};

//===> Part 1. <===

const loadPause = async function(){
    try{
        currentImg = await createImage('./img/img-1.jpg');
        //console.log(currentImg);
        console.log('Image 1 is loaded.');
        //const __newAwait1 = await wait(2);
        await wait(2);

        currentImg.style.display = 'none';
        currentImg = await createImage('./img/img-2.jpg');
        console.log('Image 2 is loaded.');
        //const __newAwait2 = await wait(2);
        await wait(2);

        currentImg.style.display = 'none';
    }catch(err){
        console.error(`${err.message} 💥`);
        renderError(`Something went wrong 🔥🔥🔥 ${err.message}. Try Again! 😉 `);
    }
    countriesContainer.style.opacity = 1;
};

loadPause();

//===> Part 2. <===

// const imgArr = [
//     './img/img-1.jpg',
//     './img/img-2.jpg',
//     './img/img-3.jpg'
// ];

// const loadAll = async function(imgArr){
//     try{
//         const imgs = await Promise.all(imgArr.map( img => createImage(img)));
//         console.log(imgs);
//         imgs.forEach(img => img.classList.add('parallel'));
//     }catch(err){
//         console.error(`${err.message} 💣`);
//         renderError(`Something went wrong 💣💣 ${err.message}. Try Again! 👌`);
//     };
// };

// loadAll(imgArr);

//attempt #1

// (async function(){
//     try {
//         const currentImg1 = await createImage('./img/img-1.jpg');
//         // currentImg = img;
//         console.log(currentImg1);
//         console.log('Image 1 is loaded.');
//         const newWait = await function(){ wait(100)};
//         console.log(newWait);
//         newWait();
//         console.log('hola')
//     }catch(err){
//         console.error(`${err.message} 💥`);
//         renderError(`Something went wrong 🔥🔥🔥 ${err.message}. Try Again! 😉 `);
//     }
// })();

//===========>Original

// createImage('./img/img-1.jpg')
// .then( img => {
//     currentImg = img;
//     console.log('Image 1 is loaded.');
//     return wait(2);
// })
// .then(() => {
//     currentImg.style.display = 'none';
//     return createImage('./img/img-2.jpg');
// })
// .then(img => {
//     currentImg = img;
//     console.log('Image 2 is loaded.');
//     return wait(2);
// })
// .then(() => {currentImg.style.display = 'none'})
// .catch(err => {
//     console.error(`${err.message} 💥`);
//     renderError(`Something went wrong 🔥🔥🔥 ${err.message}. Try Again! 😉 `);
// })
// .finally(() => countriesContainer.style.opacity = 1);