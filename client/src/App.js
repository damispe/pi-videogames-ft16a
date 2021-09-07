import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Landing from './components/landing';
import Home from './components/home';
import AddGame from './components/addGame';
import Videogame from './components/videogame';
import NavBar from './components/navBar';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={Landing}/>
      </div>
      <div>
        <NavBar/>
        <Route exact path='/Home' component={Home}/>
        <Route exact path='/Videogame' component={AddGame}/>
        <Route exact path='/GameDetail' component={Videogame}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
