import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';
import '../styles/navBar.css';

export default function NavBar(){
    
    return(
        <div className='nav'>
            <div className='navbutton'>
                <Link to='/home' >Home</Link>
            </div>
            <div className='navbutton'>
                <Link to='/videogame'>Create videogame</Link>
            </div>
            <div className='navbutton'>
                <Link to='/about'>About</Link>
            </div>
            <div>
                <SearchBar/>
            </div>
        </div>
    );
}