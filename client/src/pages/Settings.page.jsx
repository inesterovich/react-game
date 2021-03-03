import React, { useState, useEffect } from 'react';
import { utils } from '../utils';

const storageName = 'gameData';

export const SettingsPage = () => {

  const { storage } = utils;
  // То есть по факту, игра создаваться будет здесь? 
  const [settingsForm, setSettingsForm] = useState({
    fieldSize: 8,
    gameLevel: 4,
    gameActions: 32,
    soundToogler: true,
    soundVolume: 1.0,
    musicToogler: true,
    musicVolume: 1.0
  })


  const changeHandler = (event) => {

    console.log(event.target.type, event.target.value);

    setSettingsForm({
      ...settingsForm,
      [event.target.name]: 
        event.target.type === "checkbox" ? !settingsForm[event.target.name] :
          event.target.type === "radio" || event.target.type === "select-one"
            ? Number(event.target.value) :
          event.target.value
    
    })
  }

  useEffect(() => {
    const data = storage.get('gameData')
    if (data) {
      setSettingsForm({...data})
    }
  }, [storage])


  const submitHandler = (event) => {
    event.preventDefault();
    const prevData = storage.get(storageName);
    if (prevData) {
      let currentData = settingsForm;
      if (prevData.fieldSize !== currentData.fieldSize) {
        
        delete currentData.gameField;
      }

      if ( prevData.fieldSize !== currentData.fieldSize ||
        prevData.gameLevel !== currentData.gameLevel) {
        currentData.gameActions = currentData.fieldSize * currentData.gameLevel
      }



      
      storage.set(storageName, currentData);
    } else {
      storage.set(storageName, settingsForm);
    }
    
  }



  return (
  
      <form id="settings" onSubmit={submitHandler}>
        <h2>Настройки</h2>
        <fieldset>
          <legend>Игра</legend>
        <div className="fieldsizeSettings">

            <p>Размер игрового поля</p>
            <div>
              <label htmlFor="size-8">8</label>
            <input
              id="size-8"
              type="radio"
              name="fieldSize"
              value="8"
              onChange={changeHandler}
             checked = {settingsForm.fieldSize === 8}
            />
            </div>

            <div>
              <label htmlFor="size-12">12</label>
            <input
              id="size-12"
              type="radio"
              name="fieldSize"
              value="12"
              onChange={changeHandler}
              checked = {settingsForm.fieldSize === 12}
            />
            </div>

            <div>
              <label htmlFor="size-18">18</label>
            <input
              id="size-18"
              type="radio"
              name="fieldSize"
              value="18"
              onChange={changeHandler}
              checked = {settingsForm.fieldSize === 18}
            />
            </div>

        </div>
        
        <div className="timerSetings">
      
            <div>
            <p>Уровень сложности</p>
            <select name="gameLevel" id="gameLevel" onChange={changeHandler} value={settingsForm.gameLevel}>
              <option value="4">Легкий</option>
              <option value="3">Средний</option>
              <option value="2">Сложный</option>
            </select>
          </div> 
          

        

        </div>

      </fieldset>
      
      <fieldset>
        <legend> Аудио </legend>
        <div className="sounds-settings">
          <p>Звуки</p>

          <div>
            <label htmlFor="soundToogler"> Вкл/Выкл</label>
            <input
              id="soundToogler"
              name="soundToogler"
              type="checkbox"
              onChange={changeHandler}
             checked={settingsForm.soundToogler}
            />
          </div>
          {
            settingsForm.soundToogler &&

            <div>
            <label htmlFor="">Громкость звуков</label>
              <input
                id="soundVolume"
                name="soundVolume"
                type="range"
                min="0.2"
                max="1"
                step="0.2"
                onChange={changeHandler}
                value={settingsForm.soundVolume}
              />
          </div>
          }
          
        </div>
        <div className="music-settings">
             <p>Музыка</p>

          <div>
            <label htmlFor="musicToogler"> Вкл/Выкл</label>
            <input
              id="musicToogler"
              name="musicToogler"
              type="checkbox"
              onChange={changeHandler}
              checked={settingsForm.musicToogler}
            
            />
          </div>

          {
            settingsForm.musicToogler &&
            <div>
            <label htmlFor="musicVolume">Громкость музыки</label>
              <input
                id="musicVolume"
                name="musicVolume"
                type="range"
                min="0.2"
                max="1"
                step="0.2"
                onChange={changeHandler}
                value={settingsForm.musicVolume}
              />
            </div>
          }


        </div>
      </fieldset>
      <button form="settings" type="submit">Сохранить</button>
     </form>
    
  )
}