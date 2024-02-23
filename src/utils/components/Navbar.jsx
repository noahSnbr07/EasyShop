import React, { useContext, useState } from 'react';
import '../../styles/navbar.css';
import { Link, useParams, useSearchParams } from 'react-router-dom'; // Removed useHistory
import Icon from './Icon';
import { doSignInWithGoogle, doSignOut } from '../../firebase/auth';
import defaultUser from '../../assets/defaultUser.png';
import { UserContext } from '../../App';
import getLocation from '../functions/getLocation';

export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [newLocation, setNewLocation] = useState('');
    const [user, setUser] = useContext(UserContext);
    const [inputValue, setinputValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams({ query: "" });


    async function fetchLocation() {
        const location = await getLocation();
        return location;
    }
    async function authLogIn() {
        const location = await fetchLocation();
        setNewLocation(location);

        if (!isSigningIn && !isLoggedIn) {
            setIsSigningIn(true);
            try {
                const res = await doSignInWithGoogle();
                setUser({
                    name: res.user.displayName,
                    email: res.user.email,
                    profile: res.user.photoURL,
                    location: location,
                });
                setLoggedIn(true);
            }
            catch (error) { console.error(error); }
            finally { setIsSigningIn(false); }
        } else if (isLoggedIn) {
            try {
                await doSignOut();
                setLoggedIn(false);
                setUser({ name: 'Guest', email: 'N/A', profile: defaultUser });
            } catch (error) {
                console.error(error);
            }
        }
    }

    const applySearchQuery = () => {
        setSearchParams(prev => {
            prev.set('query', inputValue);
            return prev;
        });
    }

    return (
        <nav className='navbar'>
            <Link className='logo-link' to={'/'}> EasyShop </Link>
            <input
                value={inputValue}
                onChange={(e) => {
                    setinputValue(e.target.value);
                }}
                className='nav-search-bar'
            />
            <button onClick={() => { applySearchQuery() }} className='nav-link'> <Icon icon={'search'} /> </button>
            <Link to={'/cart'} className='nav-link'> <Icon icon={'shopping_cart'} /> </Link>
            <div className='nav-location'> {user.name !== 'Guest' ? user.location : 'N/A'} </div>
            <div className='nav-name'> {user.name} </div>
            <img className='nav-profile' src={`${user.profile}`} alt="Profile" />
            <button onClick={authLogIn} className='nav-loginout'>
                <Icon icon={isLoggedIn ? 'logout' : 'login'} />
            </button>
        </nav>
    );
}
