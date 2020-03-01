import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'

import Navbar from './components/Navbar'
import Home from './components/pages/Home'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import ShowGames from './components/game-pages/ShowGames'
import GridGame from './components/game-pages/grid-game'
import History from './components/game-pages/game-history'

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Navbar/>

          <section className="app">
            <Switch>

              <Route exact path="/" component={Home}/>
              <Route exact path="/myProfile" component={History}/>
              <Route exact path="/games" component={ShowGames}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path='/games/grid-game' component={GridGame}/>
              
            </Switch>
          </section>
      </Router>
    </Provider>
  );
}

export default App;
