import { useEffect, useState } from 'react';
import {GAMES_URL} from '../consts';

//muestra de a 15 juegos por pag
export default function Videogames(){
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${GAMES_URL}`)
        .then(res => res.json())
        .then(
            (result) => {
                setGames(result);
            },
            (error) => {
                setError(error);
            }
        )
    }, [])

    if (error){
        return <div>Error: {error.msg}</div>;
    }
    else {
        return (
            <ul>
                {games.map(games => (
                    <li key={games.id}>
                    {games.name}
                    </li>
                ))}
            </ul>
        );
    }
}