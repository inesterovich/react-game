import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MenuPage } from "./pages/Menu.page";
import { GamePage } from "./pages/Game.page";
import { SettingsPage } from './pages/Settings.page';
import { StatsPage  } from "./pages/Stats.page";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <MenuPage />
      </Route>

      <Route path="/settings" exact>
        <SettingsPage />
      </Route>

      <Route path="/game"  exact>
      <GamePage />
      </Route>

      <Route path="/stats"  exact>
      <StatsPage />
      </Route>

      


      <Redirect to="/" />




    </Switch>
  )
}