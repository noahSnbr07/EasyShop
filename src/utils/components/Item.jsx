import React from 'react'
import '../../styles/item.css';
import Icon from './Icon';
export default function Item({ item }) {
    return (
        <div className='stock-item'>
            <img
                draggable="false"
                loading='lazy'
                className='item-asset'
                src={item.asset}
                alt={item.title + ' asset'} />
            <section className='item-body'>
                <p> {item.title} </p>
                <p> <Icon icon={'star'} /> {item.rating.average} ({item.rating.amount}) </p>
                <p> {item.description} </p>
                <p> {item.price} € </p>
            </section>
        </div>
    );
}
