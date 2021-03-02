import React, { useState, useCallback, useEffect } from 'react';
import { Card } from '../components/Card';
import { useGameConfig } from '../hooks/useGameConfig';
import { utils } from '../utils'; 
import clickSRC from "../assets/audio/click.wav";
import backgroundSondSRC from '../assets/audio/background_sound.wav';

export const GamePage = () => {
  const { gameField, startGameHandler, updateGameField } = useGameConfig();

  useEffect(() => startGameHandler(0, 51, 9), [startGameHandler]);

  const { storage } = utils;

  useEffect(() => {
    debugger;
    const data = storage.get('gameData');

    if (data.musicToogler) {

      const audio = new Audio();
      audio.src = backgroundSondSRC;
      audio.volume = data.musicVolume;
      audio.loop = true;
      audio.autoplay = true;
      audio.play();

    }


  }, [storage])
  const [openCardsArray, setOpenCardsArray] = useState([]);
  
  const openCardsHandler = useCallback(event => {
    const target = event.target.closest('.card-container');

  
    const data = storage.get('gameData');

    if (data.soundToogler) {
      const clickSound = new Audio();
      clickSound.src = clickSRC;
      clickSound.volume = data.soundVolume;
      clickSound.play();
    }

    
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
          updateGameField(openCardsArray[0]);

        

        }

        setOpenCardsArray([])
      }
    }, [ gameField, openCardsArray, updateGameField])

  
  
  
  
  
  
  return (
    <div className="game-field">

      {
        gameField.map((object, key) => {
          return (
            <Card
            tabIndex={key}
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