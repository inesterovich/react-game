import React, { useState } from "react";


export const Card = ({ cardNumber, cardImg, cardsHadler, open, tabIndex }) => {
  
  
  const [flipped, setFlipped] = useState(open);


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
      <div className={`back ${!flipped? 'active' : ''}`}></div>
    </div>
  )
}