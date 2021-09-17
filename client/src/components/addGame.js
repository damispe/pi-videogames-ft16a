import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createGame } from '../redux/actions/actions';
import NavBar from './navBar';
import '../styles/home.css';
import '../styles/addGame.css';

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Name field required';
    } else if(!input.description){
        errors.description = 'Description field is required';
    } else if(!input.release_date){
        errors.release_date = 'A release date is required'
    } else if(!errors.rating){
        errors.rating = 'Rating field is required';
    }
    return errors;
}

export default function AddGame(){
    
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector((state) => state.genres);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        description: '',
        release_date: '',
        rating: '',
        platforms: [],
        genres: []
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    function handlePlatformSelect(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        });
    }

    function handleGenreSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        });
    }

    function handleFormSubmit(e){
        e.preventDefault()
        dispatch(createGame(input))
        alert('Videogame created successfully!')
        setInput({
            name: '',
            description: '',
            release_date: '',
            rating: '',
            platforms: [],
            genres: []
        })
        history.push('/home');
    }

    function handleGenresDelete(g){
        setInput({
            ...input,
            genres: input.genres.filter(gen => gen !== g)
        });
    }

    function handlePlatformsDelete(p){
        setInput({
            ...input,
            platforms: input.platforms.filter(pla => pla !== p)
        });
    }

    return (
        <div className='background'>
            <NavBar/>
            <Link to='/home'>
                <button>Back</button>
            </Link>
            <h1 className='form'>Create Videogame</h1>
            <div className='form'>
                <form onSubmit={(e) => handleFormSubmit(e)} className='form'>
                    <div>
                        <label>Name:</label>
                        <input
                        className='forminput'
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={handleChange}
                        />
                        {errors.name && (
                            <p>{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Description:</label>
                        <input
                        className='forminput'
                        type='text'
                        value={input.description}
                        name='description'
                        onChange={handleChange}
                        />
                        {errors.description && (
                            <p>{errors.description}</p>
                        )}
                    </div>
                    <div>
                        <label>Release date:</label>
                        <input
                        className='forminput'
                        type='date'
                        value={input.release_date}
                        name='release_date'
                        onChange={handleChange}
                        />
                        {errors.release_date && (
                            <p>{errors.release_date}</p>
                        )}
                    </div>
                    <div>
                        <label>Rating:</label>
                        <input
                        className='forminput'
                        type='number'
                        value={input.rating}
                        name='rating'
                        onChange={handleChange}
                        />
                        {errors.rating && (
                            <p>{errors.rating}</p>
                        )}
                    </div>
                    <div>
                        <label>Platforms:</label>
                        <select className='forminput' onChange={(e) => handlePlatformSelect(e)}>
                            <option>PC</option>
                            <option>PlayStation</option>
                            <option>Xbox</option>
                            <option>Nintendo</option>
                            <option>iOS</option>
                            <option>Android</option>
                        </select>
                    </div>
                    <div>
                        <label>Genres:</label>
                        <select className='forminput' onChange={(e) => handleGenreSelect(e)}>
                            {genres.map((g) => (
                                <option value={g.genre_name}>
                                    {g.genre_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h4>Selected platforms:</h4>
                        {input.platforms.map(p => 
                            <div>
                                <p>{p}</p>
                                <button className='xButton' onClick={() => handlePlatformsDelete(p)}>x</button>
                            </div>
                            )}
                    </div>
                    <div>
                        <h4>Selected genres:</h4>
                        {input.genres.map(g => 
                            <div>
                                <p>{g}</p>
                                <button className='xButton' onClick={() => handleGenresDelete(g)}>x</button>
                            </div>
                            )}
                    </div> 
                    <button className='formbutton' type='submit'>Create</button>
                </form>
            </div>
        </div>
    );
}
