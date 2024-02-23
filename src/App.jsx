import React, { useState, useEffect } from 'react'
import Navbar from './utils/components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Cart from './pages/Cart';
import defaultUser from './assets/defaultUser.png';
import DetailedItem from './utils/components/DetailedItem';
import getLocation from './utils/functions/getLocation';
export const UserContext = React.createContext();

export default function App() {

  const [user, setUser] = useState({ name: 'Guest', email: 'N/A', profile: defaultUser, location: 'N/A', });

  useEffect(() => {
    async function fetchLocation() {
      const location = await getLocation();
      setUser(prevUser => ({
        ...prevUser, location: location
      }));
    }
    fetchLocation();
  }, []);


  return (
    <UserContext.Provider value={[user, setUser]}>
      <>
        <Navbar />
        <main className='viewport'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/preview/:itemID' element={<DetailedItem />} />
          </Routes>
        </main>
      </>
    </UserContext.Provider>
  );
}