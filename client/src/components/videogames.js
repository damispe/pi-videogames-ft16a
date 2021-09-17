import React from 'react';
import defaultImage from '../img/defaultImage.jpg';
import Videogame from './videogame';

export default function Videogames({prop}){

    return(
        <div>
            {prop && prop.map(g => {
                if (g?.Genres){
                    g.background_image = defaultImage;
                    g.genres = [];
                    g?.Genres?.map(gen => g?.genres.push(gen.genre_name));
                }
                return <ul>
                            <li>
                                <Videogame
                                id={g.id}
                                name={g.name}
                                background_image={g.background_image}
                                genres={g.genres}
                                />
                            </li>
                       </ul>
            })}
        </div>
    );
}
