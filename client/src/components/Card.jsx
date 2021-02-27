import React, { useState } from "react";

export const Card = ({ cardNumber, cardImg, cardsHadler, open }) => {
  
  
  const [flipped, setFlipped] = useState(open);

  // Надо разделить, наверно

  return (
    <div className={`card-container ${cardNumber} ${flipped ? 'disabled': ''}`} onClick={(event) => {
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
      <div className={`back ${!flipped? 'active' : ''}`}></div>
    </div>
  )
}