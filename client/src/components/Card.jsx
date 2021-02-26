import React, { useState } from "react";

export const Card = ({ cardNumber, cardImg }) => {
  
  
  const [flipped, setFlipped] = useState(false);
  /* 

  Какие состояния есть у карты? 
   Перевернутая или нет?

  
  */
  return (
    <div className={`card-container ${cardNumber}`} onClick={() => {setFlipped(!flipped)}}>
      <div className={`front ${flipped ? 'active' : ''}`}>
        <img src={`${cardImg}`} alt="cardNumber"/>
      </div>
      <div className={`back ${!flipped? 'active' : ''}`}></div>
    </div>
  )
}