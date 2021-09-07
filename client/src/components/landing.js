import landingPic from '../img/landingPic.jpg';
import { Link } from 'react-router-dom';

function Landing(){
    return(
        <div>
            <img src={landingPic} alt='landing img'/>
            <Link to='/home'>enter</Link>
        </div>
    );
}

export default Landing;