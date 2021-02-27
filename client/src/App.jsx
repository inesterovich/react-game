import React from 'react';
import { Field } from './components/Field';
import './App.css';

function App() {
  return (
    <div className="App" >
      <button type="button" onClick={() => {
        const root = document.querySelector('#root');
        if (document.fullscreenElement !== root) {
          root.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }}>Полноэкранный режим</button>
    <Field />
     </div>
  );
}

export default App;
