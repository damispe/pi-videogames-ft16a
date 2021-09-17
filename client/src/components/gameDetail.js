import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getGamesById } from '../redux/actions/actions';
import defaultImage from '../img/defaultImage.jpg';
import NavBar from './navBar';
import '../styles/home.css';
import '../styles/gameCard.css';

export default function GameDetail(){

    const dispatch = useDispatch();
    const { idVideogame } = useParams();
    let detail = useSelector(state => state.details)

    useEffect(() => {
        dispatch(getGamesById(idVideogame))
    }, []);

    let genresArr = [];
    let platformsArr = [];

    console.log(detail);

    if (detail?.Genres){
        detail?.Genres?.map(gen => genresArr.push(gen.genre_name));
        detail.platforms?.map(pla => platformsArr.push(pla));
    } else {
        detail?.genres?.map(gen => {
            genresArr.push(gen.name);
        });
        detail.platforms?.map(pla => platformsArr.push(pla.platform.name))
    }

    return(
        <div className='background'>
            <div>
                <NavBar/>
            </div>
            <div className='center'>
                <h1>{detail.name}</h1>
                <img className='card' src={detail.background_image? detail.background_image : defaultImage} alt=''/>
                <div>Genres:
                    {genresArr.map(g =>
                    <Link to={`/filter/${g}`}>{g}</Link>
                    )}
                </div>
                <div>Rating: {detail.rating}</div>
                <p>{detail.description_raw ? detail.description_raw : detail.description}</p>
                <div>Release date: {detail.released? detail.released : detail.release_date}</div>
                <div>Platforms:
                    {platformsArr.map(p =>
                        <p>{p}</p>
                        )}
                </div>
            </div>
        </div>
    );
}