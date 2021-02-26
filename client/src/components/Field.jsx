import React, { useState, useCallback, useEffect } from 'react';
import { Card } from './Card';
import { utils } from '../utils';
import { useGameConfig } from '../hooks/useGameConfig';

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

  const { gameField, startGameHandler } = useGameConfig();
  
  useEffect(() => startGameHandler(0, 51, 9), [startGameHandler])

  const [openCardsArray, setOpenCardsArray] = useState([]);
  

/*
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
 /* 
 Проблема заключается в том, что при каждом клике меняется состояние поля и вся ахинея генерится заново. То есть, мне нужен свой собственный хук. 
 
  let gameData = gameSelection.map((item) => cardsConfig[item]);

  */


  const openCardsHandler = useCallback(event => {
    const target = event.target.closest('.card-container');
    const index = openCardsArray.indexOf(target);
    
 
    if (index === -1) {
      setOpenCardsArray([...openCardsArray, target])
    } else {
      const array = [...openCardsArray];
      array.splice(index, 1);
      setOpenCardsArray(array);
    }
    

  }, [openCardsArray]);
  
  useEffect(() => console.log(openCardsArray), [openCardsArray])
  
  return (
    <div className="game-field">

      {
        gameField.map((object, key) => {
          return (
            <Card
            key={key}
            cardNumber={object.cardNumber}
              cardImg={object.cardImg}
              cardsHadler={openCardsHandler}
            />)
        })
      }
    </div>
  )
}