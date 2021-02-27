import React, { useState, useCallback, useEffect } from 'react';
import { Card } from './Card';
import { useGameConfig } from '../hooks/useGameConfig';

export const Field = () => {
  debugger
  const { gameField, startGameHandler, updateGameField } = useGameConfig();
  useEffect(() => startGameHandler(0, 51, 9), [startGameHandler])
  const [openCardsArray, setOpenCardsArray] = useState([]);

  //Спустить openCardsArray вниз ?
  // Можно просто добавлять в новое свойство и сравнивать длину
  
  const openCardsHandler = useCallback(event => {
    const target = event.target.closest('.card-container');
    const index = openCardsArray.indexOf(target);
    let array = [...openCardsArray];

 
      if (index === -1 && array.length < 2) {
        array.push(target)
        setOpenCardsArray(array)
      } else {
        array.splice(index, 1);
        setOpenCardsArray(array);
      }
 
  
     

  }, [openCardsArray]);

  
  useEffect(
    () => {
      if (openCardsArray.length === 2) {
        const result = openCardsArray[0].className === openCardsArray[1].className;

    
        if (!result) {
          setTimeout(() => {openCardsArray[0].click() }, 1000);
          setTimeout(() => { openCardsArray[1].click() }, 1200);
        } else {
          updateGameField(openCardsArray[0])
        }

        setOpenCardsArray([])
      }
    }, [gameField, openCardsArray, updateGameField])
  
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
              open={object.flipped}
            />)
        })
      }
    </div>
  )
}