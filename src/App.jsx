import React, { useState } from 'react'
import Navbar from './utils/components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Cart from './pages/Cart';
import defaultUser from './assets/defaultUser.png';
export const UserContext = React.createContext();

export default function App() {
  const [user, setUser] = useState({ name: 'Guest', email: 'N/A', profile: defaultUser });
  return (
    <UserContext.Provider value={[user, setUser]}>
      <>
        <Navbar />
        <main className='viewport'>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </main>
      </>
    </UserContext.Provider>
  );
}