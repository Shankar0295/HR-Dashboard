import React from 'react';
import './Header.css';
import LogOut from '../LogOut/LogOut';
import { useAuth0 } from '@auth0/auth0-react';

// import { Link } from 'react-router-dom';

const Header = () => {
    const { user, isAuthenticated } = useAuth0();
    console.log(user)
    console.log(isAuthenticated)
    return (
        <div>
            <div className="header">
                {/* <Link className="title-style"></Link> */}
                <h1 className="title">HR Dashboard</h1>
                <a className="portfolio-link" target="_blank" href="/">Portfoilo</a>
                {isAuthenticated && <LogOut />}
            </div>
            <hr style={{ color: '#333', opacity: '.3' }}></hr>
        </div>

    )
}

export default Header