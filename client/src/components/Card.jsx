import React, { useEffect, useState } from "react";
import { utils } from '../utils';


export const Card = ({ cardNumber, cardImg, cardsHadler, open, tabIndex }) => {

  const [flipped, setFlipped] = useState(open);
  const [cardsColor, setCardsColor] = useState('blue');
  const { storage } = utils;

  useEffect(() => {
    const data = storage.get('gameData');
    if (data && data.cardsColor) {
      setCardsColor(data.cardsColor)
    }
  }, [storage])

  return (
    <div tabIndex={tabIndex} className={`card-container ${cardNumber} ${flipped ? 'disabled' : ''}`}
      onKeyDown={(event) => {

        if (event.key === "Enter") {
      
            setFlipped(!flipped);
            cardsHadler(event);
         
        }
      }}
      
      onClick={(event) => {
      if (event.isTrusted) {
        setFlipped(!flipped);
        cardsHadler(event);
      } else {
        setFlipped(!flipped)
      }
      
    }}>
      <div className={`front ${flipped ? 'active' : ''}`}>
        <img src={`${cardImg}`} alt="cardNumber"/>
      </div>
      <div
        className={`back ${!flipped ? 'active' : ''}`}
        style={{backgroundColor: cardsColor}}
      ></div>
    </div>
  )
}