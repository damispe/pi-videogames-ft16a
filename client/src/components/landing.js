import React from 'react';
import landingPic from '../img/landingPic.jpg';
import { Link } from 'react-router-dom';

function Landing(){
    return(
        <div>
            <h1>Welcome to Videogames App!</h1>
            <img src={landingPic} alt='landing img'/>
            <Link to='/home'>enter</Link>
        </div>
    );
}

export default Landing;