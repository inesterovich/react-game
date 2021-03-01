import React, { useState, useEffect } from 'react';
import { utils } from '../utils';
const storageName = 'gameData';

export const SettingsPage = () => {

  const { storage } = utils;
  // То есть по факту, игра создаваться будет здесь? 
  const [settingsForm, setSettingsForm] = useState({
    fieldSize: 8,
    timerToogler: false,
    gameTime: null,
    soundToogler: true,
    soundVolume: 1.0,
    musicToogler: true,
    musicVolume: 1.0
  })


  const changeHandler = (event) => {

    setSettingsForm({
      ...settingsForm,
      [event.target.name]: 
        event.target.type === "checkbox" ? !settingsForm[event.target.name] :
        event.target.type === "radio" ? Number(event.target.value) :
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
    const currentData = storage.get(storageName);
    if (currentData.fieldSize && ( currentData.fieldSize !== settingsForm.fieldSize)) {

      const data = settingsForm;
      delete data.gameField
      storage.set(storageName, data);
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
          <p>Таймер</p>
          <div>
            <label htmlFor="timerToogler"> Вкл/Выкл</label>
            <input
              id="timerToogler"
              name="timerToogler"
              type="checkbox"
              onChange={changeHandler}
             checked={settingsForm.timerToogler}
            />
          </div>

          {


            settingsForm.timerToogler &&
            
            <div>
            <p>Продолжительность партии</p>
            <select name="gameTime" id="gameTime" onChange={changeHandler} defaultValue={settingsForm.gameTime}>
              <option value="60">60 сек</option>
              <option value="120">120 сек</option>
              <option value="180">180 сек</option>
            </select>
          </div> 
          }

        

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