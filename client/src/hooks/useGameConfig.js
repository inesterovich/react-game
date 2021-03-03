import { useState, useCallback } from 'react';
import { utils } from '../utils';

const storageName = 'gameData'

export const useGameConfig = () => {
  const [gameField, setGameField] = useState([]);
  const { generateSet, storage } = utils;

  const generateGameArray = 
    useCallback((min, max, length) => {

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
  }, [generateSet])

  const startGameHandler = useCallback(() => {
   
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
        gameLevel: 4,
        gameActions: 32,
        cardsColor: 'blue',
        soundToogler: true,
        soundVolume: 1.0,
        
      }

      gameData.gameField = generateGameArray(0, 51, gameData.fieldSize /2 )

      setGameField(gameData.gameField)
      storage.set(storageName, gameData);
      
    }
    
  }, [generateGameArray, storage])

  const resetGameHandler = useCallback(() => {
    const data = storage.get('gameData');
    delete data.gameField;
    data.gameActions = data.fieldSize * data.gameLevel;
    storage.set(storageName, data);
    window.location.reload()


  }, [storage])

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
   

  }, [gameField, storage]);

 
 

  
  

  return {
    gameField,
    startGameHandler,
    updateGameField,
    resetGameHandler
     
  }




}