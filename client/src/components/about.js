import React from 'react';
import NavBar from './navBar';
import '../styles/home.css';
import '../styles/about.css';

export default function About(){
    
    return(
        <div className='background'>
            <NavBar/>
            <div className='text'>
                <h1>Videogames App</h1>
                <h2>Created by Damian Spescha</h2>
            </div>
        </div>
    );
}