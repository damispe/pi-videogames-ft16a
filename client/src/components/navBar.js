import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';

export default function NavBar(){
    
    return(
        <div>
            <div>
                <Link to='/home'>Home</Link>
            </div>
            <div>
                <Link to='/videogame'>Create videogame</Link>
            </div>
            <div>
                <Link to='/about'>About</Link>
            </div>
            <div>
                <SearchBar/>
            </div>
        </div>
    );
}