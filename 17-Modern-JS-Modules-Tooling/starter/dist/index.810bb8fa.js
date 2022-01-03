//Importing module
// import { addToCart, tq ,totalPrice } from "./shoppingCart.js";
// console.log('Importing module');
// addToCart('bread',5);
// console.log(totalPrice,tq);
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread',5);
// console.log(ShoppingCart.totalPrice);
// import add, { addToCart, tq ,totalPrice } from './shoppingCart.js';
// import add, {cart} from './shoppingCart.js';
// console.log('Importing module');
// add('pizza',10);
// add('pork',20);
// add('fish',5);
// console.log(cart);
// //NOTE: Class 273: Top-level await (ES2022).
// const getLastPost = async function(){
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//     const data = await res.json();
//     console.log(data);
//     return {title: data.at(-1).title, text: data.at(-1).body};
// };
// const lastPost = getLastPost();
// console.log(lastPost);
// //Not very clean.
// // lastPost.then(last => console.log(last));
// const lastPost2 = await getLastPost();
// console.log(lastPost2);
// //NOTE: Class 274: The Module Pattern.
// const ShoppingCart2 = (function(){
//     const cart = [];
//     const shippingCost = 10;
//     const totalPrice = 237;
//     const totalQuantity = 23;
//     const addToCart = function(product,quantity){
//         cart.push({product,quantity});
//         console.log(`${product} ${quantity} added to cart`);
//     };
//     const orderStock = function(product,quantity){
//         console.log(`${product} ${quantity} ordered from supplier`);
//     };
//     return {
//         addToCart,
//         cart,
//         totalPrice,
//         totalQuantity,
//     };
// })();
// ShoppingCart2.addToCart('Apple',4);
// ShoppingCart2.addToCart('Pizzas',3);
// console.log(ShoppingCart2);
// // console.log(ShoppingCart2.shippingCost);
//NOTE: Class 277: Introduction to NPM.
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
const state = {
    cart: [
        {
            product: 'bread',
            quantity: 5
        },
        {
            product: 'pizza',
            quantity: 4
        }, 
    ],
    user: {
        loggedIn: true
    }
};
const staateClone = Object.assign({
}, state);
const stateDeeapClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(staateClone);
console.log(stateDeeapClone);

//# sourceMappingURL=index.810bb8fa.js.map
