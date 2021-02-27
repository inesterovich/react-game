import { useState, useCallback, useEffect } from 'react';
import { utils } from '../utils';

/* 
Что должен делать этот хук? 
Он должен:

1. Генерировать состояние игрового поля;
2. Сохранять его в localStorage;
3. Доставать оттуда, если оно там есть. 
*/

const storageName = 'gameData'

export const useGameConfig = () => {
  const [gameField, setGameField] = useState([]);
  const [ready, setReady] = useState(false);
 
  const {generateSet, storage } = utils;
 
/* 

  Нужен отдельный стейт для состояния игры или сделать меню. 

  Выносим все лишние функции из хука
*/

  const startGameHandler = useCallback((min, max, length) => {
    const cardsNames = [
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
    const generateGameArray = (min, max, length) => {
      let arr = Array.from(generateSet(min, max, length));
      arr = arr.concat(arr);
      var j, temp;
      for(var i = arr.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
  
      arr = arr.map(item => {
        return {
          cardNumber: cardsNames[item],
          cardImg: require(`../assets/deck/${cardsNames[item]}.png`).default,
          flipped: false,
        }
      })
      return arr;
    }

    const data = storage.get(storageName);
    if (data && data.arr) {
      setGameField(data.arr)
    } else {
      const arr = generateGameArray(min, max, length);
      const gameData = {
        arr
      }
      setGameField(arr);
      storage.set(storageName, gameData);
    }



    
  }, [generateSet, storage])

  const updateGameField = useCallback((cardHTML) => {
    const target = cardHTML.className.split(' ')[1];
    const copyArray = [...gameField];
    const updatedArray = copyArray.map((object) => {
      return {
        cardNumber: object.cardNumber,
        cardImg: object.cardImg,
        flipped: object.cardNumber === target? true: object.flipped
      }
    })

    storage.set(storageName, {arr: updatedArray})
  
  }, [gameField, storage]) 
  
  

  return {
    gameField,
    startGameHandler,
    updateGameField
  }


  /* 
  Что должен уметь этот хук? 
  1. Создавать первичное состояние поля;
  2. Сохранять состояние игры;
  3. Очищать состояние игры. 

  Похоже, весьма похоже на useAuth
  */

}