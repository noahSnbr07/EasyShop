import React, { useContext, useEffect, useState } from 'react'
import '../../styles/navbar.css';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { doSignInWithGoogle, doSignOut } from '../../firebase/auth';
import defaultUser from '../../assets/defaultUser.png';
import { UserContext } from '../../App';

export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [location, setLocation] = useState('Fetching Location ...');

    const [user, setUser] = useContext(UserContext);

    async function authLogIn() {
        if (!isSigningIn) {
            setIsSigningIn(true);
            await doSignInWithGoogle().catch((error) => { console.error(error); }).then((res) => {
                setUser({
                    name: res.user.displayName,
                    email: res.user.email,
                    profile: res.user.photoURL
                });
                setLoggedIn(true);
                setIsSigningIn(false);
            });
        }
        if (isLoggedIn) {
            await doSignOut();
            setLoggedIn(false);
            setUser({ name: 'Guest', email: 'N/A', profile: defaultUser });
        }
    }

    useEffect(() => {
        fetch('https://ipapi.co/json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setLocation(`${data.region}, ${data.postal}, ${data.country}`)
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <nav className='navbar'>
            <Link className='logo-link' to={'/'}> EasyShop </Link>
            <input className='nav-search-bar'></input>
            <button className='nav-link'> <Icon icon={'search'} /> </button>
            <Link to={'/cart'} className='nav-link'> <Icon icon={'shopping_cart'} /> </Link>
            <div className='nav-location'> {location} </div>
            <div className='nav-name'> {user.name} </div>
            <img className='nav-profile' src={`${user.profile}`} />
            <button onClick={() => { authLogIn(); }} className='nav-loginout'> <Icon icon={isLoggedIn ? 'logout' : 'login'} /> </button>
        </nav>
    );
}