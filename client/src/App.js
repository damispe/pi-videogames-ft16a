import {BrowserRouter, Route} from 'react-router-dom';
import landing from './components/landing';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={landing}/>
    </BrowserRouter>
  );
}

export default App;
