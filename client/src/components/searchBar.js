import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesByName } from '../redux/actions/actions';
import '../styles/navBar.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getVideogamesByName(name));
    }

    return (
        <div>
            <input
            type='text'
            placeholder='Search...'
            onChange={(e) => {handleInputChange(e)}}
            />
            <button className='searchbutton' type='submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    );
}