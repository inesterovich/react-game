import React, { useState, useEffect, useCallback } from 'react';

export const useSound = () => {
  const [sound, setSound] = useState(null);

  const playSound = useCallback(   (audioSRC, volume, loop, autoplay) => {
    const audio = new Audio();
    audio.src = audioSRC;
    audio.volume = volume;
    audio.loop = loop;
    audio.autoplay = autoplay;
    setSound(audio);
    audio.play();
  }, [])
  



  const stopSound = () => {
    sound.stop();
  }

  return {
  
    playSound,
    stopSound
  }


}
