import React from 'react';
import { NavLink } from 'react-router-dom';

export const MenuPage = () => {
  return (
    <nav className="main-nav">
    <ul>
      <li><NavLink to="/game">Играть</NavLink></li>
      <li><NavLink to="/settings">Настройки</NavLink> </li>
      <li><NavLink to="/stats">Статистика</NavLink> </li>
    </ul>
    </nav>
  )
}