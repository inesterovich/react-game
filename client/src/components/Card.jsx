import React, { useState } from "react";

export const Card = ({ cardNumber, cardImg, cardsHadler }) => {
  
  
  const [flipped, setFlipped] = useState(false);
  /* 

  Какие состояния есть у карты? 
   Перевернутая или нет?

  
  */
  
  /* Вот у меня есть поле. По клику карточка переворачивается, вызывается  */
  return (
    <div className={`card-container ${cardNumber}`} onClick={(event) => {
      
      setFlipped(!flipped);
      cardsHadler(event);
    }}>
      <div className={`front ${flipped ? 'active' : ''}`}>
        <img src={`${cardImg}`} alt="cardNumber"/>
      </div>
      <div className={`back ${!flipped? 'active' : ''}`}></div>
    </div>
  )
}