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
  const [gameStatus, setGameStatus] = useState(false);
  const [ready, setReady] = useState(false);
  const [flipped, setFlipped] = useState([])
 
  const {generateSet, storage } = utils;

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
  
    
    if (data) {

      if (data.gameField) {
        setGameField(data.gameField)
      } else {
        data.gameField = generateGameArray(0, 51, data.fieldSize / 2)
        setGameField(data.gameField);
        storage.set(storageName, data)
      }


    } else {
      const gameData = {
        fieldSize: 8,
        timerToogler: false,
        gameTime: null,
        soundToogler: true,
        soundVolume: 1.0,
        musicToogler: true,
        musicVolume: 1.0,
      }

      gameData.gameField = generateGameArray(0, 51, gameData.fieldSize /2 )

      setGameField(gameData.gameField)
      storage.set(storageName, gameData);
      
    }
    



    
  }, [generateSet, storage])

  const updateGameField = useCallback((cardHTML) => {
    const target = cardHTML.className.split(' ')[1];
    const copyArray = [...gameField];
    const updatedArray = copyArray.map((object) => {
      return {
        ...object,
        flipped: object.cardNumber === target ? true : object.flipped
      }
    })

    const gameData = storage.get(storageName)

    storage.set(storageName, {
      ...gameData,
      gameField: updatedArray
    })
   
    const cardsHTML = document.querySelectorAll('.card-container');
   const result = Array.from(cardsHTML).every((cardHTML) => cardHTML.classList.contains('disabled'));
    if (result) {
      alert('You won!')
    }

  }, [gameField, storage]);

 
 

  
  

  return {
    gameField,
    startGameHandler,
    updateGameField,
     
  }




}