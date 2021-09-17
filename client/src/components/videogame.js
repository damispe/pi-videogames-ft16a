import React from 'react';
import { Link } from 'react-router-dom';

export default function Videogame({name, background_image, genres, id}){

    return(
        <div>
            <Link to={`/gameDetail/${id}`}>
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