import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/gameCard.css';

export default function Videogame({name, background_image, genres, id}){

    return(
        <div className='card'>
            <Link to={`/gameDetail/${id}`} className='title'>
                <h3>{name}</h3>
            </Link>
            <img src={background_image} alt=''/>
            <ul>Genres: {genres.map(g => {
                    return <li>{g}</li>
                })}
            </ul>
        </div>
    );  
}