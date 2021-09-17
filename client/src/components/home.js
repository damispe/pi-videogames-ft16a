import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getVideogames, getGenres } from '../redux/actions/actions';
import Videogames from './videogames';
import NavBar from './navBar';
import Pagination from './pagination';
import '../styles/home.css';

export default function Home(){

    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
    const { attribute, order } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres);
    let videogames = useSelector((state) => state.videogames);

    useEffect(() => {
        dispatch(getVideogames())
    }, []);
  
    useEffect(() => {
      dispatch(getGenres())
    }, []);

    if(attribute === 'name' && order === 'asc'){
        videogames = videogames.sort(
            function (a, b) {
                if (a.name > b.name) {
                  return 1;
                }
                if (a.name < b.name) {
                  return -1;
                }
                return 0;
              }
        );
    } else if(attribute === 'name' && order === 'desc'){
        videogames = videogames.sort(
            function (a, b) {
                if (b.name > a.name) {
                  return 1;
                }
                if (b.name < a.name) {
                  return -1;
                }
                return 0;
              }
        );
    } else if(attribute === 'rating' && order === 'asc'){
        videogames = videogames.sort(((a, b) => a.rating - b.rating));
    } else if(attribute === 'rating' && order === 'desc'){
        videogames = videogames.sort(((a, b) => b.rating - a.rating));
    }

    function handleOrderSelect(order) {
        order = order.split(' ');
         history.push(`/home/${order[0]}/${order[1]}`);
    }

    function handleGenreSelect(attribute){
      history.push(`/filter/${attribute}`);
    }

    function handleDbOrApi(attribute){
        history.push(`/filter/${attribute}`);
    }

    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = videogames.slice(indexOfFirstGame, indexOfLastGame);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='background'>
            <div>
                <NavBar/>
            </div>
            <div className='select'>
                <select onChange={(e) => handleOrderSelect(e.target.value)}>
                    <option disabled selected hidden>Filters...</option>
                    <option value={'name asc'}>From A-Z</option>
                    <option value={'name desc'}>From Z-A</option>
                    <option value={'rating desc'} onChange={(e) => handleOrderSelect(e.target.name, e.target.value)}>Highest rating</option>
                    <option value={'rating asc'}>Lowest rating</option>
                </select>
                <select onChange={(e) => handleGenreSelect(e.target.value)}>
                <option disabled selected hidden>Genre...</option>
                {genres.map(g => <option value={g.genre_name}>{g.genre_name}</option>)}
                </select>
                <select onChange={(e) => handleDbOrApi(e.target.value)}>
                    <option disabled selected hidden>Choose from...</option>
                    <option value={'db'}>Custom videogame</option>
                    <option value={'api'}>Videogames</option>
                </select>
            </div>
            <div>
                <Videogames
                prop={currentGames}
                />
            </div>
            <div className='pagination'>
                <Pagination
                gamesPerPage={gamesPerPage}
                totalGames={videogames.length}
                paginate={paginate}
                />
            </div>
        </div>
    );
}
