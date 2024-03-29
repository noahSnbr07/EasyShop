import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/detaileditem.css';
import { UserContext } from '../../App';
import BuyModal from '../components/BuyModal';
export default function DetailedItem() {
    const { itemID } = useParams();
    const [stock, setStock] = useState(JSON.parse(localStorage.getItem('products')) || []);
    const item = stock[itemID];

    const [user] = useContext(UserContext);
    const [isModalVisible, setModalVisible] = useState(false);

    const InfoCard = ({ entry, value }) => {
        return (
            <div className='detailed-info'>
                <b> {entry}: </b>
                <p> {typeof value === 'function' ? value() : value} </p>
            </div>
        );
    }

    const getCategories = () => {
        let categories = [];
        for (const [key, value] of Object.entries(item.categories)) {
            if (value) { categories.push(key) }
        }
        return `${categories.join(', ')}`;
    }

    const buyItem = () => {
        if (user.name !== 'Guest') { setModalVisible(prev => !prev); }
        else { alert('Must be signed in to purchase'); }
    };

    const toggleCart = () => {
        const oldArray = [...stock];
        oldArray[itemID].isCart = !(oldArray[itemID].isCart);
        localStorage.setItem('products', JSON.stringify(oldArray));
        setStock(JSON.parse(localStorage.getItem('products')))
    }

    return (
        <>
            {(isModalVisible) && (user.name !== 'Guest') && (
                <BuyModal closeModal={() => { setModalVisible(false); }} item={item} />
            )}
            <div className='detailed-item'>
                <img draggable="false" src={item && item.asset} className='detailed-preview' />
                <section className='detailed-body'>
                    <header className='detailed-header'> {item.title} </header>
                    <div className='detailed-content'>
                        <InfoCard entry={'Description'} value={item.description} />
                        <InfoCard entry={'Is in your Cart'} value={item.isCart ? 'Yes' : 'No'} />
                        <InfoCard entry={'Rating'} value={`${item.rating.average}  (${item.rating.amount} ratings)`} />
                        <InfoCard entry={'Categories'} value={getCategories} />
                    </div>
                    <header className='detailed-header'> Shipping </header>
                    <div className='detailed-content'>
                        <InfoCard entry={'Destination'} value={user.location} />
                        <InfoCard entry={'email'} value={user.email} />
                        <InfoCard entry={'User'} value={user.name} />
                    </div>
                    <div className='detailed-price'>
                        <h1> {item.price} € </h1>
                    </div>
                </section>
                <button onClick={() => { toggleCart(item) }} className='detailed-cart'>
                    {item.isCart ? 'Remove from Cart' : 'Add To Cart'}
                </button>
                <button onClick={() => { buyItem(item); }} className='detailed-buy'>
                    Buy Now
                </button>
            </div>
        </>
    );
}