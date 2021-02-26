import React from 'react';
import { Card } from './Card';
import { utils } from '../utils';

export const Field = () => {
  
  const cardsName = [
    'two_spades',
    'two_spades',
    'three_spades',
    'four_spades',
    'five_spades',
    'six_spades',
    'seven_spades',
    'eight_spades',
    'nine_spades',
    'ten_spades',
    'jack_spades',
    'queen_spades',
    'king_spades',
    'ace_spades',
    'two_clubs',
    'three_clubs',
    'four_clubs',
    'five_clubs',
    'six_clubs',
    'seven_clubs',
    'eight_clubs',
    'nine_clubs',
    'ten_clubs',
    'jack_clubs',
    'queen_clubs',
    'king_clubs',
    'ace_clubs',
    'two_hearts',
    'three_hearts',
    'four_hearts',
    'five_hearts',
    'six_hearts',
    'seven_hearts',
    'eight_hearts',
    'nine_hearts',
    'ten_hearts',
    'jack_hearts',
    'queen_hearts',
    'king_hearts',
    'ace_hearts',
    'two_diamonds',
    'three_diamonds',
    'four_diamonds',
    'five_diamonds',
    'six_diamonds',
    'seven_diamonds',
    'eight_diamonds',
    'nine_diamonds',
    'ten_diamonds',
    'jack_diamonds',
    'queen_diamonds',
    'king_diamonds',

  ]
  
  const cardsConfig = cardsName.map(item => {
    return {
      cardNumber: item,
      cardImg: require(`../assets/deck/${item}.png`).default
    }
  });

  const gameNumbers = Array.from(utils.generateSet(0, 51, 9));


  function shuffleArray(arr){
    var j, temp;
    for(var i = arr.length - 1; i > 0; i--){
      j = Math.floor(Math.random()*(i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  let gameSelection = shuffleArray(gameNumbers.concat(gameNumbers));
 
  let gameData = gameSelection.map((item) => cardsConfig[item])
 
  
  return (
    <div className="game-field">

      {
        gameData.map((object, key) => {
          return (
            <Card
            key={key}
            cardNumber={object.cardNumber}
            cardImg={object.cardImg} />)
        })
      }
    </div>
  )
}