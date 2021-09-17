import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getGamesById } from '../redux/actions/actions';
import defaultImage from '../img/defaultImage.jpg';
import NavBar from './navBar';

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
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <h1>{detail.name}</h1>
                <img src={detail.background_image? detail.background_image : defaultImage} alt=''/>
                <div>
                    {genresArr.map(g => 
                        <p>{g}</p>
                        )}
                </div>
                <div>{detail.rating}</div>
                <p>{detail.description_raw ? detail.description_raw : detail.description}</p>
                <div>{detail.released? detail.released : detail.release_date}</div>
                <div>
                    {platformsArr.map(p =>
                        <p>{p}</p>
                        )}
                </div>
            </div>
        </div>
    );
}