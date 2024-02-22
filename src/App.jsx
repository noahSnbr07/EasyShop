import React from 'react'
import Navbar from './utils/components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Cart from './pages/Cart';

export default function App() {
  return (
    <>
      <Navbar />
      <main className='viewport'>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
    </>
  );
}