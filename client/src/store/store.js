import {createStore} from 'redux';
import {reducer} from '../reducers/reducers';

var store = createStore(reducer);

export default store;