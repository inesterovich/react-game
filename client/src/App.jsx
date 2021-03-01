import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { CustomButton } from './components/Button';
import './App.css';

function App() {

  const routes = useRoutes();
  const fullScreenHandler = (event) => {
    const root = document.getElementById('root');

    if (document.fullscreenElement === root) {
      document.exitFullscreen()
    } else {
      root.requestFullscreen()
    }
    
  }
  
  return (
    <Router>
      <div className="App" >
    <header className="main-header">
          <h1>React Memory Game by Ilya Nesterovich</h1>
          <CustomButton
            name="fullscreen"
            text1="Полноэкранный режим"
            text2="Выйти из полноэкранного режима"
            clickHandler={fullScreenHandler} />
        </header>
        <main className="main-content">
          <div className="wrapper">
          {routes}
          </div>
       
        </main>
        <footer>
        <p className="credentials">
          Made by ...
        </p>
      </footer>
      </div>
      
    
    </Router>
    
  );
}

export default App;
