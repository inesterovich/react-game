import React, { useState } from "react";

export const CustomButton = ({name, text1, text2, clickHandler }) => {
  
  const [textState, setTextState] = useState(false)
 /*
 Так. Пусть у меня текст будет в двух вариантах: 
 */

  return (
    <button type="button" name={`${name}-button`}
      onClick={(event) => {
        
        clickHandler(event)
        setTextState(!textState)
      }}
    >{ textState === false ? text1 : text2 }</button>
  )
}