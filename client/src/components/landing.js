import React from 'react';
// import landingPic from '../img/landingPic.jpg';
import '../styles/landing.css';
import { Link } from 'react-router-dom';

function Landing(){
    return(
        <div className='landingBackground'>
            <h1 className='landingTitle'>Welcome to Videogames App!</h1>
            {/* <img src={landingPic} alt='landing img'/> */}
            <Link to='/home' className='button'>
                <button>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span to='/home'>Enter</span>
                </button>
            </Link>
        </div>
    );
}

export default Landing;