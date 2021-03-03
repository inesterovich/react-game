import React, { useState } from 'react';



export const Modal = ({message, isModalOpen, modalHandler, audioObject}) => {
 

  return (
    <>
  
         <div className={`modal-container ${isModalOpen ? 'modal_active' : ''}`}>
          <div className="modal">
          <p>{ message || 'Заглушка вместо текста' }</p>
            <button
          className="modalOpener"
          onClick={() => modalHandler(false)}
        >Начать заново</button>
        </div>
        <div className="overlay">
  
        </div>
        </div>
      

      </>
  )
}