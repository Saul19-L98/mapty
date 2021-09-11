'use strict';

// Data needed for a later exercise
const flights =
  `_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30`;

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starIndex, mainIndex) {
    return [this.starterMenu[starIndex],this.mainMenu[mainIndex]];
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// let [first,,second] = restaurant.categories;
// console.log(first,second);

// console.log(restaurant.order(3,2));

// let newsStarterMenu = [...restaurant.starterMenu];
// let newsMainMenu = [...restaurant.mainMenu];
// console.log(newsStarterMenu);
// console.log(newsMainMenu);

// let completeMenu1 = [...newsStarterMenu, ...newsMainMenu];

// console.log(completeMenu1);

// let completeMenu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];

// console.log(completeMenu2);

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//Challenge #1: Section 9.

// const player1 = [...game.players[0]];
// console.log(player1);

// const player2 = [...game.players[1]];
// console.log(player2);

// const [player1, player2] = game.players;
// // console.log(player1,player2);

// const [gk1,...fp1] = player1;
// // console.log(gk1, fp1);

// const [gk2,...fp2] = player2;
// // console.log(gk2, fp2);

// const allPlayers = [...player1, ...player2];
// // console.log(allPlayers);

// const substitutes = ['Thiago', 'Coutinho', 'Perisic'];
// const players1Final = [...player1,...substitutes]
// // console.log(players1Final);

// const {team1:team1, team2:team2,  x:draw} = game.odds;
// // console.log(team1,draw,team2);

// // const printGoal = (playerIndex) => {
// //   return allPlayers[playerIndex]
// // };

// // console.log(printGoal(4))

// //part 6
// let printGoal = (...players)=>{
//   return `${players.length} is the score of the match.`
// }; 

// console.log(printGoal('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'));

// //part 7
// console.log(`${(team1 < team2 && game.team1) || (team2 < team1 && game.team2)
// } is more likely to win.`);

// //Challenge #2: section 9

// //Part 1.
// const [...scored] = game.scored;
// // console.log(...keyScored);
// let i = 0;
// for (const item of scored){
//   i++;
//   console.log(`Goal:${i} from ${item}`);
// };

// //Part 2.

// // const odds = ({team1, team2, draw});
// // console.log(odds);
// const values = Object.values(game.odds);
// console.log(values);

// let y = 0;
// for ( const item of values){
//   y += item;
// };
// console.log(`The average of odds is: ${(y/values.length).toFixed(2)}`);

// //Part 3
// const entries = Object.entries(game.odds);
// const tm1 = game.team1;
// const tm2 = game.team2;
// console.log(tm1);

// for(const [key, value] of entries){
//   // console.log(key);
//   // console.log(value);
//   if(key === 'team1'){
//     console.log(`Odd of victory ${tm1}: ${value}`)
//   }else if(key === 'team2'){
//     console.log(`Odd of victory ${tm2}: ${value}`)
//   }else{
//     console.log(`Odd of draw: ${value}`)
//   };
// };

// //Part 4.
// const scorers = {};
// for (const players of game.scored){
//   console.log(players);
//   scorers[players] ? scorers[players]++ : scorers[players] = 1;
//   console.log(scorers[players]);
// };
// console.log(scorers);

// //Challenge #3: section 9.

const gameEvents = new Map([
  [17,'⚽ GOAL'],
  [36,'🔁 Substitution'],
  [47,'⚽ GOAL'],
  [61,'🔁 Substitution'],
  [64,'📒 Yellow card'],
  [69,'📕 Red card'],
  [70,'🔁 Substitution'],
  [72,'🔁 Substitution'],
  [76,'⚽ GOAL'],
  [80,'⚽ GOAL'],
  [92,'📒 Yellow card'],
]);

// //Part 1.
// const events = [...new Set(gameEvents.values())];
// console.log(events);

// //Part 2.
// gameEvents.delete(64);
// console.log(gameEvents);

// //Part 3.
// let eventtimer = 0;
// let eventTime = [];
// for (let time of gameEvents.keys()) {
 
//   console.log(eventTime.push(time - eventtimer));
 
//   eventtimer = time;
// }
// console.log(eventTime);
// const calcAverage = function (arr) {
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
//   }
//   return sum / arr.length;
// };
// console.log(calcAverage(eventTime));
// console.log(`An event happened every ${calcAverage(eventTime)} minutes`);

// //Part 4.
// for(const [time,event] of gameEvents.entries()){
//   const eventTime0 = (time <= 45 ? `[First half] ` : `[Second half] `) + `${time}: ${event}`;
//   console.log(eventTime0);
// };

//Challenge #4: section 9.
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', () => {
  const text = document.querySelector('textarea').value;
  // let textLower = text.toLowerCase();
  let textSplit = text.split('\n');
  // console.log(textSplit);
  for(const [i, row] of textSplit.entries()){
    const [first, second] = row.toLowerCase().trim().split('_');
    const newWord = `${first}${second.replace(second[0], second[0].toUpperCase())}`;
    // console.log(newWord);
    console.log(`${newWord.padEnd(20)}${'🍀'.repeat(i+1)}`)
  };
});

// console.log(`${newWord.padEnd(20)}${'🍀'.repeat(i+1)}`)

//Extra content.

const getCode = str => str.slice(0,3).toUpperCase();

console.log(flights.split('+'));
for(const flight of flights.trim('\n').split('+')){
  // console.log(flight.split(';'));
  const [first, second, third,fourth] = flight.split(';');
  const Output = `${first.startsWith('_Delayed') ? '⛳' : '🎈'}${first.replaceAll('_', ' ')} from ${getCode(second)} to ${getCode(third)} ${fourth.replace(':','h')}`.padStart(48);
  console.log(Output);
};