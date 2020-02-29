import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux'
import store from './store'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import DisplayGames from './components/DisplayGames'
import GridGame from './components/games/GridGame'
import History from './components/History'

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Navbar/>

          <section className="app">
            <Switch>

              <Route exact path="/" component={Home}/>
              <Route exact path="/myProfile" component={History}/>
              <Route exact path="/games" component={DisplayGames}/>
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
