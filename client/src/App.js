import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Landing from './components/landing';
import Home from './components/home';
import AddGame from './components/addGame';
import GameDetail from './components/gameDetail';
import About from './components/about';
import Filter from './components/filter';

function App() {

  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={Landing}/>
      </div>
      <div>
        <Route exact path='/home' component={Home}/>
        <Route path='/home/:attribute/:order' component={Home}/>
        <Route path='/filter/:attribute' component={Filter}/>
        <Route path='/videogame' component={AddGame}/>
        <Route path='/gameDetail/:idVideogame' component={GameDetail}/>
        <Route path='/about' component={About}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
