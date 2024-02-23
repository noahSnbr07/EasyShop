import React, { useContext, useEffect, useState } from 'react'
import '../../styles/navbar.css';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import { doSignInWithGoogle, doSignOut } from '../../firebase/auth';
import defaultUser from '../../assets/defaultUser.png';
import { UserContext } from '../../App';
import getLocation from '../functions/getLocation';

export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);

    const [user, setUser] = useContext(UserContext);
    const [newLocation, setNewLocation] = useState('');


    useEffect(() => {
        async function fetchLocation() {
            const location = await getLocation();
            setNewLocation(location);
        }
        fetchLocation();
    })


    async function authLogIn() {
        if (!isSigningIn) {
            setIsSigningIn(true);
            await doSignInWithGoogle().catch((error) => { console.error(error); }).then((res) => {
                setUser({
                    name: res.user.displayName,
                    email: res.user.email,
                    profile: res.user.photoURL,
                    location: newLocation,
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

    return (
        <nav className='navbar'>
            <Link className='logo-link' to={'/'}> EasyShop </Link>
            <input className='nav-search-bar'></input>
            <button className='nav-link'> <Icon icon={'search'} /> </button>
            <Link to={'/cart'} className='nav-link'> <Icon icon={'shopping_cart'} /> </Link>
            <div className='nav-location'> {user.name !== 'Guest' ? user.location : 'N/A'} </div>
            <div className='nav-name'> {user.name} </div>
            <img className='nav-profile' src={`${user.profile}`} />
            <button onClick={() => { authLogIn(); }} className='nav-loginout'> <Icon icon={isLoggedIn ? 'logout' : 'login'} /> </button>
        </nav>
    );
}
