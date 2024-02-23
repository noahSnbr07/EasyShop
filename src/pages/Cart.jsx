import React, { useEffect, useState } from 'react';
import '../styles/cart.css';
import Item from '../utils/components/Item';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [items] = useState(JSON.parse(localStorage.getItem('products')) || []);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cartProducts = items.filter(item => item.isCart);
        setCartItems(cartProducts);
    }, [items]);

    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    return (
        <div className='cart-page'>
            {cartItems.map((item, index) => (
                <Link
                    key={index}
                    to={`/preview/${item.id}`} >
                    <Item key={item.id} item={item} removeFromCart={removeFromCart} />
                </Link>
            ))}
        </div>
    );
}