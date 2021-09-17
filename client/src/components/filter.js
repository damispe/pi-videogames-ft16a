import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideogames } from '../redux/actions/actions';
import NavBar from './navBar';
import Videogames from './videogames';
import Pagination from './pagination';

export default function Filter(){

    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const dispatch = useDispatch();
    const { attribute } = useParams();
    let videogames = useSelector(state => state.videogames);
    let filteredGames = [];
    
    useEffect(() => {
        dispatch(getVideogames())
    }, []);

    if(attribute === 'db'){
        videogames?.map(g => {
            if (g?.Genres) filteredGames.push(g);
        })
    } else if(attribute === 'api'){
        videogames?.map(g => {
            if (!g?.Genres) filteredGames.push(g);
        })
    } else {
        videogames?.map(g => {
            if(g?.Genres){
                g?.Genres?.map(gen => {
                    if(gen.genre_name === attribute){
                        filteredGames.push(g);
                    }
                })
            } else {
                g?.genres?.map(gen => {
                    if(gen === attribute){
                        filteredGames.push(g);
                    }
                })
            }
        })
    }
    
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <Videogames
            prop={currentGames}
            />
            <Pagination
            gamesPerPage={gamesPerPage}
            totalGames={filteredGames.length}
            paginate={paginate}
            />
        </div>
    )
}