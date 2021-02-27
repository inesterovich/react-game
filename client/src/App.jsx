import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import './App.css';

function App() {
  const routes = useRoutes();
  return (
    <Router>
      <div className="App" >
    <header className="main-header">
    <h1>React Memory Game by Ilya Nesterovich</h1>
        </header>
        <main className="main-content">
        {routes}
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
