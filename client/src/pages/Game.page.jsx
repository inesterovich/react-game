import React, { useState, useCallback, useEffect } from 'react';
import { Card } from '../components/Card';
import { useGameConfig } from '../hooks/useGameConfig';
import { utils } from '../utils'; 
import clickSRC from "../assets/audio/click.wav";
import { Modal } from '../components/Modal';
import succesGameSrc from '../assets/audio/success_game.wav';
import failedGameSrc from '../assets/audio/failed_game.mp3';
import { CustomButton } from '../components/Button';

export const GamePage = () => {
  const { gameField, startGameHandler, updateGameField, resetGameHandler } = useGameConfig();
  const [actions, setActions] = useState(null);
  const { storage } = utils;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => startGameHandler(0, 51, 9), [startGameHandler]);
  useEffect(() => {
    const data = storage.get('gameData');

    if (data && data.gameActions) {
      setActions(data.gameActions)
    }
  }, [storage]);

  const fullScreenHandler = (event) => {
    const root = document.getElementById('root');

    if (document.fullscreenElement === root) {
      document.exitFullscreen()
    } else {
      root.requestFullscreen()
    }
    
  }


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
 
  
     

  }, [openCardsArray, storage]);


  const modalHandler =
  useCallback(  (bool, audio) => {
    setModalOpen(bool);

    if (bool) {

      if (audio) {
        audio.play();
      }
      
    } else {
      
      if (audio) {
        audio.stop();
      };
      resetGameHandler();
    }
  }, [resetGameHandler] )

  useEffect(
    () => {
      if (openCardsArray.length === 2) {
        const result = openCardsArray[0].className === openCardsArray[1].className;

    
        if (!result) {
          setTimeout(() => {openCardsArray[0].click() }, 1000);
          setTimeout(() => { openCardsArray[1].click() }, 1200);
          const lastActions = actions - 1;
          if (lastActions !== 0) {
        
            setActions(lastActions);
            const data = storage.get('gameData');
            data.gameActions = lastActions;
            storage.set('gameData', data)
          } else {
           

            const data = storage.get('gameData');

            if (data.soundToogler) {
              const audio = new Audio();
              audio.src = failedGameSrc;
              audio.volume = data.soundVolume;
              modalHandler(true, audio);
            } else {
              modalHandler(true)
            }

          
            setModalMessage('Увы, вы проиграли');
            
          }
          
          
        } else {
          updateGameField(openCardsArray[0]);
          const lastActions = actions - 1;
          setActions(lastActions);
          const data = storage.get('gameData');
          data.gameActions = lastActions;
          storage.set('gameData', data);

          const cardsHTML = document.querySelectorAll('.card-container');
          const result = Array.from(cardsHTML).every((cardHTML) => cardHTML.classList.contains('disabled'));

          if (lastActions !== 0) {
        
            setActions(lastActions);
            const data = storage.get('gameData');
            data.gameActions = lastActions;
            storage.set('gameData', data)
          } else {
            
            if (data.soundToogler) {
              const audio = new Audio();
              audio.src = failedGameSrc;
              audio.volume = data.soundVolume;
              modalHandler(true, audio);
            } else {
              modalHandler(true)
            }

          
            setModalMessage('Увы, вы проиграли');
          }


          if (result) {

            if (data.soundToogler) {
              const audio = new Audio();
              audio.src = succesGameSrc;
              audio.volume = data.soundVolume;
              modalHandler(true, audio)
            } 
             setModalMessage('Поздравляем, вы выиграли!')
            modalHandler(true);
           }
       
        

        }

        setOpenCardsArray([])
      }
    }, [actions, gameField, modalHandler, modalMessage, openCardsArray, storage, updateGameField])

  
  
  
  
  
  
  return (
    <>
      <Modal
        message={modalMessage}
        isModalOpen={isModalOpen}
        modalHandler={modalHandler}
                            
          />
                <div className="gameStats">
                  <CustomButton
                              name="fullscreen"
                              text1="Полноэкранный режим"
                              text2="Выйти из полноэкранного режима"
          clickHandler={fullScreenHandler} />
        

                           
                        <p className="gameActions"> Осталось { actions } ходов</p>
                </div>
      
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
    </>
  
  )
}