'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click',(e)=>{
  const slcoords = section1.getBoundingClientRect();
  console.log(slcoords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset,window.pageYOffset);

  console.log('hight/widht vimport', document.documentElement.clientHeight,
  document.documentElement.clientWidth);

  //Scrolling
  // window.scrollTo(slcoords.left + window.pageXOffset, slcoords.top + window.pageYOffset);

  // window.scrollTo({
  //   left: slcoords.left + window.pageXOffset,
  //   top: slcoords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({behavior: 'smooth'});
});

/////////////////////////////////////////
//NOTE: Class 189: Event Delegation.

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'}); 
//   });
// });

//1. Addevent listener to common parent element.
//2. Determine what element originated the event.

document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  // console.log(e.target);

  //Matching strategy
  if(e.target.classList.contains('nav__link')){
    console.log('LINK');
    const id = e.target.getAttribute('href');
    // console.log(id);
    if(id === '#') return;
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  };
});
/////////////////////////////////////////
//NOTE: Class 191: Building a Tabbed Component.

//Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach( t => t.addEventListener('click',() => console.log('tab')));

tabsContainer.addEventListener('click',function(e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //Guard clause
  if(!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Active tab.
  clicked.classList.add('operations__tab--active');

  //Activate content area
  // console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});
/////////////////////////////////////////
//NOTE: Class 192.

const handleHover = function (e) {
  // console.log(this)
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if(el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  };
};

//Menu fade animation
const nav = document.querySelector('.nav');

//Passing "argument" into handler.
nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));

/////////////////////////////////////////
//NOTE: Class 193: Sticky Navigation.
//Sticky navigation

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll',function(e){
//   // console.log(window.scrollY);

//   (window.scrollY > initialCoords.top) ? nav.classList.add('sticky') : nav.classList.remove('sticky');
// });

/////////////////////////////////////////
//NOTE: Class 194: Sticky navigation: Intersection Observer API.
// const obsCallback = function(entries, observer){
//   entries.forEach( entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   //Intersecting the viewport.
//   root: null,
//   threshold: [0,0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function( entries) {
  const [entry] = entries;
  // console.log(entry);

  !entry.isIntersecting ? nav.classList.add('sticky') : nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);
/////////////////////////////////////////
//NOTE: Class 195: Revealing Elements on Scroll.

//Reveal Sections

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObeserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section){
  sectionObeserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////////////////////
//NOTE: Class 196: Lazy loading images.

//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
// console.log(imgTargets);

const loadImg = function(entries,observer){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////
//NOTE: Class 197: Building a Slider Component.
const sliderF = function(){
  //Slider
  const slides = document.querySelectorAll('.slide');
  // const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length - 1;
  // console.log(maxSlide);

  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // slides.forEach((s,i) => s.style.transform = `translateX(${100 * i}%)`);
  //0%, 10%, 200%, 300%

  //Created in the next class.
  const activateDot = function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add(`dots__dot--active`);
  };

  const goToSlide = function(slide){
    // console.log(slide);
    slides.forEach((s,i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  };


  const nextSlide = function(){
    if( curSlide === maxSlide){
      curSlide =0;
    }else{
      curSlide++;
    };
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function(){
    if( curSlide === 0){
      curSlide = maxSlide;
    }else{
      curSlide--;
    };
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //Next slide
  btnRight.addEventListener('click',nextSlide);
  // -100%, 0%, 100%, 200%

  btnLeft.addEventListener('click',prevSlide);

  /////////////////////////////////////////
  //NOTE: Class 198: Building a Slider Component.

  const createDots = function(){
    slides.forEach(function(_,i){
      dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
    })
  };

  document.addEventListener('keydown',function(e){
    if(e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')) {
      // console.log('hola');
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    };
  });

  const init = function(){
    goToSlide(0);
    createDots();
    activateDot(0);
  };  
  init();
  
};
sliderF();

/////////////////////////////////////////
// //NOTE: Class 183.

// //Select element.

// console.log(document.head);

// const header = document.querySelector('.header');
// const allSections = document.querySelector('.section');

// console.log(allSections);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// console.log(document.getElementsByClassName('btn'));

// //Creating and inserting elements.

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>';

// // header.prepend(message);
// // header.append(message);
// // header.append(message.cloneNode(true));

// // header.after(message);
// header.before(message);

// const btnCookie = document.querySelector('.btn--close--cookie');
// btnCookie.addEventListener('click',() => {
//   message.remove();
// });

// //NOTE: Class 184: Styles.

// message.style.backgroundColor = '#37383d';

// //inline styles.
// message.style.width = '120%';

// console.log(message.style.color);
// console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// document.documentElement.style.setProperty('--color-primary','orangered');

// //Atributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// logo.alt = 'Beutiful minimalist logo';

// //Non-standdard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company','Bankist');

// console.log(logo.src)
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //Data attributes
// console.log(logo.dataset.versionNumber);

// //Classes
// logo.classList.add('c','j');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// //Don't use
// // logo.className = 'saul';

// //NOTE: Class 185.

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click',(e)=>{
//   const slcoords = section1.getBoundingClientRect();
//   console.log(slcoords);

//   console.log(e.target.getBoundingClientRect());

//   console.log('Current scroll (X/Y)', window.pageXOffset,window.pageYOffset);

//   console.log('hight/widht vimport', document.documentElement.clientHeight,
//   document.documentElement.clientWidth);

//   //Scrolling
//   // window.scrollTo(slcoords.left + window.pageXOffset, slcoords.top + window.pageYOffset);

//   // window.scrollTo({
//   //   left: slcoords.left + window.pageXOffset,
//   //   top: slcoords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({behavior: 'smooth'});
// });

// //NOTE: Class 187: Types of Events and Event Handlers.

// const h1 = document.querySelector('h1');

// const alertH1 = (e) => {
//   alert('addEventListener: Great! Yue are reading the heading :D');

//   // h1.removeEventListener('mouseenter',alertH1);
// };

// h1.addEventListener('mouseenter',alertH1);

// setTimeout(()=> h1.removeEventListener('mouseenter',alertH1), 3000);

// //Old school.
// // h1.onmouseenter = (e) => {
// //   alert('addEventListener: Great! Yue are reading the heading :D');
// // };

// //NOTE: Class 188: Event Propagation.

// //rgb(255,255,255)
// const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min); 

// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// // console.log(randomColor(0,255));

// document.querySelector('.nav__link').addEventListener('click',function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('LINK',e.target,e.currentTarget);
// });

// document.querySelector('.nav__links').addEventListener('click',function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER',e.target,e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click',function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('NAV',e.target,e.currentTarget);
// },true);

// //NOTE: Class 190: DOM Traversing.

// const h1 = document.querySelector('h1');

// //Going downwars: child.

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// console.log(h1.childNodes);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// //Going upwards: parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// h1.closest('h1').style.background = 'var(--gradient-primary)';

// //Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// //All the siblings
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function(el){
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

//NOTE: Class 199: Lifecycle of DOM events.
document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM tree built',e);
});

window.addEventListener('load',function(e){
  console.log('Page fully loaded',e);
});

// window.addEventListener('beforeunload',function(e){
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = 'nop 😐';
// });